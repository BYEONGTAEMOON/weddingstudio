'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

// How long the carousel stays paused after a finger lifts, so there's time to
// read a card or tap its buttons before it starts moving again.
const TOUCH_RESUME_DELAY_MS = 3000;

// Auto-scrolling track: pauses on mouse hover and keyboard focus (CSS), and on
// touch — phones have no hover, so a tap holds it still until shortly after release.
export function MarqueeTrack({ children, className }: { children: ReactNode; className: string }) {
    const [touchPaused, setTouchPaused] = useState(false);
    const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    function clearResumeTimer() {
        if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
        resumeTimerRef.current = null;
    }

    function scheduleResume() {
        clearResumeTimer();
        resumeTimerRef.current = setTimeout(() => setTouchPaused(false), TOUCH_RESUME_DELAY_MS);
    }

    useEffect(() => clearResumeTimer, []);

    return (
        <div
            className={`${className} hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]`}
            style={touchPaused ? { animationPlayState: 'paused' } : undefined}
            onTouchStart={() => {
                clearResumeTimer();
                setTouchPaused(true);
            }}
            onTouchEnd={scheduleResume}
            onTouchCancel={scheduleResume}
        >
            {children}
        </div>
    );
}
