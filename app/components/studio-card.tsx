import Image from 'next/image';

import type { Studio } from '@/lib/chatbot-scenario';

import { CameraIcon } from './icons';
import { ScanGoButton } from './scan-go-button';
import { SampleGalleryButton } from './studio-sample-gallery';

// Portrait (3:4) card — studio portfolios are mostly vertical shots. Shared by
// the "인기 업체" carousel and the full studio grid so both stay in sync.
export function StudioCard({
    studio,
    sizes,
    hidden = false,
    className = '',
}: {
    studio: Studio;
    sizes: string;
    hidden?: boolean;
    className?: string;
}) {
    return (
        <div
            aria-hidden={hidden}
            className={`@container flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm ${className}`}
        >
            <div className="relative aspect-[3/4]">
                <Image src={studio.image} alt={studio.name} fill sizes={sizes} className="object-cover" />
                <span className="absolute -bottom-5 left-3 flex h-10 w-10 items-center justify-center rounded-full bg-brand text-white ring-[3px] ring-white @[18rem]:left-5">
                    <CameraIcon className="h-5 w-5" />
                </span>
            </div>

            <div className="flex flex-1 flex-col p-3 pt-7 @[18rem]:p-5 @[18rem]:pt-8">
                <h3 className="text-base font-bold text-gray-900 @[18rem]:text-lg">{studio.name}</h3>
                <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-gray-500 @[18rem]:text-sm">{studio.description}</p>

                <div className="mt-3 flex flex-wrap gap-1.5">
                    {studio.tags.map((tag) => (
                        <span key={tag} className="rounded-full bg-brand px-2.5 py-1 text-[11px] font-medium text-white @[18rem]:px-3 @[18rem]:text-xs">
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Side by side once the card is wide enough, stacked in the narrow 2-column mobile grid. */}
                <div className="mt-auto grid grid-cols-1 gap-2 pt-4 @[18rem]:grid-cols-2 @[18rem]:pt-5">
                    <SampleGalleryButton
                        studio={studio}
                        tabIndex={hidden ? -1 : undefined}
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-lg border border-gray-300 px-2 py-2.5 text-xs font-bold text-gray-700 transition-colors hover:border-gray-900 hover:text-gray-900 @[18rem]:text-sm"
                    />
                    <ScanGoButton
                        studio={studio.name}
                        tabIndex={hidden ? -1 : undefined}
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-lg border border-brand px-2 py-2.5 text-xs font-bold text-brand transition-colors hover:bg-brand hover:text-white @[18rem]:text-sm"
                    >
                        스튜디오스캔GO
                    </ScanGoButton>
                </div>
            </div>

            <div className="h-2 bg-brand" />
        </div>
    );
}
