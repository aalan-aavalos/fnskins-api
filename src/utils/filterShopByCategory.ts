import { ApiResponse, SkinsShop, Entry } from "../types/shop.types";

export function filterShopByCategory(shopData: ApiResponse): SkinsShop {
  const skinsShop: SkinsShop = {
    outfits: [],
  };

  const entries = shopData.data.entries;

  entries.forEach((entry: Entry) => {
    if (entry.brItems) {
      const hasOutfit = entry.brItems.some(
        (brItem) => brItem.type.backendValue === "AthenaCharacter"
      );
      if (hasOutfit) {
        skinsShop.outfits.push(entry);
      }
    }
  });

  return skinsShop;
}
