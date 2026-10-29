import type { Metadata } from 'next';

import { getScenario } from '@/lib/scenario-store';

import { DealsSection } from './components/deals-section';
import { HeroSection } from './components/hero-section';
import { HowItWorksSection } from './components/how-it-works-section';
import { PopularStudiosSection } from './components/popular-studios-section';
import { ReviewsSection } from './components/reviews-section';
import { SafeWeddingSection } from './components/safe-wedding-section';
import { SiteFooter } from './components/site-footer';
import { SiteHeader } from './components/site-header';
import { StartNowSection } from './components/start-now-section';
import { StudiosSection } from './components/studios-section';
import { TrustSection } from './components/trust-section';

// Studio photos/copy are admin-editable but rarely change, so the home
// page stays statically cached and just revalidates every minute rather than
// hitting the DB on every visitor request.
export const revalidate = 60;

export const metadata: Metadata = {
    alternates: { canonical: '/' },
};

export default async function Home() {
    const scenario = await getScenario();
    const popularStudios = scenario.studios.filter((studio) => studio.popular);

    return (
        <>
            <SiteHeader />
            <main className="flex-1">
                <HeroSection />
                <TrustSection />
                <DealsSection />
                {popularStudios.length > 0 && <PopularStudiosSection studios={popularStudios} />}
                {scenario.studios.length > 0 && <StudiosSection studios={scenario.studios} />}
                <HowItWorksSection />
                <SafeWeddingSection />
                <StartNowSection />
                <ReviewsSection studios={scenario.studios} />
            </main>
            <SiteFooter />
        </>
    );
}
