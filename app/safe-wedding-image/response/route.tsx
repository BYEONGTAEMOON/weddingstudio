import { weddingCardImageResponse } from '@/lib/wedding-card-image';

// A single stylized 5-petal flower + stem — for the "맞춤 견적 회신" card.
// Petal centers are placed on a circle of radius 36 around (150,150), 72°
// apart, starting straight up, so the five petals read as one flower head.
export async function GET() {
    const petals = [
        { left: 116, top: 80, color: '#fff' },
        { left: 150.2, top: 104.9, color: '#dfe5d6' },
        { left: 137.2, top: 145.1, color: '#fff' },
        { left: 94.8, top: 145.1, color: '#fff' },
        { left: 81.8, top: 104.9, color: '#dfe5d6' },
    ];

    return weddingCardImageResponse(
        <div style={{ position: 'relative', width: 300, height: 360, display: 'flex' }}>
            {petals.map((p, i) => (
                <div
                    key={i}
                    style={{
                        position: 'absolute',
                        left: p.left,
                        top: p.top,
                        width: 68,
                        height: 68,
                        borderRadius: '50%',
                        background: p.color,
                    }}
                />
            ))}
            <div
                style={{
                    position: 'absolute',
                    left: 134,
                    top: 134,
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: '#46503c',
                }}
            />
            <div style={{ position: 'absolute', left: 145, top: 208, width: 10, height: 130, background: '#fff', borderRadius: 5 }} />
            <div
                style={{
                    position: 'absolute',
                    left: 118,
                    top: 258,
                    width: 34,
                    height: 16,
                    background: '#fff',
                    borderRadius: 10,
                    transform: 'rotate(-20deg)',
                }}
            />
            <div
                style={{
                    position: 'absolute',
                    left: 150,
                    top: 278,
                    width: 34,
                    height: 16,
                    background: '#fff',
                    borderRadius: 10,
                    transform: 'rotate(20deg)',
                }}
            />
        </div>,
    );
}
