// The production origin every canonical URL, sitemap/robots entry, and OG/JSON-LD
// link is built from. It's the www host because the apex domain 308-redirects
// there on Vercel — pointing canonicals at a redirecting URL would split signals.
// NEXT_PUBLIC_SITE_URL can override it (e.g. for a staging domain).
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.studiowedding.app';

// The on-page/visible brand — kept separate from the SEO-focused <title> copy
// so structured data always matches what a visitor (and a crawler fact-checking
// against the rendered page) actually sees in the header/footer.
export const SITE_BRAND_NAME = '웨딩스튜디오스캔GO';

export const SITE_TITLE = '웨딩스튜디오 추천·비교 견적 | 웨딩스튜디오스캔GO';
export const SITE_DESCRIPTION = '촬영 비용, 패키지 구성, 촬영 스타일, 포트폴리오까지 한눈에 비교하고 나에게 맞는 웨딩스튜디오를 찾아보세요.';

export const SITE_KEYWORDS = [
    '웨딩스튜디오',
    '웨딩촬영',
    '웨딩스튜디오 추천',
    '웨딩스튜디오 비교',
    '웨딩스튜디오 견적',
    '스튜디오 촬영',
    '리허설 촬영',
    '스드메',
];

export const NAVER_SITE_VERIFICATION = 'befa219ff14760cfd29427e22d8104187785fe69';
export const FACEBOOK_DOMAIN_VERIFICATION = '5vfx2oyu1ol1cyuq6v5mb9s3kxvhbc';

// Real, currently-displayed business details (site-footer.tsx) — reused as-is
// in structured data so it never asserts anything the page itself doesn't.
export const BUSINESS = {
    legalName: SITE_BRAND_NAME,
    representative: '류수진',
    address: {
        streetAddress: '법원로8번길 10(거제동)',
        addressLocality: '연제구',
        addressRegion: '부산광역시',
        addressCountry: 'KR',
    },
    registrationNumber: '112-86-03487',
} as const;
