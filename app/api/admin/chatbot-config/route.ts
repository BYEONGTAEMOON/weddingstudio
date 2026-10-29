import { NextResponse } from 'next/server';

import { requireAdminSession } from '@/lib/admin-guard';
import { mergeScenario, type ChatbotScenario } from '@/lib/chatbot-scenario';
import { getPrisma } from '@/lib/prisma';
import { getScenarioWithStatus } from '@/lib/scenario-store';

// Uploads replaced or removed in the admin would otherwise pile up in the DB.
// The grace period keeps images that were just uploaded but whose form hasn't
// been saved yet (or is open in another tab).
const UNREFERENCED_IMAGE_GRACE_MS = 24 * 60 * 60 * 1000;

async function deleteUnreferencedImages(scenario: ChatbotScenario) {
    try {
        const referencedIds = [...JSON.stringify(scenario).matchAll(/\/api\/images\/([0-9a-f-]{36})/gi)].map((match) => match[1]);
        await getPrisma().uploadedImage.deleteMany({
            where: {
                id: { notIn: referencedIds },
                createdAt: { lt: new Date(Date.now() - UNREFERENCED_IMAGE_GRACE_MS) },
            },
        });
    } catch (error) {
        console.error('Failed to clean up unreferenced images', error);
    }
}

export async function GET() {
    if (!(await requireAdminSession())) {
        return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 });
    }

    const { scenario, error } = await getScenarioWithStatus();
    return NextResponse.json({ scenario, error });
}

export async function PUT(request: Request) {
    if (!(await requireAdminSession())) {
        return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 });
    }

    let body: Partial<ChatbotScenario>;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: '잘못된 요청입니다.' }, { status: 400 });
    }

    const scenario = mergeScenario(body);

    try {
        const prisma = getPrisma();
        await prisma.chatbotConfig.upsert({
            where: { id: 1 },
            create: { id: 1, data: scenario },
            update: { data: scenario },
        });
        await deleteUnreferencedImages(scenario);
        return NextResponse.json({ ok: true, scenario });
    } catch (error) {
        console.error('Failed to save chatbot config', error);
        return NextResponse.json({ error: '저장에 실패했습니다.' }, { status: 500 });
    }
}
