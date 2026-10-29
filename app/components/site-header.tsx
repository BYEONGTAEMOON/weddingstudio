import Link from 'next/link';

import { SearchIcon } from './icons';
import { ScanGoButton } from './scan-go-button';

const navItems = [
    { label: '인기 업체', href: '#popular' },
    { label: '스튜디오 정보', href: '#studios' },
    { label: '예약 안내', href: '#how-it-works' },
    { label: '고객 후기', href: '#reviews' },
    { label: '상담 문의', href: null },
];

export function SiteHeader() {
    return (
        <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-10">
                <Link href="/" className="flex items-baseline gap-2">
                    <span className="text-xl font-extrabold tracking-tight text-gray-900">
                        웨딩스튜디오<span className="text-brand">스캔GO</span>
                    </span>
                </Link>

                <nav aria-label="주요 메뉴" className="hidden items-center gap-8 text-sm font-medium text-gray-700 md:flex">
                    {navItems.map((item) =>
                        item.href ? (
                            <a
                                key={item.label}
                                href={item.href}
                                className="transition-colors hover:text-brand"
                            >
                                {item.label}
                            </a>
                        ) : (
                            <ScanGoButton
                                key={item.label}
                                className="transition-colors hover:text-brand"
                            >
                                {item.label}
                            </ScanGoButton>
                        ),
                    )}
                </nav>

                <ScanGoButton className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark">
                    <SearchIcon className="h-4 w-4" />
                    스튜디오스캔GO
                </ScanGoButton>
            </div>
        </header>
    );
}
