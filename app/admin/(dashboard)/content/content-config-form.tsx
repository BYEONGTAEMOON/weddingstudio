'use client';

import { useState } from 'react';

import { DEFAULT_CHATBOT_SCENARIO, type ChatbotScenario } from '@/lib/chatbot-scenario';

import { SectionCard } from '../section-card';
import { StudiosEditor } from './studios-editor';

export function ContentConfigForm({ initialScenario }: { initialScenario: ChatbotScenario }) {
    // Holds the FULL scenario (not just the field this page edits) so that
    // saving always PUTs a complete object — the API replaces the whole config,
    // so a partial payload here would silently reset chatbot text elsewhere.
    const [scenario, setScenario] = useState<ChatbotScenario>(initialScenario);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    async function handleSave() {
        setSaving(true);
        setMessage(null);
        try {
            const res = await fetch('/api/admin/chatbot-config', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(scenario),
            });
            const data = await res.json().catch(() => ({}));
            if (!res.ok) {
                setMessage({ type: 'error', text: data.error ?? '저장에 실패했습니다.' });
                return;
            }
            setMessage({ type: 'success', text: '저장했어요. 사이트에 바로 반영됩니다.' });
        } catch {
            setMessage({ type: 'error', text: '네트워크 오류가 발생했습니다.' });
        } finally {
            setSaving(false);
        }
    }

    function handleReset() {
        if (!confirm('기본값으로 초기화할까요? 저장 전까지는 사이트에 반영되지 않아요.')) return;
        setScenario((prev) => ({
            ...prev,
            studios: DEFAULT_CHATBOT_SCENARIO.studios,
        }));
        setMessage(null);
    }

    return (
        <div className="space-y-6 pb-28">
            <SectionCard
                title="웨딩스튜디오 목록"
                description="여기서 추가·삭제·순서 변경한 스튜디오가 홈페이지 스튜디오 리스트와 챗봇의 스튜디오 후보 화면(전체, 5곳씩 페이지)에 그대로 반영돼요. &ldquo;인기 업체 둘러보기&rdquo;에 체크한 스튜디오는 홈페이지 상단 인기 업체 슬라이드에도 노출돼요. 사진은 업로드 시 자동으로 줄여서 저장되고, 세로형(3:4)을 권장해요. 업로드가 끝난 뒤 저장하기를 눌러야 사이트에 반영돼요."
            >
                <StudiosEditor
                    value={scenario.studios}
                    onChange={(update) => setScenario((prev) => ({ ...prev, studios: update(prev.studios) }))}
                />
            </SectionCard>

            <div className="fixed inset-x-0 bottom-0 border-t border-gray-100 bg-white/95 px-8 py-4 backdrop-blur md:left-60">
                <div className="mx-auto flex max-w-5xl items-center justify-between gap-3">
                    <div className="min-w-0 flex-1">
                        {message && (
                            <p
                                className={`truncate text-sm font-medium ${message.type === 'success' ? 'text-emerald-600' : 'text-red-500'}`}
                            >
                                {message.text}
                            </p>
                        )}
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                        <button
                            type="button"
                            onClick={handleReset}
                            className="cursor-pointer rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50"
                        >
                            기본값으로 초기화
                        </button>
                        <button
                            type="button"
                            onClick={handleSave}
                            disabled={saving}
                            className="cursor-pointer rounded-lg bg-brand px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {saving ? '저장 중...' : '저장하기'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
