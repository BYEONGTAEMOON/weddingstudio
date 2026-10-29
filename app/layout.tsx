import type { Metadata, Viewport } from 'next';
import { Geist_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import { ScanModalProvider } from './components/scan-modal-context';
import { StructuredData } from './structured-data';
import {
    FACEBOOK_DOMAIN_VERIFICATION,
    NAVER_SITE_VERIFICATION,
    SITE_BRAND_NAME,
    SITE_DESCRIPTION,
    SITE_KEYWORDS,
    SITE_TITLE,
    SITE_URL,
} from '@/lib/seo';

// Subset of PretendardVariable.woff2 (2.0MB → 0.5MB): the 2,350 KS X 1001 Hangul
// syllables plus Latin, punctuation and symbols. Rare syllables outside that
// set fall back to the system Korean font in the body font-family stack.
const pretendard = localFont({
    src: './fonts/PretendardVariable.subset.woff2',
    variable: '--font-pretendard',
    weight: '45 920',
    display: 'swap',
});

// Only the admin dashboard uses the mono font, so public pages don't preload it.
const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
    preload: false,
});

export const viewport: Viewport = {
    themeColor: '#46503c',
};

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        template: `%s | ${SITE_BRAND_NAME}`,
        default: SITE_TITLE,
    },
    description: SITE_DESCRIPTION,
    keywords: SITE_KEYWORDS,
    applicationName: SITE_BRAND_NAME,
    // No site-wide canonical here: child routes (404, admin) would inherit it and
    // point at the home page. Each indexable page sets its own instead.
    openGraph: {
        title: SITE_TITLE,
        description: SITE_DESCRIPTION,
        url: SITE_URL,
        siteName: SITE_BRAND_NAME,
        locale: 'ko_KR',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: SITE_TITLE,
        description: SITE_DESCRIPTION,
    },
    verification: {
        other: {
            'naver-site-verification': NAVER_SITE_VERIFICATION,
            'facebook-domain-verification': FACEBOOK_DOMAIN_VERIFICATION,
        },
    },
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
    return (
        <html
            lang="ko"
            className={`${pretendard.variable} ${geistMono.variable} h-full antialiased`}
        >
            <body className="min-h-full flex flex-col">
                <StructuredData />
                <ScanModalProvider>{children}</ScanModalProvider>
            </body>
        </html>
    );
}
