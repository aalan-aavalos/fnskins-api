import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class TrackedItemService {
    public static async trackItem(userId: string, skinId: string, skinName: string) {
        const trackedItem = await prisma.trackedItem.create({
            data: { userId, skinId, skinName },
        });
        return trackedItem;
    }

    public static async getTrackedItems(userId: string) {
        const items = await prisma.trackedItem.findMany({
            where: { userId },
        });
        return items;
    }
}

export { TrackedItemService };
