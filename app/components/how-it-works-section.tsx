const steps = [
    {
        number: '01',
        title: '무료 견적·상담 신청',
        description: '온라인으로 원하는 예식 일정과 예산을 간단히 신청, 24시간 이내 웨딩스튜디오 전문 플래너가 1:1 맞춤 견적을 안내해 드려요.',
        highlight: '1분 취향 체크 & 무료 견적 신청',
    },
    {
        number: '02',
        title: '촬영일 & 스튜디오 큐레이션',
        description: '원하시는 예산과 취향에 딱 맞는 촬영 가능일과 엄선된 웨딩스튜디오를 꼼꼼히 비교해 드려요.',
        highlight: '스튜디오·패키지 황금 조합 큐레이션',
    },
    {
        number: '03',
        title: '진행 & 단독 특전 협의',
        description: '두 분의 촬영 스타일(인물·배경·야외·콘셉트)에 맞춘 맞춤 진행과 얼리버드 패키지 업그레이드, 최대 프로모션 혜택을 조율해 드려요.',
        highlight: '1:1 진행 커스텀 & 단독 특전 확정',
    },
    {
        number: '04',
        title: '예약 확정 & 케어 시작',
        description: '투명한 안심 계약 체결부터 촬영 당일 현장 체크, 앨범 수령까지 안심하고 준비하실 수 있도록 끝까지 함께합니다.',
        highlight: '안심 예약 & 실시간 케어',
    },
];

export function HowItWorksSection() {
    return (
        <section id="how-it-works" className="scroll-mt-20 border-t border-gray-100 bg-gray-50 px-6 py-20 md:px-10 md:py-28">
            <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-4xl font-extrabold leading-snug text-gray-900 md:text-5xl">
                    <span className="text-brand">4단계</span>로 완성하는
                    <br />
                    맞춤 웨딩스튜디오 예약
                </h2>

                <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-gray-500 md:whitespace-nowrap md:text-base">
                    복잡한 발품 대신 취향만 말씀해 주세요. 상담부터 촬영 당일까지 4단계 안심 케어로 완성합니다.
                </p>

                <span className="mt-6 inline-flex items-center rounded-full bg-brand px-10 py-4 text-sm font-bold tracking-widest text-white">
                    HOW IT WORKS
                </span>
            </div>

            <div className="mx-auto mt-14 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {steps.map((step) => (
                    <div
                        key={step.number}
                        className="flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
                    >
                        <div className="flex-1 p-6">
                            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand text-base font-bold text-white">
                                {step.number}
                            </span>
                            <p className="mt-4 text-xs font-bold tracking-widest text-gray-500">STEP {step.number}</p>
                            <h3 className="mt-1 text-lg font-bold text-gray-900">{step.title}</h3>
                            <p className="mt-2 text-sm leading-relaxed text-gray-500">{step.description}</p>
                        </div>

                        <p className="bg-brand px-6 py-3 text-center text-sm font-semibold text-white">{step.highlight}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
