import { Request, Response } from 'express';
import { TrackedItemService } from '../services/TrackedItemService';

class TrackedItemController {
    public static async trackItem(req: Request, res: Response): Promise<void> {
        const { userId, skinId, skinName } = req.body;
        try {
            const trackedItem = await TrackedItemService.trackItem(userId, skinId, skinName);
            res.status(201).json(trackedItem);
        } catch (error: any) {
            res.status(500).json({ message: error?.message });
        }
    }

    public static async getTrackedItems(req: Request, res: Response): Promise<void> {
        const { userId } = req.params;
        try {
            const items = await TrackedItemService.getTrackedItems(userId);
            res.status(200).json(items);
        } catch (error: any) {
            res.status(500).json({ message: error?.message });
        }
    }
}

export { TrackedItemController };
