import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #f8743d 0%, #f75d15 100%)',
                    borderRadius: 6,
                    color: '#fff',
                    fontSize: 22,
                    fontWeight: 700,
                }}
            >
                웨
            </div>
        ),
        { ...size },
    );
}
