import { getPrisma } from '@/lib/prisma';

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// Public: serves admin-uploaded studio photos. Each upload gets a fresh id and
// is never modified in place, so responses are cached as immutable.
export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    if (!UUID_PATTERN.test(id)) {
        return new Response('Not found', { status: 404 });
    }

    try {
        const prisma = getPrisma();
        const image = await prisma.uploadedImage.findUnique({ where: { id } });
        if (!image) {
            return new Response('Not found', { status: 404 });
        }

        return new Response(image.data, {
            headers: {
                'Content-Type': image.contentType,
                'Cache-Control': 'public, max-age=31536000, immutable',
                'X-Content-Type-Options': 'nosniff',
            },
        });
    } catch (error) {
        console.error('Failed to load uploaded image', error);
        return new Response('Internal error', { status: 500 });
    }
}
