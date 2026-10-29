import type { Studio } from '@/lib/chatbot-scenario';

import { ArrowRightIcon } from './icons';
import { ScanGoButton } from './scan-go-button';
import { StudioCard } from './studio-card';

export function StudiosSection({ studios }: { studios: Studio[] }) {
    return (
        <section id="studios" className="scroll-mt-20 border-t border-gray-100 px-6 py-20 md:px-10 md:py-28">
            <div className="mx-auto max-w-2xl text-center">
                <p className="text-sm font-medium tracking-[0.2em] text-gray-400">PREMIUM WEDDING STUDIO</p>

                <h2 className="mt-4 text-4xl font-extrabold text-brand md:text-5xl">웨딩스튜디오</h2>
                <p className="mt-2 text-4xl font-extrabold text-gray-900 md:text-5xl">인물. 배경. 감성.</p>
                <p className="mt-1 text-4xl font-extrabold text-brand md:text-5xl">렛츠GO</p>

                <p className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-gray-500 md:text-base">
                    우리 두 사람만의 특별한 순간 — 평생 남을 웨딩 사진
                    <br />
                    엄선된 스튜디오를 한눈에 비교하고 한 번에 맞춤 견적을 받아보세요.
                </p>
            </div>

            <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {studios.map((studio) => (
                    <StudioCard key={studio.slug} studio={studio} sizes="(min-width: 1024px) 370px, (min-width: 640px) 50vw, 100vw" />
                ))}
            </div>

            <div className="mx-auto mt-8 max-w-6xl rounded-2xl bg-brand px-6 py-8 text-center text-white">
                <p className="font-semibold">이외 다른 인기 웨딩스튜디오도 빠르게 찾아드립니다.</p>
                <ScanGoButton className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white px-6 py-3 text-sm font-bold text-brand transition-colors hover:bg-gray-100">
                    웨딩스튜디오스캔GO 바로가기
                    <ArrowRightIcon className="h-4 w-4" />
                </ScanGoButton>
            </div>
        </section>
    );
}
