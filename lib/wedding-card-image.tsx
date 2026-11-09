import { ImageResponse } from 'next/og';
import type { ReactNode } from 'react';

export const WEDDING_CARD_IMAGE_SIZE = { width: 600, height: 800 };

// Shared renderer for the three SafeWeddingSection cards — a brand-gradient
// background with a large outline icon, generated on request instead of
// hotlinking unrelated stock photos from an external site.
export function weddingCardImageResponse(icon: ReactNode) {
    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(160deg, #f8743d 0%, #f75d15 100%)',
                }}
            >
                {icon}
            </div>
        ),
        { ...WEDDING_CARD_IMAGE_SIZE },
    );
}
