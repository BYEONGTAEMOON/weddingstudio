import { ArrowRightIcon, CakeIcon, CalendarHeartIcon, ClockIcon, DressIcon, GiftIcon } from './icons';
import { ScanGoButton } from './scan-go-button';

const deals = [
    {
        icon: CalendarHeartIcon,
        title: '주말 촬영 골든타임',
        description: [
            '가장 먼저 마감되는 인기 촬영 시간대예요.',
            '남은 촬영 일정을 실시간으로 먼저 확인하세요.',
        ],
        benefit: '예약 시 촬영 패키지 최대 50만원 지원',
    },
    {
        icon: CakeIcon,
        title: '봄·가을 촬영 성수기 특가',
        description: [
            '성수기 인기 스튜디오는 빠르게 마감돼요.',
            '촬영일별 적용 가능한 스튜디오 특가를 정리해드려요.',
        ],
        benefit: '원본 전체 제공 + 액자 업그레이드',
    },
    {
        icon: DressIcon,
        title: '얼리버드·비수기 알뜰 특가',
        description: [
            '비수기 촬영은 같은 구성도 더 합리적이에요.',
            '얼리버드 전용 할인가를 먼저 확인하세요.',
        ],
        benefit: '촬영 할인 + 웨딩 소품 추가 제휴 혜택',
    },
];

export function DealsSection() {
    return (
        <section className="border-t border-gray-100 bg-gray-50 px-6 py-20 md:px-10 md:py-28">
            <div className="mx-auto max-w-2xl text-center">
                <p className="text-sm font-medium tracking-[0.2em] text-gray-400">
                    2027 LIMITED
                </p>
                <h2 className="mt-4 text-4xl font-extrabold text-gray-900 md:text-5xl">
                    2027 <span className="text-brand">얼리버드</span> 특가혜택
                </h2>
                <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-gray-500 md:text-base">
                    인기 시즌·주말 촬영 일정은 빠르게 마감돼요.
                    <br />
                    남은 일정 한정 특가 혜택을 실시간으로 먼저 확인하세요.
                </p>

                <span className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white">
                    <ClockIcon className="h-4 w-4" />
                    이번 달 특가 마감까지 D-26
                </span>
            </div>

            <div className="mx-auto mt-14 grid max-w-6xl gap-6 md:grid-cols-3">
                {deals.map((deal) => (
                    <div
                        key={deal.title}
                        className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
                    >
                        <div className="h-1.5 bg-brand" />
                        <div className="flex h-full flex-col p-8">
                            <div className="flex items-center justify-between">
                                <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand text-white">
                                    <deal.icon className="h-6 w-6" />
                                </span>
                                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
                                    마감 임박
                                </span>
                            </div>

                            <h3 className="mt-6 text-lg font-bold text-gray-900">
                                {deal.title}
                            </h3>
                            <p className="mt-3 text-sm leading-relaxed text-gray-500">
                                {deal.description[0]}
                                <br />
                                {deal.description[1]}
                            </p>

                            <span className="mt-5 inline-flex items-center gap-2 rounded-lg bg-brand-light px-4 py-3 text-sm font-medium text-brand-dark">
                                <GiftIcon className="h-4 w-4 shrink-0" />
                                {deal.benefit}
                            </span>

                            <ScanGoButton className="mt-6 inline-flex items-center gap-1 self-start text-sm font-semibold text-brand transition-colors hover:text-brand-dark">
                                {deal.title} 촬영 일정 확인
                                <ArrowRightIcon className="h-4 w-4" />
                            </ScanGoButton>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
