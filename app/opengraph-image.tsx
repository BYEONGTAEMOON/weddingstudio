import { ImageResponse } from 'next/og';

import { SITE_DESCRIPTION, SITE_TITLE } from '@/lib/seo';

export const alt = SITE_TITLE;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #46503c 0%, #353c2d 100%)',
                    color: '#fff',
                    padding: '80px',
                    textAlign: 'center',
                }}
            >
                <div style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.3 }}>{SITE_TITLE}</div>
                <div style={{ marginTop: 28, fontSize: 32, opacity: 0.92, lineHeight: 1.5 }}>{SITE_DESCRIPTION}</div>
            </div>
        ),
        { ...size },
    );
}
