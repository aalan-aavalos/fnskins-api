import { ApiResponse, SkinsShop } from "../types/shop.types";
import { filterShopByCategory } from "../utils/filterShopByCategory";

export class ShopService {
  public static async getSkinsFromStore(): Promise<SkinsShop> {
    const store = await fetch("https://fortnite-api.com/v2/shop"); // ejemplo
    const data: ApiResponse = await store.json();

    // Filtrar solo las skins
    return filterShopByCategory(data);
  }
}
