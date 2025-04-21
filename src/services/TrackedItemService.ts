import { PrismaClient, TrackedItem } from "@prisma/client";

const prisma = new PrismaClient();

class TrackedItemService {
  public async createTrackedItem(data: TrackedItem) {
    return prisma.trackedItem.create({ data });
  }

  public async getAllTrackedItem(): Promise<TrackedItem[]> {
    return prisma.trackedItem.findMany();
  }

  public async getTrackedItemByUserId(
    userId: string
  ): Promise<TrackedItem[] | null> {
    return await prisma.trackedItem.findMany({ where: { userId } });
  }

  public async getTrackedItemById(id: string): Promise<TrackedItem | null> {
    return await prisma.trackedItem.findUnique({ where: { id } });
  }

  public async updateTrackedItem(
    id: string,
    data: Partial<TrackedItem>
  ): Promise<TrackedItem | null> {
    return prisma.trackedItem.update({
      where: { id },
      data,
    });
  }

  public async deleteTrackedItem(id: string): Promise<boolean> {
    const deleted = await prisma.trackedItem.delete({ where: { id } });
    return Boolean(deleted);
  }

  public async getTrackedItemsBySkinIds(skinIds: string[]) {
    return prisma.trackedItem.findMany({
      where: { skinId: { in: skinIds } },
      include: { user: true },
    });
  }
}

export { TrackedItemService };
