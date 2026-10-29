import type { MetadataRoute } from 'next';

import { SITE_URL } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                // /admin/* pages are noindex'd individually (see each route's
                // metadata) rather than disallowed here — disallowing them would
                // stop crawlers from ever fetching the page to see that noindex
                // tag, which can leave a stale/empty entry indexed instead of
                // cleanly excluding it. /api/* returns JSON with no meta tags to
                // read, so disallow is the only tool that applies there — except
                // /api/images/*, which serves admin-uploaded studio photos that
                // should stay crawlable for image search (the longer, more
                // specific allow rule wins over the /api/ disallow).
                allow: ['/', '/api/images/'],
                disallow: ['/api/'],
            },
        ],
        sitemap: `${SITE_URL}/sitemap.xml`,
    };
}
