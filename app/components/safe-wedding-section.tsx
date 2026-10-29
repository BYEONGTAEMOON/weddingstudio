import Image from 'next/image';

const cards = [
    {
        slug: 'coverage',
        stat: '50+ 제휴',
        label: '엄선된 웨딩스튜디오',
        image: '/safe-wedding-image/coverage',
    },
    {
        slug: 'database',
        stat: '누적 500+',
        label: '스튜디오 포트폴리오 확보',
        image: '/safe-wedding-image/database',
    },
    {
        slug: 'response',
        stat: '평균 1일 이내',
        label: '맞춤 견적 회신',
        image: '/safe-wedding-image/response',
    },
];

export function SafeWeddingSection() {
    return (
        <section className="border-t border-gray-100 px-6 py-20 md:px-10 md:py-28">
            <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-4xl font-extrabold leading-snug text-gray-900 md:text-5xl">
                    안전한 <span className="text-brand">스튜디오 선택</span>을 위한
                    <br />
                    <span className="text-brand">웨딩스튜디오스캔GO</span>
                </h2>

                <p className="mt-3 text-xl font-bold text-gray-900">
                    Safe Wedding <span className="text-brand">ScanGo</span>
                </p>
            </div>

            <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-3">
                {cards.map((card) => (
                    <div key={card.slug} className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                        <Image
                            src={card.image}
                            // Decorative illustration — the stat and label are rendered as text below.
                            alt=""
                            fill
                            sizes="(min-width: 640px) 33vw, 100vw"
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 p-6">
                            <p className="text-2xl font-extrabold text-white">{card.stat}</p>
                            <p className="mt-1 text-sm font-medium text-white/90">{card.label}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
