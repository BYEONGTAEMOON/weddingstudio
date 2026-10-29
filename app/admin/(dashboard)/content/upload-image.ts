// Phone/camera photos are often 5–15MB, over Vercel's 4.5MB function request
// limit — so every upload is downscaled and re-encoded as JPEG in the browser
// first. 2000px on the long edge stays sharp in the full-screen sample gallery.
const MAX_EDGE_PX = 2000;
const JPEG_QUALITY = 0.85;

async function downscaleToJpeg(file: File): Promise<Blob> {
    let bitmap: ImageBitmap;
    try {
        bitmap = await createImageBitmap(file);
    } catch {
        throw new Error(`"${file.name}" 이미지를 읽을 수 없어요. JPG·PNG·WEBP 파일로 올려주세요.`);
    }

    const scale = Math.min(1, MAX_EDGE_PX / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);

    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('이미지를 처리할 수 없어요.');
    // JPEG has no alpha — paint white first so transparent PNGs don't turn black.
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close();

    return new Promise((resolve, reject) => {
        canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error('이미지를 처리할 수 없어요.'))), 'image/jpeg', JPEG_QUALITY);
    });
}

export async function uploadImage(file: File): Promise<string> {
    const blob = await downscaleToJpeg(file);
    const form = new FormData();
    form.append('file', blob, 'image.jpg');

    const res = await fetch('/api/admin/uploads', { method: 'POST', body: form });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || typeof data.url !== 'string') {
        throw new Error(data.error ?? '업로드에 실패했습니다.');
    }
    return data.url;
}
