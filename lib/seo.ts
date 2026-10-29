// Falls back to the current Vercel deployment domain until a custom domain is
// connected — set NEXT_PUBLIC_SITE_URL (locally and on Vercel) once one is,
// so canonical URLs, the sitemap, robots.txt, and OG/JSON-LD links all follow
// automatically without another code change.
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.daeguweddinghall.com';

// The on-page/visible brand — kept separate from the SEO-focused <title> copy
// so structured data always matches what a visitor (and a crawler fact-checking
// against the rendered page) actually sees in the header/footer.
export const SITE_BRAND_NAME = '웨딩스튜디오스캔GO';

export const SITE_TITLE = '웨딩스튜디오 스캔 라모르';
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

export const NAVER_SITE_VERIFICATION = 'b659b1d6116c8f29dad9bf0eba503e08d80ff7ad';

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
