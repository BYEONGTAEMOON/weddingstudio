import type { Studio } from '@/lib/chatbot-scenario';

const badgeColors = ['bg-slate-800', 'bg-amber-600', 'bg-brand'] as const;

// Editorial examples based on portfolio mood, not submitted customer testimonials.
const exampleQuotes: Record<string, string> = {
    glenhaus: '정원 사진은 싱그럽고 실내 컷은 차분해서, 같은 날의 사진인데도 서로 다른 매력이 느껴져요.',
    arkki: '가든 테라스의 밝은 분위기가 저희 취향과 잘 맞아요. 함께 웃는 모습이 가장 마음에 들어요.',
    emily: '장미와 초록빛 배경이 어우러져 사랑스러운 느낌이에요. 시간이 지나도 따뜻하게 꺼내 볼 사진 같아요.',
    aowheim: '벽돌 하우스와 아치 배경이 차분해서 좋아요. 두 사람이 함께 있는 모습이 한 장의 영화처럼 느껴져요.',
    urban: '수국 배경의 싱그러움과 루프탑의 여유로운 분위기가 모두 매력적이에요. 자연스러운 컷이 특히 좋아요.',
    plannote: '빛이 들어오는 실내 컷과 골목 사진의 분위기가 달라서 좋아요. 일상의 한 장면처럼 편안한 느낌이에요.',
    raandy: '정원의 초록빛과 부드러운 색감이 마음에 들어요. 사진을 볼 때마다 둘이 웃던 순간이 떠오를 것 같아요.',
    lean: '꽃과 자연광이 어우러진 부드러운 분위기가 좋아요. 과하게 꾸민 느낌 없이 로맨틱해서 마음에 들어요.',
    ive: '밝은 하우스와 정원 배경이 편안하게 느껴져요. 특별한 날이면서도 평소의 저희 모습 같은 사진을 좋아해요.',
    louis246: '플라워 공간의 화사함과 한옥 야경의 차분함이 모두 좋아요. 여러 분위기로 앨범을 채우고 싶어져요.',
    voir: '화이트 공간에서 표정이 잘 드러나는 느낌이 좋아요. 서로를 보며 웃는 컷이 가장 오래 기억에 남을 것 같아요.',
    noua: '커튼 사이로 들어오는 부드러운 빛과 흑백 사진이 마음에 들어요. 담백한 분위기라 오래 봐도 좋을 것 같아요.',
    semiang: '커다란 창과 초록빛 정원이 함께 보여서 좋아요. 화사한 사진과 차분한 흑백 컷을 같이 남기고 싶어요.',
    needs: '실내부터 정원, 야간 사진까지 분위기가 다양해요. 저희가 좋아하는 장면을 골라 보는 재미가 있어요.',
    benoit: '따뜻한 우드 공간의 색감이 특히 좋아요. 클래식하면서도 편안한 분위기의 사진이 마음에 들어요.',
    sonar: '밝은 실내 컷과 가든 사진에서 자연스러운 느낌이 전해져요. 꾸밈없는 표정이 잘 어울리는 분위기예요.',
    pia: '배경보다 두 사람에게 시선이 가는 사진이 좋아요. 흑백 컷에서도 표정과 분위기가 또렷하게 느껴져요.',
    vivienda: '공간의 선과 빛이 어우러진 구도가 인상적이에요. 차분하고 절제된 분위기를 좋아하는 저희 취향이에요.',
    arsen: '하우스 공간과 소품이 일상처럼 친근해요. 데이트하던 날처럼 편안한 느낌의 사진이 마음에 들어요.',
    aura: '플라워 공간의 화사한 컷과 야경 사진의 분위기가 달라서 좋아요. 앨범에 다양한 장면을 담고 싶어요.',
    hazely: '넓은 잔디 정원의 여유로운 느낌이 좋아요. 햇살 속에서 함께 걷는 장면이 특히 기억에 남아요.',
    elai: '창가 사진과 야외 컷 모두 부드럽고 자연스러워요. 서로를 바라보는 장면이 따뜻하게 느껴져요.',
    voirhaus: '밝은 화이트 공간이 깔끔해서 두 사람의 표정에 집중하게 돼요. 웃는 모습이 담긴 사진을 오래 간직하고 싶어요.',
    bemy: '하우스의 따뜻한 분위기와 정원의 싱그러움이 잘 어울려요. 화사하면서도 편안한 색감이 좋아요.',
    'baro-oneul': '창가의 부드러운 빛과 정원 사진이 마음에 들어요. 장난스럽게 웃는 장면이 특히 사랑스럽게 느껴져요.',
    'go-studio': '정원과 클래식 공간, 바다 사진까지 분위기가 다양해요. 노을 속 두 사람의 실루엣이 특히 인상적이에요.',
    nowood: '차분한 실내 컷과 인물 사진의 분위기가 좋아요. 담백한 구도 속에서 두 사람의 표정이 눈에 들어와요.',
    'venessa-lumenhaus': '정원과 한옥의 따뜻한 분위기가 모두 좋아요. 화사한 사진과 차분한 장면을 함께 모아 보고 싶어요.',
    luvjoy: '실내에서 편안하게 웃는 컷이 일상처럼 느껴져요. 도심과 바다 사진에서도 두 사람만의 분위기가 보여요.',
    luvhaus: '정원과 한옥 배경이 어우러진 모습이 멋져요. 밤 조명이 켜진 사진은 또 다른 로맨틱함이 느껴져요.',
    noi: '숲과 해변 사진의 여유로운 느낌이 좋아요. 실내 인물 컷과 함께 보니 앨범의 분위기가 더욱 풍성해요.',
    'love-each-other': '따뜻한 창가 빛 속에서 서로를 바라보는 사진이 좋아요. 평소의 다정한 순간을 남기는 느낌이에요.',
    'monet-haeundae': '차분한 인물 사진과 정원의 초록빛 배경이 마음에 들어요. 자연스러운 눈빛이 오래 기억에 남을 것 같아요.',
    bellybygo: '하우스와 숲속 사진이 따뜻하게 느껴져요. 한옥의 분위기와 노을빛이 더해진 장면도 마음에 들어요.',
    modernmind: '싱그러운 가든 컷과 해변 사진이 모두 좋아요. 밤 조명이 켜진 정원은 특별한 추억처럼 느껴져요.',
    odette: '플라워 연출과 클래식한 공간이 화사해요. 한복 화보까지 서로 다른 스타일을 골라 보는 재미가 있어요.',
    onne: '창가의 빛과 차분한 실내 공간이 부드럽게 느껴져요. 정원과 노을 사진까지 따뜻한 분위기가 이어져요.',
};

function ReviewCard({ studio, index, hidden = false }: { studio: Studio; index: number; hidden?: boolean }) {
    const color = badgeColors[index % badgeColors.length];
    const quote = exampleQuotes[studio.slug] ?? `${studio.name}의 촬영 분위기를 살펴보니 두 사람만의 사진을 남기고 싶어져요. 오래 간직하고 싶은 장면을 함께 골라 보고 싶어요.`;

    return (
        <article
            aria-hidden={hidden}
            className="flex h-[260px] w-[280px] shrink-0 flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
        >
            <div className="flex items-start justify-between gap-2">
                <span className="rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-semibold text-gray-500">예시 후기</span>
                <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold text-white ${color}`}>
                    {studio.tags[0] ?? '웨딩 촬영'}
                </span>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-gray-600">{quote}</p>

            <div className="mt-auto flex items-center gap-2.5 border-t border-gray-100 pt-4">
                <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${color}`}>
                    {studio.name.slice(0, 1)}
                </span>
                <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-gray-900">{studio.name}</p>
                    <p className="text-xs text-gray-400">촬영 분위기를 참고한 예시</p>
                </div>
            </div>
        </article>
    );
}

export function ReviewsSection({ studios }: { studios: Studio[] }) {
    if (studios.length === 0) return null;

    return (
        <section id="reviews" className="scroll-mt-20 border-t border-gray-100 py-20 md:py-28">
            <div className="mx-auto max-w-2xl px-6 text-center md:px-10">
                <h2 className="text-4xl font-extrabold leading-snug text-gray-900 md:text-5xl">
                    두 사람의 취향으로 살펴보는
                    <br />
                    <span className="text-brand">스튜디오별 촬영 후기</span>
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-gray-500">
                    등록된 스튜디오의 촬영 분위기를 바탕으로 작성한 예시 후기입니다.
                    <br />
                    실제 고객이 작성한 후기나 평점이 아닙니다.
                </p>
            </div>

            <div className="relative mt-14 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
                <div className="review-marquee-track" style={{ animationDuration: `${Math.max(studios.length * 5, 25)}s` }}>
                    <div className="review-marquee-group">
                        {studios.map((studio, index) => (
                            <ReviewCard key={studio.slug} studio={studio} index={index} />
                        ))}
                    </div>
                    <div className="review-marquee-group" aria-hidden="true">
                        {studios.map((studio, index) => (
                            <ReviewCard key={`${studio.slug}-repeat`} studio={studio} index={index} hidden />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
