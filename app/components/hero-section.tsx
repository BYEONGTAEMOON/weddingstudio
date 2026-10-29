import { BellIcon, BouquetIcon, PlaneIcon, RingIcon, SuitcaseIcon, TicketIcon } from './icons';
import { ScanGoButton } from './scan-go-button';

const badges = [
    { icon: SuitcaseIcon, label: '50+ 제휴 웨딩스튜디오' },
    { icon: TicketIcon, label: '예비부부 전용 특전 혜택' },
    { icon: PlaneIcon, label: '촬영일별 예약 가능 확인' },
];

const features = [
    {
        icon: RingIcon,
        title: '웨딩스튜디오 지원혜택',
        description: [
            '촬영 패키지 얼리버드 할인부터',
            '원본·액자 추가 혜택까지',
        ],
    },
    {
        icon: BouquetIcon,
        title: '웨딩스튜디오 맞춤 상담 서비스',
        description: [
            '여기저기 발품 팔지 않아도',
            '한 곳에서 전문가 1:1 스튜디오 컨설팅',
        ],
    },
    {
        icon: BellIcon,
        title: '실시간 특가·최적 스튜디오 비교',
        description: ['우리가 원하는 촬영 스타일에', '최대 혜택 스튜디오 정보 제공'],
    },
];

export function HeroSection() {
    return (
        <section className="px-6 pb-20 pt-20 md:px-10 md:pt-28">
            <div className="mx-auto max-w-3xl text-center">
                <p className="text-sm font-medium tracking-[0.2em] text-gray-400">
                    Wedding Studio Scan Go
                </p>

                <h1 className="mt-6 text-4xl font-extrabold leading-tight text-gray-900 md:text-5xl">
                    복잡한 <span className="text-brand">웨딩스튜디오</span> 비교견적
                    <br />
                    촬영 상담을{' '}
                    <span className="text-brand">속 시원하게 한 번에!</span>
                </h1>

                <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-gray-500 md:text-lg">
                    인물·배경·야외·콘셉트 촬영까지
                    <br />
                    인기 웨딩스튜디오를 한 곳에서 비교하고 예약하세요.
                    <br />
                    평생 남을 웨딩 사진의 시작입니다.
                </p>

                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <ScanGoButton className="inline-flex items-center justify-center rounded-lg bg-brand px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark sm:text-base">
                        내 스타일 스튜디오 찾기
                    </ScanGoButton>
                    <a
                        href="#popular"
                        className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-7 py-3.5 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-50 sm:text-base"
                    >
                        인기 스튜디오 둘러보기
                    </a>
                </div>

                <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                    {badges.map(({ icon: Icon, label }) => (
                        <span
                            key={label}
                            className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2.5 text-sm text-gray-600"
                        >
                            <Icon className="h-4 w-4 text-brand" />
                            {label}
                        </span>
                    ))}
                </div>
            </div>

            <div className="mx-auto mt-16 grid max-w-5xl gap-6 md:grid-cols-3">
                {features.map(({ icon: Icon, title, description }) => (
                    <div
                        key={title}
                        className="flex flex-col items-center gap-4 rounded-2xl border border-gray-100 bg-gray-50 px-8 py-10 text-center"
                    >
                        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand text-white">
                            <Icon className="h-6 w-6" />
                        </span>
                        <h2 className="text-lg font-bold text-gray-900">
                            {title}
                        </h2>
                        <p className="text-sm leading-relaxed text-gray-500">
                            {description[0]}
                            <br />
                            {description[1]}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
