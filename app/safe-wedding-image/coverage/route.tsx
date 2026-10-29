import { weddingCardImageResponse } from '@/lib/wedding-card-image';

// Wedding rings — a universally recognizable wedding image for the
// "엄선된 웨딩스튜디오" (coverage) card, with a couple of sparkle accents.
export async function GET() {
    return weddingCardImageResponse(
        <div style={{ position: 'relative', width: 300, height: 300, display: 'flex' }}>
            <svg width="300" height="300" viewBox="0 0 100 100" fill="none">
                <circle cx="38" cy="62" r="23" stroke="#fff" strokeWidth="7" />
                <circle cx="64" cy="62" r="23" stroke="#fff" strokeWidth="7" />
                <path d="M46 32L50.5 15L55 32" stroke="#fff" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="50.5" cy="11" r="4.5" fill="#fff" />
            </svg>
            <div
                style={{
                    position: 'absolute',
                    top: 20,
                    left: 10,
                    width: 16,
                    height: 16,
                    background: '#fff',
                    opacity: 0.85,
                    transform: 'rotate(45deg)',
                    borderRadius: 4,
                }}
            />
            <div
                style={{
                    position: 'absolute',
                    bottom: 30,
                    right: 0,
                    width: 12,
                    height: 12,
                    background: '#fff',
                    opacity: 0.7,
                    transform: 'rotate(45deg)',
                    borderRadius: 3,
                }}
            />
        </div>,
    );
}
