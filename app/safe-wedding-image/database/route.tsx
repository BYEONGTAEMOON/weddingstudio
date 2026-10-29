import { weddingCardImageResponse } from '@/lib/wedding-card-image';

// A 3-tier wedding cake with a heart topper — for the "스튜디오 포트폴리오 확보" card.
export async function GET() {
    return weddingCardImageResponse(
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <svg width="34" height="34" viewBox="0 0 24 24" fill="#fff" style={{ marginBottom: 10 }}>
                <path d="M12 21s-7-4.6-9.5-9C1 8 2.5 4 6.5 4c2 0 3.5 1.2 4.5 2.8C12 5.2 13.5 4 15.5 4 19.5 4 21 8 19.5 12 17 16.4 12 21 12 21z" />
            </svg>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 100,
                    height: 42,
                    background: '#fff',
                    borderRadius: 8,
                    marginBottom: 10,
                }}
            >
                <div style={{ width: 70, height: 7, background: '#46503c', borderRadius: 4 }} />
            </div>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 165,
                    height: 58,
                    background: '#fff',
                    borderRadius: 10,
                    marginBottom: 10,
                }}
            >
                <div style={{ width: 115, height: 8, background: '#46503c', borderRadius: 4 }} />
            </div>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 230,
                    height: 74,
                    background: '#fff',
                    borderRadius: 12,
                }}
            >
                <div style={{ width: 160, height: 9, background: '#46503c', borderRadius: 5 }} />
            </div>
        </div>,
    );
}
