'use client';

import { useState, type ChangeEvent } from 'react';

import type { Studio } from '@/lib/chatbot-scenario';

import { uploadImage } from './upload-image';

// Updates are passed as functions of the latest state (not a precomputed next
// value) because uploads finish asynchronously — applying a result computed
// from the studio as it was when the upload started would undo any edits made
// while it was in flight.
type StudioUpdater = (studio: Studio) => Studio;
type StudiosUpdater = (studios: Studio[]) => Studio[];

function makeSlug(): string {
    return `studio-${Math.random().toString(36).slice(2, 8)}`;
}

function filesFrom(e: ChangeEvent<HTMLInputElement>): File[] {
    const files = Array.from(e.target.files ?? []);
    // Reset so picking the same file again still fires onChange.
    e.target.value = '';
    return files;
}

function UploadingTile() {
    return (
        <div className="flex h-20 w-[60px] shrink-0 items-center justify-center rounded-lg bg-gray-100 text-[10px] font-semibold text-gray-400">
            <span className="animate-pulse">업로드 중</span>
        </div>
    );
}

function StudioRow({
    studio,
    onUpdate,
    onDelete,
}: {
    studio: Studio;
    onUpdate: (update: StudioUpdater) => void;
    onDelete: () => void;
}) {
    const [uploadingMain, setUploadingMain] = useState(false);
    const [uploadingSampleCount, setUploadingSampleCount] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const samples = (studio.samples ?? []).filter(Boolean);

    async function handleMainImage(e: ChangeEvent<HTMLInputElement>) {
        const [file] = filesFrom(e);
        if (!file) return;
        setError(null);
        setUploadingMain(true);
        try {
            const url = await uploadImage(file);
            onUpdate((s) => ({ ...s, image: url }));
        } catch (err) {
            setError(err instanceof Error ? err.message : '업로드에 실패했습니다.');
        } finally {
            setUploadingMain(false);
        }
    }

    async function handleSampleImages(e: ChangeEvent<HTMLInputElement>) {
        const files = filesFrom(e);
        if (files.length === 0) return;
        setError(null);
        setUploadingSampleCount((n) => n + files.length);

        const results = await Promise.allSettled(files.map(uploadImage));
        const urls = results.flatMap((r) => (r.status === 'fulfilled' ? [r.value] : []));
        const failure = results.find((r): r is PromiseRejectedResult => r.status === 'rejected');

        if (urls.length > 0) {
            onUpdate((s) => ({ ...s, samples: [...(s.samples ?? []).filter(Boolean), ...urls] }));
        }
        if (failure) {
            const failedCount = results.length - urls.length;
            const reason = failure.reason instanceof Error ? failure.reason.message : '업로드에 실패했습니다.';
            setError(failedCount > 1 ? `${failedCount}장 업로드 실패 · ${reason}` : reason);
        }
        setUploadingSampleCount((n) => n - files.length);
    }

    function removeSample(index: number) {
        onUpdate((s) => ({ ...s, samples: (s.samples ?? []).filter(Boolean).filter((_, i) => i !== index) }));
    }

    function moveSample(index: number, offset: -1 | 1) {
        onUpdate((s) => {
            const next = (s.samples ?? []).filter(Boolean);
            const target = index + offset;
            if (target < 0 || target >= next.length) return s;
            [next[index], next[target]] = [next[target], next[index]];
            return { ...s, samples: next };
        });
    }

    return (
        <div className="rounded-xl border border-gray-200 p-3">
            <div className="flex items-start gap-3">
                {uploadingMain ? (
                    <UploadingTile />
                ) : (
                    <label className="group relative flex h-20 w-[60px] shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-dashed border-gray-300 bg-gray-50 text-center text-[10px] font-semibold leading-tight text-gray-400 hover:border-brand hover:text-brand">
                        {studio.image ? (
                            <>
                                {/* eslint-disable-next-line @next/next/no-img-element -- admin preview only */}
                                <img src={studio.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
                                <span className="absolute inset-x-0 bottom-0 bg-black/55 py-0.5 text-white opacity-0 transition-opacity group-hover:opacity-100">
                                    변경
                                </span>
                            </>
                        ) : (
                            <span>
                                대표
                                <br />
                                이미지
                                <br />
                                업로드
                            </span>
                        )}
                        <input type="file" accept="image/*" onChange={handleMainImage} className="sr-only" />
                    </label>
                )}

                <div className="flex-1 space-y-2">
                    <input
                        type="text"
                        value={studio.name}
                        placeholder="스튜디오명"
                        onChange={(e) => onUpdate((s) => ({ ...s, name: e.target.value }))}
                        className="block w-full rounded-lg border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-900 outline-none focus:border-brand focus:ring-1 focus:ring-brand"
                    />
                    <textarea
                        value={studio.description}
                        placeholder="설명"
                        rows={2}
                        onChange={(e) => onUpdate((s) => ({ ...s, description: e.target.value }))}
                        className="block w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none focus:border-brand focus:ring-1 focus:ring-brand"
                    />
                </div>
                <button
                    type="button"
                    onClick={onDelete}
                    className="cursor-pointer rounded-lg border border-red-200 px-2.5 py-2 text-xs font-semibold text-red-500 hover:bg-red-50"
                >
                    삭제
                </button>
            </div>

            <input
                type="text"
                value={studio.tags.join(', ')}
                placeholder="태그 (쉼표로 구분)"
                onChange={(e) =>
                    onUpdate((s) => ({
                        ...s,
                        tags: e.target.value
                            .split(',')
                            .map((tag) => tag.trim())
                            .filter(Boolean),
                    }))
                }
                className="mt-2 block w-full rounded-lg border border-gray-200 px-3 py-2 text-xs text-gray-700 outline-none focus:border-brand focus:ring-1 focus:ring-brand"
            />

            <div className="mt-3">
                <p className="text-xs font-semibold text-gray-600">
                    샘플 사진 <span className="font-normal text-gray-400">(여러 장 선택 가능 · 없으면 &ldquo;샘플보기&rdquo; 버튼이 숨겨져요)</span>
                </p>
                <div className="mt-1.5 flex flex-wrap gap-2">
                    {samples.map((src, i) => (
                        <div key={`${src}-${i}`} className="group relative h-20 w-[60px] shrink-0 overflow-hidden rounded-lg bg-gray-100">
                            {/* eslint-disable-next-line @next/next/no-img-element -- admin preview only */}
                            <img src={src} alt="" className="h-full w-full object-cover" />
                            <button
                                type="button"
                                aria-label="샘플 삭제"
                                onClick={() => removeSample(i)}
                                className="absolute right-0.5 top-0.5 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-black/60 text-xs leading-none text-white hover:bg-red-500"
                            >
                                ×
                            </button>
                            <div className="absolute inset-x-0 bottom-0 flex justify-between bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                                <button
                                    type="button"
                                    aria-label="앞으로 이동"
                                    disabled={i === 0}
                                    onClick={() => moveSample(i, -1)}
                                    className="cursor-pointer px-1.5 text-[10px] text-white disabled:opacity-30"
                                >
                                    ◀
                                </button>
                                <button
                                    type="button"
                                    aria-label="뒤로 이동"
                                    disabled={i === samples.length - 1}
                                    onClick={() => moveSample(i, 1)}
                                    className="cursor-pointer px-1.5 text-[10px] text-white disabled:opacity-30"
                                >
                                    ▶
                                </button>
                            </div>
                        </div>
                    ))}
                    {Array.from({ length: uploadingSampleCount }, (_, i) => (
                        <UploadingTile key={`uploading-${i}`} />
                    ))}
                    <label className="flex h-20 w-[60px] shrink-0 cursor-pointer items-center justify-center rounded-lg border border-dashed border-gray-300 text-center text-[10px] font-semibold leading-tight text-gray-400 hover:border-brand hover:text-brand">
                        + 사진
                        <br />
                        추가
                        <input type="file" accept="image/*" multiple onChange={handleSampleImages} className="sr-only" />
                    </label>
                </div>
            </div>

            {error && <p className="mt-2 text-xs font-medium text-red-500">{error}</p>}

            <label className="mt-3 inline-flex cursor-pointer items-center gap-2 text-xs font-semibold text-gray-600">
                <input
                    type="checkbox"
                    checked={studio.popular ?? false}
                    onChange={(e) => onUpdate((s) => ({ ...s, popular: e.target.checked }))}
                    className="h-4 w-4 cursor-pointer accent-brand"
                />
                &ldquo;인기 업체 둘러보기&rdquo;에 노출
            </label>
        </div>
    );
}

export function StudiosEditor({ value, onChange }: { value: Studio[]; onChange: (update: StudiosUpdater) => void }) {
    // Matched by slug, not index — the list may be reordered or shortened while an upload is in flight.
    function updateStudio(slug: string, update: StudioUpdater) {
        onChange((studios) => studios.map((s) => (s.slug === slug ? update(s) : s)));
    }

    function moveStudio(index: number, offset: -1 | 1) {
        onChange((studios) => {
            const target = index + offset;
            if (target < 0 || target >= studios.length) return studios;
            const next = [...studios];
            [next[index], next[target]] = [next[target], next[index]];
            return next;
        });
    }

    function addStudio() {
        onChange((studios) => [...studios, { slug: makeSlug(), name: '', description: '', tags: [], image: '', samples: [] }]);
    }

    return (
        <div className="space-y-2">
            {value.map((studio, index) => (
                <div key={studio.slug} className="flex items-start gap-2">
                    <div className="flex shrink-0 flex-col gap-1 pt-3">
                        <button
                            type="button"
                            aria-label="위로 이동"
                            disabled={index === 0}
                            onClick={() => moveStudio(index, -1)}
                            className="cursor-pointer rounded border border-gray-200 px-1.5 text-xs text-gray-500 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30"
                        >
                            ▲
                        </button>
                        <button
                            type="button"
                            aria-label="아래로 이동"
                            disabled={index === value.length - 1}
                            onClick={() => moveStudio(index, 1)}
                            className="cursor-pointer rounded border border-gray-200 px-1.5 text-xs text-gray-500 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30"
                        >
                            ▼
                        </button>
                    </div>
                    <div className="min-w-0 flex-1">
                        <StudioRow
                            studio={studio}
                            onUpdate={(update) => updateStudio(studio.slug, update)}
                            onDelete={() => onChange((studios) => studios.filter((s) => s.slug !== studio.slug))}
                        />
                    </div>
                </div>
            ))}

            <button
                type="button"
                onClick={addStudio}
                className="cursor-pointer rounded-lg border border-dashed border-gray-300 px-3 py-2 text-xs font-semibold text-gray-500 hover:border-brand hover:text-brand"
            >
                + 스튜디오 추가
            </button>
        </div>
    );
}
