import { NextResponse } from 'next/server';

import { requireAdminSession } from '@/lib/admin-guard';
import { getPrisma } from '@/lib/prisma';

// Vercel caps a function request body at 4.5MB; the admin UI downscales photos
// to well under this before uploading.
const MAX_UPLOAD_BYTES = 4 * 1024 * 1024;

// The content type is taken from the file's magic bytes, never from the
// client-declared type — these images are served publicly, so anything that
// isn't a plain raster photo (e.g. an SVG carrying script) is rejected.
function sniffImageType(bytes: Uint8Array): string | null {
    if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return 'image/jpeg';
    if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) return 'image/png';
    const ascii = (start: number, end: number) => String.fromCharCode(...bytes.slice(start, end));
    if (ascii(0, 4) === 'RIFF' && ascii(8, 12) === 'WEBP') return 'image/webp';
    return null;
}

export async function POST(request: Request) {
    if (!(await requireAdminSession())) {
        return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 });
    }

    let file: FormDataEntryValue | null;
    try {
        file = (await request.formData()).get('file');
    } catch {
        return NextResponse.json({ error: '잘못된 요청입니다.' }, { status: 400 });
    }

    if (!(file instanceof File)) {
        return NextResponse.json({ error: '이미지 파일을 선택해주세요.' }, { status: 400 });
    }
    if (file.size > MAX_UPLOAD_BYTES) {
        return NextResponse.json({ error: '이미지 용량이 너무 커요. (최대 4MB)' }, { status: 413 });
    }

    const bytes = new Uint8Array(await file.arrayBuffer());
    const contentType = sniffImageType(bytes);
    if (!contentType) {
        return NextResponse.json({ error: 'JPG, PNG, WEBP 이미지만 업로드할 수 있어요.' }, { status: 400 });
    }

    try {
        const prisma = getPrisma();
        const image = await prisma.uploadedImage.create({ data: { data: bytes, contentType }, select: { id: true } });
        return NextResponse.json({ url: `/api/images/${image.id}` });
    } catch (error) {
        console.error('Failed to save uploaded image', error);
        return NextResponse.json({ error: '업로드에 실패했습니다.' }, { status: 500 });
    }
}
