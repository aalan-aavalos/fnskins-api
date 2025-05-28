import { PrismaClient, TrackedItem } from "@prisma/client";
import { ConflictError, NotFoundError } from "../errors/appErrors";

const prisma = new PrismaClient();

class TrackedItemService {
  public async createTrackedItem(data: TrackedItem) {
    const { skinId, userId } = data;

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundError("El usuario no se ha encontrado");

    const skinExist = await prisma.trackedItem.findFirst({
      where: { skinId, userId },
    });
    if (skinExist) throw new ConflictError("La skin ya esta registrada");

    const trackedItem = await prisma.trackedItem.create({ data });
    return trackedItem;
  }

  public async getAllTrackedItem(): Promise<TrackedItem[]> {
    return await prisma.trackedItem.findMany();
  }

  public async getTrackedItemByUserId(
    userId: string
  ): Promise<TrackedItem[] | null> {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundError("Usuario");

    const trackedItem = await prisma.trackedItem.findMany({
      where: { userId },
    });
    if (!trackedItem.length)
      throw new NotFoundError("No hay registros para ese usuario");

    return trackedItem;
  }

  public async getTrackedItemById(id: string): Promise<TrackedItem | null> {
    const trackedItem = await prisma.trackedItem.findUnique({ where: { id } });
    if (!trackedItem) throw new NotFoundError("Item trackeado");

    return trackedItem;
  }

  public async updateTrackedItem(
    id: string,
    data: Partial<TrackedItem>
  ): Promise<TrackedItem | null> {
    const { skinId, userId } = data;

    const exist = await prisma.trackedItem.findUnique({ where: { id } });
    if (!exist) throw new NotFoundError("Tracked Item");

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundError("El usuario no se ha encontrado");

    const skinExist = await prisma.trackedItem.findFirst({
      where: { skinId, userId, id: { not: id } },
    });
    if (skinExist) throw new ConflictError("La skin ya esta registrada");

    const trackedItem = await prisma.trackedItem.update({
      where: { id },
      data,
    });
    return trackedItem;
  }

  public async deleteTrackedItem(id: string): Promise<boolean> {
    const exist = await prisma.trackedItem.findUnique({ where: { id } });
    if (!exist) throw new NotFoundError("TrackedItem");

    const deleted = await prisma.trackedItem.delete({ where: { id } });
    return Boolean(deleted);
  }

  public async getTrackedItemsBySkinIds(skinIds: string[]) {
    return await prisma.trackedItem.findMany({
      where: { skinId: { in: skinIds }, obtained: { equals: false } },
      include: { user: true },
    });
  }
}

export { TrackedItemService };
