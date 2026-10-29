import { NextResponse } from 'next/server';

import { getClientIp } from '@/lib/client-ip';
import { getNotificationSettings } from '@/lib/notification-store';
import { getPrisma } from '@/lib/prisma';
import { sendSms } from '@/lib/sms';

// Best-effort notification — a Solapi outage or a missing admin phone number
// should never fail the lead submission itself, so every error here is only
// logged, never thrown.
async function notifyNewLead(lead: {
    name: string;
    phone: string;
    month?: string | null;
    budget?: string | null;
    residence?: string | null;
}) {
    try {
        const settings = await getNotificationSettings();
        if (!settings.smsEnabled || settings.recipientPhones.length === 0 || !settings.senderPhone) return;

        const lines = [
            '[웨딩스튜디오스캔GO] 새 상담 신청이 접수됐어요.',
            `이름: ${lead.name}`,
            `연락처: ${lead.phone}`,
        ];
        if (lead.month) lines.push(`예식월: ${lead.month}`);
        if (lead.budget) lines.push(`예산: ${lead.budget}`);
        if (lead.residence) lines.push(`거주지역: ${lead.residence}`);
        const text = lines.join('\n');

        await Promise.all(
            settings.recipientPhones.map(async (to) => {
                const result = await sendSms({ to, from: settings.senderPhone, text });
                if (!result.ok) {
                    console.error('Failed to send lead notification SMS', to, result.error);
                }
            }),
        );
    } catch (error) {
        console.error('Failed to send lead notification SMS', error);
    }
}

export async function POST(request: Request) {
    let body: {
        month?: string;
        budget?: string;
        residence?: string;
        name?: string;
        phone?: string;
        selectedResorts?: string[];
    };

    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: '잘못된 요청입니다.' }, { status: 400 });
    }

    const { month, budget, residence, name, phone, selectedResorts } = body;

    if (!name || !phone) {
        return NextResponse.json({ error: '이름과 연락처는 필수입니다.' }, { status: 400 });
    }

    const ip = getClientIp(request);

    try {
        const prisma = getPrisma();

        if (ip) {
            const blocked = await prisma.blockedIp.findUnique({ where: { ip } });
            if (blocked) {
                // Reject without revealing the block to the client — the chatbot
                // treats this submission as best-effort and shows completion
                // either way, so a spammy IP gets no signal that it was blocked.
                return NextResponse.json({ error: '요청을 처리할 수 없습니다.' }, { status: 403 });
            }
        }

        await prisma.lead.create({
            data: {
                month: month ?? null,
                budget: budget ?? null,
                residence: residence ?? null,
                name,
                phone,
                selectedResorts: selectedResorts && selectedResorts.length > 0 ? selectedResorts.join(', ') : null,
                ip,
            },
        });

        await notifyNewLead({ name, phone, month, budget, residence });

        return NextResponse.json({ ok: true });
    } catch (error) {
        console.error('Failed to save lead', error);
        return NextResponse.json({ error: '저장에 실패했습니다.' }, { status: 500 });
    }
}
