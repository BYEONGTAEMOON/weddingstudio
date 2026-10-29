import { ScanGoButton } from './scan-go-button';

export function SiteFooter() {
    return (
        <footer className="border-t border-gray-100 bg-gray-50 px-6 py-12 md:px-10">
            <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-start md:justify-between">
                <div>
                    <p className="text-lg font-extrabold text-gray-900">
                        웨딩스튜디오<span className="text-brand">스캔GO</span>
                    </p>

                    <div className="mt-4 space-y-1 text-xs leading-relaxed text-gray-500">
                        <p>
                            대표 류수진 | 부산광역시 연제구 법원로8번길
                            10(거제동)
                        </p>
                        <p>사업자등록번호 112-86-03487 |</p>
                    </div>

                    <p className="mt-4 text-xs leading-relaxed text-gray-400">
                        개인정보처리방침 및 이용약관은 카카오톡 상담 안내 시
                        함께 전달드립니다.
                    </p>
                </div>

                <div className="flex shrink-0 flex-col items-start gap-2 md:items-end">
                    <ScanGoButton className="inline-flex items-center justify-center rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark">
                        내 조건 스튜디오스캔GO
                    </ScanGoButton>
                    <p className="text-xs text-gray-400">
                        전화·카톡 문의 없이, 1일 이내 결과 안내
                    </p>
                </div>
            </div>
        </footer>
    );
}
