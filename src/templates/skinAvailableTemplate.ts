import { Entry } from '../types/shop.types';
import { TrackedItemWithUser } from '../types/trackedItems.type';

export function skinAvailableTemplate(skinData: Entry, itemUserData: TrackedItemWithUser): string {
    if (!skinData) throw new Error("Error: la data de la Skin no está disponible");
    if (!skinData.brItems) throw new Error("Error: la data de brItems no está disponible");
    if (!skinData.newDisplayAsset) throw new Error("Error: los assets no están disponibles");

    const colors = skinData.colors;
    const gradient = colors
        ? `linear-gradient(to bottom${colors.color1 ? `, #${colors.color1}` : ''
        }${colors.color2 ? `, #${colors.color2}` : ''}${colors.color3 ? `, #${colors.color3}` : ''
        })`
        : 'none';

    skinData.finalPrice
    return `
    <div style="font-family: Arial, sans-serif; text-align: center;">
      <h2>Hola ${itemUserData.user.name ?? 'Jugador'} 👋</h2>
      <h1>${skinData.brItems[0].name}</h1>
      <p style="font-size: 18px;">
        ¡Ya está disponible en la tienda!
      </p>

      <p style="font-size: 18px;">
        <img src="https://fortnite-api.com/images/vbuck.png" alt="V-Bucks" style="width: 20px; height: 20px;" />
        <span>${skinData.finalPrice}</span>
      </p>
      
      <div style="
        width: 300px;
        height: 300px;
        margin: 0 auto;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <img src="${skinData.brItems[0].images.featured}" alt="Imagen de ${skinData.brItems[0].name}"
          style="max-width: 100%; max-height: 100%; border-radius: 10px; background-image: ${gradient};" />
      </div>
    </div>
  `;
}
