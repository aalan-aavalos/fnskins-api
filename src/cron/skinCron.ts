// src/cron/SkinCron.ts
import cron from "node-cron";
import { ShopService } from "../services/ShopService";
import { TrackedItemService } from "../services/TrackedItemService";
import { NotificationService } from "../services/NotificationService";
import { Entry } from "../types/shop.types";

class SkinCron {
  private static trackedItemService = new TrackedItemService();
  public static start(): void {
    // '0 18 * * *'
    cron.schedule(
      "0 18 * * *",
      async () => {
        console.log("[CRON] Ejecutando verificación diaria de skins...");

        try {
          // Consulta la API de la tienda de Fortnite y retorna un arreglo donde estan todas las skins de la tienda
          const shopSkins = await ShopService.getSkinsFromStore();
          // Crea un arreglo donde solo guarda el id de las skins
          const skinIds = shopSkins.outfits.map(
            (entry: Entry) => entry.brItems && entry?.brItems[0].id
          ) as string[];

          // Consulta la coincidencia de skinId en la base de datos y retorna las que coinciden
          const matchedTrackedItems =
            await this.trackedItemService.getTrackedItemsBySkinIds(skinIds);

          if (matchedTrackedItems.length === 0) {
            console.log("[CRON] No hay coincidencias con skins trakeadas.");
            return;
          }

          // Prepara la notificación y la manda por correo electronico
          const notifications = NotificationService.prepareNotifications(
            matchedTrackedItems,
            shopSkins
          );
          await NotificationService.sendNotifications(notifications);

          console.log(
            `[CRON] Notificaciones enviadas a ${notifications.length} usuarios.`
          );
        } catch (error) {
          console.error("[CRON] Error al ejecutar cron:", error);
        }
      },
      {
        timezone: "America/Mexico_City", // GMT-6
      }
    );
  }
}

export { SkinCron };
