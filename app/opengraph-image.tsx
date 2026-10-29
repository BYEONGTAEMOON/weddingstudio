import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import { ImageResponse } from 'next/og';

import { SITE_TITLE } from '@/lib/seo';

export const alt = SITE_TITLE;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Real portfolio shots from public/studios/, so a shared link previews what the
// site actually offers instead of a text-only card.
const PREVIEW_PHOTOS = ['glenhaus', 'urban', 'plannote'];

async function photoDataUrl(slug: string): Promise<string> {
    const bytes = await readFile(join(process.cwd(), 'public', 'studios', slug, 'main.jpg'));
    return `data:image/jpeg;base64,${bytes.toString('base64')}`;
}

export default async function OpengraphImage() {
    const photos = await Promise.all(PREVIEW_PHOTOS.map(photoDataUrl));

    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    background: 'linear-gradient(135deg, #46503c 0%, #353c2d 100%)',
                    color: '#fff',
                    padding: '0 56px 0 72px',
                }}
            >
                <div style={{ display: 'flex', flexDirection: 'column', width: 540 }}>
                    <div style={{ fontSize: 22, letterSpacing: 6, color: '#aab89a' }}>WEDDING STUDIO SCAN</div>
                    <div style={{ display: 'flex', flexDirection: 'column', marginTop: 24, fontSize: 76, lineHeight: 1.15 }}>
                        <span>웨딩스튜디오</span>
                        <span>스캔 라모르</span>
                    </div>
                    <div
                        style={{ display: 'flex', flexDirection: 'column', marginTop: 32, fontSize: 28, lineHeight: 1.5, color: 'rgba(255,255,255,0.85)' }}
                    >
                        <span>촬영 비용·패키지·포트폴리오를</span>
                        <span>한눈에 비교하고 맞춤 견적까지</span>
                    </div>
                    <div style={{ marginTop: 40, fontSize: 24, color: '#aab89a' }}>studiowedding.app</div>
                </div>

                <div style={{ display: 'flex', gap: 14, marginLeft: 'auto' }}>
                    {photos.map((src, i) => (
                        <img
                            key={PREVIEW_PHOTOS[i]}
                            src={src}
                            alt=""
                            width={166}
                            height={i === 1 ? 470 : 420}
                            style={{ objectFit: 'cover', borderRadius: 16, marginTop: i === 1 ? 0 : 50 }}
                        />
                    ))}
                </div>
            </div>
        ),
        { ...size },
    );
}
