import { ClipboardCheckIcon, ShieldCheckIcon } from './icons';

const cards = [
    {
        icon: ShieldCheckIcon,
        title: ['직접 검증한', '웨딩스튜디오 포트폴리오'],
        description: [
            '실제 촬영 결과물과 최신 견적 데이터를 바탕으로',
            '실제와 다른 과장된 정보 없이 정직하게 안내해드립니다.',
        ],
    },
    {
        icon: ClipboardCheckIcon,
        title: ['숨은 비용 없는', '투명한 견적 비교'],
        description: [
            '촬영 패키지부터 앨범·원본·추가 비용까지 항목별로 꼼꼼하게 비교해',
            '예상치 못한 추가 비용 없이 준비하실 수 있도록 도와드립니다.',
        ],
    },
];

export function TrustSection() {
    return (
        <section className="border-t border-gray-100 px-6 py-20 md:px-10 md:py-28">
            <div className="mx-auto max-w-3xl text-center">
                <h2 className="mt-6 text-4xl font-extrabold leading-snug text-gray-900 md:text-5xl">
                    믿을 수 있는 <span className="text-brand">정보</span>로 준비하는
                    <br />
                    <span className="text-brand">웨딩스튜디오스캔GO</span>
                </h2>

                <p className="mt-3 text-xl font-bold text-gray-900">
                    Safe Wedding
                </p>
            </div>

            <div className="mx-auto mt-12 grid max-w-6xl gap-8 md:grid-cols-2">
                {cards.map(({ icon: Icon, title, description }) => (
                    <div
                        key={title[0]}
                        className="relative rounded-2xl bg-gray-50 p-12"
                    >
                        <Icon className="absolute right-10 top-10 h-20 w-20 text-gray-900" />
                        <h3 className="max-w-[70%] text-2xl font-bold leading-snug text-gray-900">
                            {title[0]}
                            <br />
                            {title[1]}
                        </h3>
                        <p className="mt-5 text-sm leading-relaxed text-gray-500">
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
