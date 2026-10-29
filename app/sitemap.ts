import type { MetadataRoute } from 'next';

import { getScenario } from '@/lib/scenario-store';
import { SITE_URL } from '@/lib/seo';

// Regenerated hourly so studios added or re-photographed in the admin show up
// without a redeploy.
export const revalidate = 3600;

function absoluteUrl(src: string): string {
    return src.startsWith('http') ? src : `${SITE_URL}${src}`;
}

// The site has exactly one indexable URL: the home page. /admin/* is noindex and
// login-gated, /api/* holds no pages, and every section (#studios, #popular…) is
// an in-page anchor, not a separate resource. Studio cover photos are listed as
// image-sitemap entries of that page so they can surface in image search. Add a
// URL entry here only when a real new indexable route is added.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const { studios } = await getScenario();
    const images = studios.map((studio) => studio.image).filter(Boolean).map(absoluteUrl);

    return [
        {
            url: SITE_URL,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
            images,
        },
    ];
}
