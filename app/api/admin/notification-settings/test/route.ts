import { NextResponse } from 'next/server';

import { requireAdminSession } from '@/lib/admin-guard';
import { sendSms } from '@/lib/sms';

export async function POST(request: Request) {
    if (!(await requireAdminSession())) {
        return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 });
    }

    let body: { recipientPhones?: string[]; senderPhone?: string };
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: '잘못된 요청입니다.' }, { status: 400 });
    }

    const recipientPhones = (body.recipientPhones ?? []).map((p) => p.trim()).filter(Boolean);
    const senderPhone = body.senderPhone?.trim();
    if (recipientPhones.length === 0 || !senderPhone) {
        return NextResponse.json({ error: '수신번호와 발신번호를 먼저 입력해주세요.' }, { status: 400 });
    }

    const results = await Promise.all(
        recipientPhones.map(async (to) => ({
            to,
            result: await sendSms({
                to,
                from: senderPhone,
                text: '[웨딩스튜디오스캔GO] 테스트 문자입니다. 이 문자가 도착했다면 알림 설정이 정상 연결된 거예요.',
            }),
        })),
    );

    const failed = results.filter((r) => !r.result.ok).map((r) => r.to);
    if (failed.length === recipientPhones.length) {
        const firstError = results.find((r) => !r.result.ok)?.result;
        const message = firstError && !firstError.ok ? firstError.error : '문자 발송에 실패했습니다.';
        return NextResponse.json({ error: message }, { status: 502 });
    }

    return NextResponse.json({ ok: true, failed });
}
