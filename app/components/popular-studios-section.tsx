import type { Studio } from '@/lib/chatbot-scenario';

import { MarqueeTrack } from './marquee-track';
import { StudioCard } from './studio-card';

// Each half of the marquee track must be wider than the viewport, or a gap
// shows before the loop restarts — so a short list is repeated to at least
// this many cards per half.
const MIN_CARDS_PER_LOOP = 8;

export function PopularStudiosSection({ studios }: { studios: Studio[] }) {
    const repeats = Math.ceil(MIN_CARDS_PER_LOOP / studios.length);
    const loop = Array.from({ length: repeats }, () => studios).flat();

    return (
        <section id="popular" className="scroll-mt-20 border-t border-gray-100 py-20 md:py-28">
            <div className="mx-auto max-w-2xl px-6 text-center md:px-10">
                <p className="text-sm font-medium tracking-[0.2em] text-gray-400">POPULAR WEDDING STUDIOS</p>
                <h2 className="mt-4 text-4xl font-extrabold text-gray-900 md:text-5xl">
                    스튜디오 <span className="text-brand">인기 업체</span> 둘러보기
                </h2>
                <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-gray-500 md:text-base">
                    지금 예비부부들이 가장 많이 찾는 웨딩스튜디오를 한눈에 비교하고
                    <br />한 번에 맞춤 견적을 받아보세요.
                </p>
            </div>

            <div className="relative mt-14 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
                <MarqueeTrack className="flex w-max animate-[marquee_90s_linear_infinite] gap-6">
                    {loop.map((studio, index) => (
                        <StudioCard
                            key={`${studio.slug}-${index}`}
                            studio={studio}
                            sizes="(min-width: 640px) 300px, 260px"
                            hidden={index >= studios.length}
                            className="w-[260px] shrink-0 sm:w-[300px]"
                        />
                    ))}
                    {loop.map((studio, index) => (
                        <StudioCard
                            key={`${studio.slug}-${index}-repeat`}
                            studio={studio}
                            sizes="(min-width: 640px) 300px, 260px"
                            hidden
                            className="w-[260px] shrink-0 sm:w-[300px]"
                        />
                    ))}
                </MarqueeTrack>
            </div>
        </section>
    );
}
