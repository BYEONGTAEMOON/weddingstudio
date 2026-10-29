import { BUSINESS, SITE_BRAND_NAME, SITE_DESCRIPTION, SITE_URL } from '@/lib/seo';

// Deliberately limited to what the page itself actually states — no
// AggregateRating/Review (the on-page testimonials aren't verified collected
// reviews), no BreadcrumbList (single-page site, no real hierarchy), no
// Product/Article/FAQPage (none of that content exists on the page). Adding
// those would be structured data that contradicts the rendered page.
export function StructuredData() {
    const organizationId = `${SITE_URL}/#organization`;

    const data = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Organization',
                '@id': organizationId,
                name: BUSINESS.legalName,
                url: SITE_URL,
                logo: `${SITE_URL}/icon`,
                address: {
                    '@type': 'PostalAddress',
                    streetAddress: BUSINESS.address.streetAddress,
                    addressLocality: BUSINESS.address.addressLocality,
                    addressRegion: BUSINESS.address.addressRegion,
                    addressCountry: BUSINESS.address.addressCountry,
                },
            },
            {
                '@type': 'WebSite',
                '@id': `${SITE_URL}/#website`,
                name: SITE_BRAND_NAME,
                url: SITE_URL,
                inLanguage: 'ko-KR',
                publisher: { '@id': organizationId },
            },
            {
                '@type': 'Service',
                serviceType: '웨딩스튜디오 비교 견적 상담',
                name: `${SITE_BRAND_NAME} 웨딩스튜디오 비교 견적 서비스`,
                description: SITE_DESCRIPTION,
                provider: { '@id': organizationId },
                url: SITE_URL,
            },
        ],
    };

    return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
