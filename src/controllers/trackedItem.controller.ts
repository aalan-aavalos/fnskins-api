import { Request, Response } from "express";
import { TrackedItemService } from "../services/TrackedItemService";

class TrackedItemController {
  private trackedItemService = new TrackedItemService();

  public create = async (req: Request, res: Response): Promise<void> => {
    try {
      const trackedItem = await this.trackedItemService.createTrackedItem(
        req.body
      );

      res.status(201).json(trackedItem);
    } catch (error) {
      res.status(500).json({ error: "Error creating trackedItem" });
    }
  };

  public findAll = async (_req: Request, res: Response): Promise<void> => {
    try {
      const trackedItems = await this.trackedItemService.getAllTrackedItem();
      res.json(trackedItems);
    } catch (error) {
      res.status(500).json({ error: "Error fetching trackedItems" });
    }
  };

  public findOne = async (req: Request, res: Response): Promise<void> => {
    try {
      const trackedItem = await this.trackedItemService.getTrackedItemById(
        req.params.id
      );
      if (!trackedItem) {
        res.status(404).json({ error: "TrackedItem not found" });
        return;
      }
      res.json(trackedItem);
    } catch (error) {
      res.status(500).json({ error: "Error fetching trackedItem" });
    }
  };

  public findOneByUserId = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const trackedItemsByUserId =
        await this.trackedItemService.getTrackedItemByUserId(req.params.userId);
      if (!trackedItemsByUserId) {
        res.status(404).json({ error: "TrackedItem by userId not found" });
        return;
      }
      res.json(trackedItemsByUserId);
    } catch (error) {
      res.status(500).json({ error: "Error fetching trackedItem by userId" });
    }
  };

  public update = async (req: Request, res: Response): Promise<void> => {
    try {
      const updatedTrackedItem =
        await this.trackedItemService.updateTrackedItem(
          req.params.id,
          req.body
        );
      if (!updatedTrackedItem) {
        res.status(404).json({ error: "TrackedItem not found" });
        return;
      }
      res.json(updatedTrackedItem);
    } catch (error) {
      res.status(500).json({ error: "Error updating trackedItem" });
    }
  };

  public delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const deleted = await this.trackedItemService.deleteTrackedItem(
        req.params.id
      );
      if (!deleted) {
        res.status(404).json({ error: "TrackedItem not found" });
        return;
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Error deleting trackedItem" });
    }
  };
}

export { TrackedItemController };
