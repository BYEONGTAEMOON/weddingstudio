import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: '페이지를 찾을 수 없습니다',
    robots: { index: false, follow: false },
};

export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="text-sm font-medium tracking-[0.2em] text-gray-400">404</p>
            <h1 className="text-2xl font-bold text-gray-900">페이지를 찾을 수 없습니다</h1>
            <p className="max-w-sm text-sm leading-relaxed text-gray-500">
                요청하신 주소가 삭제되었거나 잘못 입력되었을 수 있어요.
            </p>
            <Link
                href="/"
                className="mt-4 inline-flex items-center justify-center rounded-lg bg-brand px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
            >
                웨딩스튜디오스캔GO 홈으로 돌아가기
            </Link>
        </div>
    );
}
