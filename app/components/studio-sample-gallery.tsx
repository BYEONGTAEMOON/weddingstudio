'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import type { Studio } from '@/lib/chatbot-scenario';

import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from './icons';
import { useScanModal } from './scan-modal-context';

const SWIPE_THRESHOLD_PX = 50;

function SampleGallery({ studio, samples, onClose }: { studio: Studio; samples: string[]; onClose: () => void }) {
    const { open: openScanModal } = useScanModal();
    const [index, setIndex] = useState(0);
    const touchStartXRef = useRef<number | null>(null);
    const activeThumbRef = useRef<HTMLButtonElement>(null);

    const count = samples.length;
    const go = (offset: number) => setIndex((prev) => (prev + offset + count) % count);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        function handleKeyDown(e: KeyboardEvent) {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft') setIndex((prev) => (prev - 1 + count) % count);
            if (e.key === 'ArrowRight') setIndex((prev) => (prev + 1) % count);
        }
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [count, onClose]);

    useEffect(() => {
        activeThumbRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }, [index]);

    function handleQuote() {
        onClose();
        openScanModal(studio.name);
    }

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-label={`${studio.name} 샘플 사진`}
            className="fixed inset-0 z-[100] flex flex-col bg-black/90 text-white"
        >
            <div className="flex items-center justify-between gap-3 px-4 py-3 md:px-6">
                <div className="min-w-0">
                    <p className="truncate text-sm font-bold md:text-base">{studio.name}</p>
                    <p className="text-xs text-white/50">
                        샘플 {index + 1} / {count}
                    </p>
                </div>
                <button
                    type="button"
                    aria-label="닫기"
                    onClick={onClose}
                    className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
                >
                    <CloseIcon className="h-5 w-5" />
                </button>
            </div>

            <div
                className="relative flex min-h-0 flex-1 items-center justify-center px-4 md:px-20"
                onClick={(e) => {
                    if (e.target === e.currentTarget) onClose();
                }}
                onTouchStart={(e) => {
                    touchStartXRef.current = e.touches[0].clientX;
                }}
                onTouchEnd={(e) => {
                    if (touchStartXRef.current === null) return;
                    const dx = e.changedTouches[0].clientX - touchStartXRef.current;
                    touchStartXRef.current = null;
                    if (Math.abs(dx) > SWIPE_THRESHOLD_PX) go(dx < 0 ? 1 : -1);
                }}
            >
                <div className="relative h-full w-full max-w-5xl">
                    <Image
                        key={samples[index]}
                        src={samples[index]}
                        alt={`${studio.name} 샘플 ${index + 1}`}
                        fill
                        sizes="(min-width: 1024px) 1024px, 100vw"
                        className="rounded-lg object-contain"
                        priority
                    />
                </div>

                {count > 1 && (
                    <>
                        <button
                            type="button"
                            aria-label="이전 사진"
                            onClick={() => go(-1)}
                            className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/40 transition-colors hover:bg-white/20 md:left-6"
                        >
                            <ChevronLeftIcon className="h-6 w-6" />
                        </button>
                        <button
                            type="button"
                            aria-label="다음 사진"
                            onClick={() => go(1)}
                            className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/40 transition-colors hover:bg-white/20 md:right-6"
                        >
                            <ChevronRightIcon className="h-6 w-6" />
                        </button>
                    </>
                )}
            </div>

            <div className="px-4 pb-4 pt-3 md:px-6">
                {count > 1 && (
                    <div className="mx-auto flex max-w-3xl justify-start gap-2 overflow-x-auto pb-2 md:justify-center">
                        {samples.map((src, i) => (
                            <button
                                key={`${src}-${i}`}
                                ref={i === index ? activeThumbRef : undefined}
                                type="button"
                                aria-label={`샘플 ${i + 1} 보기`}
                                onClick={() => setIndex(i)}
                                className={`relative h-16 w-12 shrink-0 cursor-pointer overflow-hidden rounded-md transition-opacity ${
                                    i === index ? 'ring-2 ring-brand-soft' : 'opacity-50 hover:opacity-90'
                                }`}
                            >
                                <Image src={src} alt="" fill sizes="48px" className="object-cover" />
                            </button>
                        ))}
                    </div>
                )}

                <div className="mt-2 flex justify-center">
                    <button
                        type="button"
                        onClick={handleQuote}
                        className="cursor-pointer rounded-full bg-brand px-6 py-3 text-sm font-bold text-white ring-1 ring-brand-soft/40 transition-colors hover:bg-brand-dark"
                    >
                        이 스튜디오로 견적 받기
                    </button>
                </div>
            </div>
        </div>
    );
}

// Rendered through a portal: the "인기 업체" carousel moves its track with a CSS
// transform, which would otherwise make this `position: fixed` overlay pin to
// the moving card instead of the viewport.
export function SampleGalleryButton({
    studio,
    tabIndex,
    className,
}: {
    studio: Studio;
    tabIndex?: number;
    className?: string;
}) {
    const [isOpen, setIsOpen] = useState(false);
    const close = useCallback(() => setIsOpen(false), []);
    const samples = (studio.samples ?? []).map((src) => src.trim()).filter(Boolean);

    if (samples.length === 0) return null;

    return (
        <>
            <button type="button" tabIndex={tabIndex} onClick={() => setIsOpen(true)} className={`cursor-pointer ${className ?? ''}`}>
                샘플보기
            </button>
            {isOpen &&
                createPortal(<SampleGallery studio={studio} samples={samples} onClose={close} />, document.body)}
        </>
    );
}
