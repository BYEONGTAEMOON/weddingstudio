import importedStudios from './imported-studios.json';

export type TextItem = { title: string; desc: string };
export type TagItem = { title: string; tag: string };
// `popular` marks studios shown in the homepage "인기 업체 둘러보기" carousel; every studio
// is listed in the full studio grid either way. `samples` are the portfolio photos
// opened by the card's "샘플보기" button (the button is hidden when there are none).
export type Studio = {
    slug: string;
    name: string;
    description: string;
    tags: string[];
    image: string;
    samples?: string[];
    popular?: boolean;
};

export type ChatbotScenario = {
    introMessage: string;
    monthRangeStart: string;
    monthRangeEnd: string;
    budgets: string[];
    budgetQuestion: string;
    studioPickerIntro: string;
    afterStudioMessage: string;
    phoneQuestion: string;
    privacyNotice: string;
    residences: string[];
    residenceQuestion: string;
    nameQuestion: string;
    freeItems: TextItem[];
    extraBenefits: TagItem[];
    completionSubtitle: string;
    completionClosing: string;
    studios: Studio[];
};

// Real portfolio photos, cropped out of each studio's album spreads and served
// from public/studios/<slug>/ as main.jpg + sample-01.jpg, sample-02.jpg, ...
function withLocalPhotos(studio: Omit<Studio, 'image' | 'samples'>, sampleCount: number): Studio {
    const dir = `/studios/${studio.slug}`;
    return {
        ...studio,
        image: `${dir}/main.jpg`,
        samples: Array.from({ length: sampleCount }, (_, i) => `${dir}/sample-${String(i + 1).padStart(2, '0')}.jpg`),
    };
}

const GLENHAUS = withLocalPhotos(
    {
        slug: 'glenhaus',
        name: '글렌하우스',
        description: '자연광 실내 세트와 정원 야외 촬영, 흑백 화보까지 감도 높은 에디토리얼 무드로 담아내는 웨딩스튜디오',
        tags: ['에디토리얼', '정원야외', '흑백화보'],
        popular: true,
    },
    69,
);

const ARKKI = withLocalPhotos(
    {
        slug: 'arkki',
        name: '아키',
        description: '햇살 가득한 가든 테라스와 화이트 세트, 야간 도심 스냅까지 밝고 유쾌한 감성을 담아내는 웨딩스튜디오',
        tags: ['가든테라스', '내추럴', '야간스냅'],
        popular: true,
    },
    47,
);

const EMILY = withLocalPhotos(
    {
        slug: 'emily',
        name: '에밀리',
        description: '장미 가든 테라스와 화이트 하우스 세트, 노을·야간 도심 스냅까지 사랑스럽고 생기 있는 무드를 담아내는 웨딩스튜디오',
        tags: ['로즈가든', '러블리', '야간스냅'],
        popular: true,
    },
    74,
);

const AOWHEIM = withLocalPhotos(
    {
        slug: 'aowheim',
        name: '아오베하임',
        description: '붉은 벽돌 하우스와 아치 현관, 정원 산책로까지 유럽 웨딩하우스의 차분하고 고급스러운 무드를 담아내는 웨딩스튜디오',
        tags: ['웨딩하우스', '유럽감성', '정원산책로'],
        popular: true,
    },
    81,
);

const URBAN = withLocalPhotos(
    {
        slug: 'urban',
        name: '어반',
        description: '수국 가든과 아이언 게이트, 루프탑 노을까지 싱그럽고 트렌디한 무드를 담아내는 웨딩스튜디오',
        tags: ['수국가든', '루프탑', '트렌디'],
        popular: true,
    },
    64,
);

const PLANNOTE = withLocalPhotos(
    {
        slug: 'plannote',
        name: '플랜노트',
        description: '햇살이 머무는 화이트 세트와 감각적인 소품, 골목 스냅과 야간 테라스까지 필름 같은 무드를 담아내는 웨딩스튜디오',
        tags: ['자연광', '필름감성', '골목스냅'],
        popular: true,
    },
    83,
);

const RAANDY = withLocalPhotos(
    {
        slug: 'raandy',
        name: '라앤디',
        description: '자연광 화이트 세트와 초록빛 정원, 노을과 야간 스냅까지 자연스러운 표정과 따뜻한 순간을 담은 웨딩스튜디오',
        tags: ['자연광', '가든', '감성스냅'],
        popular: true,
    },
    76,
);

const LEAN = withLocalPhotos(
    {
        slug: 'lean',
        name: '르안',
        description: '초록빛 가든과 따뜻한 자연광 세트, 플라워 연출과 도심 야경까지 부드럽고 로맨틱한 순간을 담은 웨딩스튜디오',
        tags: ['자연광', '플라워', '로맨틱'],
        popular: true,
    },
    41,
);

const IVE = withLocalPhotos(
    {
        slug: 'ive',
        name: '아이브',
        description: '햇살 가득한 하우스와 초록빛 정원, 편안한 실내 공간과 노을 스냅까지 자연스러운 두 사람의 순간을 담은 웨딩스튜디오',
        tags: ['하우스', '자연광', '가든스냅'],
        popular: true,
    },
    36,
);

const LOUIS246 = withLocalPhotos(
    {
        slug: 'louis246',
        name: '루이246',
        description: '밝은 자연광과 풍성한 플라워 세트, 숲속 스냅과 한옥 야경까지 다채로운 공간에서 로맨틱한 순간을 담는 웨딩스튜디오',
        tags: ['자연광', '플라워', '한옥야경'],
        popular: true,
    },
    65,
);

const VOIR = withLocalPhotos(
    {
        slug: 'voir',
        name: '보어',
        description: '햇살 가득한 화이트 공간과 초록빛 정원, 감각적인 컬러 세트에서 자연스러운 표정과 로맨틱한 순간을 담는 웨딩스튜디오',
        tags: ['자연광', '가든', '내추럴'],
        popular: true,
    },
    73,
);

const NOUA_PHOTOS = withLocalPhotos(
    {
        slug: 'noua',
        name: '누아',
        description: '부드러운 커튼 자연광과 절제된 실내 세트, 흑백 화보와 편안한 스냅으로 두 사람의 분위기를 담는 웨딩스튜디오',
        tags: ['자연광', '인물중심', '흑백화보'],
        popular: true,
    },
    25,
);

// SVG viewports crop the original album photos without regenerating their pixels.
const NOUA: Studio = {
    ...NOUA_PHOTOS,
    image: '/studios/noua/main.svg',
    samples: Array.from({ length: 41 }, (_, i) => `/studios/noua/crop-${String(i + 1).padStart(2, '0')}.svg`),
};

const DEFAULT_STUDIOS: Studio[] = [
    GLENHAUS,
    ARKKI,
    EMILY,
    AOWHEIM,
    URBAN,
    PLANNOTE,
    RAANDY,
    LEAN,
    IVE,
    LOUIS246,
    VOIR,
    NOUA,
    ...importedStudios,

];

export const DEFAULT_CHATBOT_SCENARIO: ChatbotScenario = {
    introMessage:
        '안녕하세요, 웨딩스튜디오스캔GO입니다. 😊\n예식월·예산·거주 지역만 알려주시면 조건에 딱 맞는 웨딩스튜디오와 예상 견적, 촬영 가능일까지 한 번에 비교해드려요.\n\n먼저, 예식은 몇 월쯤으로 생각하고 계세요?\n스튜디오 촬영은 보통 예식 3~6개월 전에 진행돼요. 날짜가 아직 미정이어도 괜찮아요.',
    monthRangeStart: '2026-10',
    monthRangeEnd: '2027-12',
    budgets: ['100만원 이하', '100~200만원', '200~300만원', '300만원 이상'],
    budgetQuestion:
        '{value} 예식 기준으로 촬영 가능일과 견적 조회 도와드릴게요. ✨\n\n예상 스튜디오 촬영 비용은 어느 정도로 보세요? 💰\n촬영 패키지·앨범·원본 구성에 따라 견적이 크게 달라져요.\n정확하지 않아도 괜찮으니 대략 범위로 골라주세요.',
    studioPickerIntro:
        '조건에 맞는 웨딩스튜디오 후보예요.\n마음에 드는 곳이 있다면 모두 골라주세요.\n(없으면 아래 "추천으로 받을게요")\n\n선택하신 스튜디오 + 함께 보면 좋을 스튜디오까지 촬영 가능일 · 예상 총견적 · 제휴 혜택을 한 번에 정리해 드릴게요.',
    afterStudioMessage: '좋아요! 그럼 아래 자료를 무료로 정리해서 보내드릴게요. 🎁',
    phoneQuestion: '정리된 자료를 받으실 휴대폰 번호를 입력해주세요. 📱\n(카카오톡으로 보내드려요)',
    privacyNotice:
        '🔒 남겨주신 연락처는 상담 자료 발송에만 사용하고 안전하게 보관해요. 입력 시 개인정보 처리방침에 동의하는 것으로 간주됩니다.',
    residences: [
        '서울',
        '인천',
        '경기',
        '대전',
        '세종',
        '충북',
        '충남',
        '광주',
        '전북',
        '전남',
        '부산',
        '대구',
        '울산',
        '경북',
        '경남',
        '강원',
        '제주',
    ],
    residenceQuestion: '거주하시는 지역을 선택해주세요. 📍\n가까운 지역 기준으로 상담과 촬영 일정을 더 편하게 안내해드려요.',
    nameQuestion: '신청자 이름을 입력해주세요. 😊\n(자료 발송과 함께 추후 웨딩스튜디오 간편예약 서비스 혜택도 함께 도와드릴게요)',
    freeItems: [
        { title: '2027 웨딩스튜디오 비교 견적표', desc: '촬영·앨범·원본 구성을 한눈에' },
        { title: '선택 스튜디오 촬영 가능일 리포트', desc: '원하는 촬영일 가능성 정리' },
        { title: '스튜디오별 예상 총견적 비교', desc: '추가 비용까지 합산' },
        { title: '제휴 혜택 총정리표', desc: '웨딩스튜디오스캔GO 단독 제휴 적용' },
        { title: '촬영 전 체크리스트', desc: '누락 방지 필수 항목' },
    ],
    extraBenefits: [
        { title: '무료 웨딩스튜디오 예약 간편 서비스', tag: '무료' },
        { title: '상담 확정 시 예비부부 웰컴 기프트 증정', tag: '상담' },
        { title: '예약 확정 시 원본·액자 추가 혜택', tag: '예약' },
    ],
    completionSubtitle: '선택하신 스튜디오 기준 촬영 가능일 · 예상 총견적 · 제휴 혜택 자료를 곧 카카오톡으로 정리해 보내드릴게요.',
    completionClosing:
        '상담·예약 시 받는 혜택은 자료 안내와 함께 웨딩스튜디오 전담 플래너가 카카오톡 안내 시 자세히 알려드릴게요. 🙌\n신청 기준 1일 이내에 카카오톡으로 결과 자료를 공유드리겠습니다.\n\n행복한 결혼 준비의 시작이 되시길 바랍니다. 감사합니다. 💒',
    studios: DEFAULT_STUDIOS,
};

export function applyTemplate(template: string, vars: Record<string, string>): string {
    return Object.entries(vars).reduce((text, [key, value]) => text.split(`{${key}}`).join(value), template);
}

const REMOVED_STUDIO_SLUGS = new Set([
    'maison-de-lumiere',
    'the-olive-garden-studio',
    'studio-monochrome',
    'classic-atelier',
    'hanbok-moment',
    'daily-film-studio',
]);

export function mergeScenario(partial: Partial<ChatbotScenario> | null | undefined): ChatbotScenario {
    // A config saved before the switch from regional wedding halls to wedding
    // studios has no `studios` key — its copy is all about halls/regions, so
    // fall back to the studio defaults entirely instead of mixing the two.
    if (!partial || !('studios' in partial)) return DEFAULT_CHATBOT_SCENARIO;
    const merged = { ...DEFAULT_CHATBOT_SCENARIO, ...partial };
    return {
        ...merged,
        studios: (merged.studios ?? DEFAULT_STUDIOS).filter((studio) => !REMOVED_STUDIO_SLUGS.has(studio.slug)),
    };
}
