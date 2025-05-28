import { Entry, SkinsShop } from "../types/shop.types";
import { NodemailerSender } from "../utils/NodemailerSender";
import { TrackedItemWithUser } from "../types/trackedItems.type";
import { skinAvailableTemplate } from "../templates/skinAvailableTemplate";

export class NotificationService {
  public static prepareNotifications(
    trackedItems: TrackedItemWithUser[],
    shopSkins: SkinsShop
  ) {
    return trackedItems.map((item) => {
      const skinData = shopSkins.outfits.find(
        (entry: Entry) => entry.brItems && entry.brItems[0]?.id === item.skinId
      ) as Entry;

      return {
        to: item.user.email,
        subject: `¡Tu skin ${skinData.brItems![0].name} está en la tienda!`,
        html: skinAvailableTemplate(skinData, item),
        text: `${skinData.brItems![0].name} está en la tienda de Fortnite. `,
      };
    });
  }

  public static async sendNotifications(notifications: any[]) {
    for (const notification of notifications) {
      await NodemailerSender.sendMail(
        notification.to,
        notification.subject,
        notification.html,
        notification.text
      );
    }
  }
}
