import type { MetadataRoute } from 'next';

import { SITE_URL } from '@/lib/seo';

// The site currently has exactly one real, indexable, public URL: the home
// page. /admin/* is noindex and login-gated, /api/* returns no crawlable
// content, and every section is an in-page anchor (#studios etc.),
// not a separate resource — so none of those belong in the sitemap. Add
// entries here only when an actual new indexable route is added.
export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: SITE_URL,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
    ];
}
