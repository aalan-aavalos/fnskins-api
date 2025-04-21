// Interfaces de la respuesta de https://fortnite-api.com/v2/shop

export interface ApiResponse {
  status: number;
  data: Data;
}

export interface Data {
  hash: string;
  date: string;
  vbuckIcon: string;
  entries: Entry[];
}

export interface Entry {
  regularPrice: number;
  finalPrice: number;
  devName: string;
  offerId: string;
  inDate: string;
  outDate: string;
  bundle?: Bundle;
  banner?: Banner;
  offerTag?: OfferTag;
  giftable: boolean;
  refundable: boolean;
  sortPriority: number;
  layoutId: string;
  layout: Layout;
  colors?: LayoutColors;
  tileSize: string;
  displayAssetPath?: string;
  newDisplayAssetPath: string;
  newDisplayAsset?: DisplayAsset;
  brItems?: BrItem[];
  tracks?: Track[];
  instruments?: Instrument[];
  cars?: Car[];
  legoKits?: LegoKit[];
}

export interface Bundle {
  name: string;
  info: string;
  image: string;
}

export interface Banner {
  value: string;
  intensity: string;
  backendValue: string;
}

export interface OfferTag {
  id: string;
  text: string;
}

export interface Layout {
  id: string;
  name: string;
  category?: string;
  index: number;
  rank: number;
  showIneligibleOffers: string;
  background?: string;
  useWidePreview: boolean;
  displayType: string;
  textureMetadata?: Metadata[];
  stringMetadata?: Metadata[];
  textMetadata?: Metadata[];
}

export interface Metadata {
  key: string;
  value: string;
}

export interface LayoutColors {
  color1: string;
  color2: string;
  color3: string;
  textBackgroundColor: string;
}

export interface DisplayAsset {
  id: string;
  cosmeticId: string;
  materialInstances: MaterialInstance[];
  renderImages: RenderImage[];
}

export interface MaterialInstance {
  id: string;
  primaryMode: string;
  productTag: string;
  Images: Record<string, string>;
  Colors: Record<string, string>;
  Scalings: Record<string, number>;
  Flags: Record<string, boolean>;
}

export interface BrItem {
  id: string;
  name: string;
  description: string;
  exclusiveDescription?: string;
  unlockRequirements?: string;
  customExclusiveCallout?: string;
  type: TypeValue;
  rarity: TypeValue;
  series?: Series;
  set: Set;
  introduction: Introduction;
  images: BrImages;
  variants?: Variant[];
  builtInEmoteIds?: string[];
  searchTags?: string[];
  gameplayTags?: string[];
  metaTags?: string[];
  showcaseVideo?: string;
  dynamicPakId?: string;
  itemPreviewHeroPath?: string;
  displayAssetPath?: string;
  definitionPath?: string;
  path?: string;
  added: string;
  shopHistory?: string[];
}

export interface TypeValue {
  value: string;
  displayValue: string;
  backendValue: string;
}

export interface Series {
  value: string;
  image?: string;
  colors?: string[];
  backendValue: string;
}

export interface Set {
  value: string;
  text: string;
  backendValue: string;
}

export interface Introduction {
  chapter: string;
  season: string;
  text: string;
  backendValue: number;
}

export interface BrImages {
  smallIcon: string;
  icon: string;
  featured: string;
  lego?: LegoImages;
  bean?: BeanImages;
  Other?: Record<string, string>;
}

export interface LegoImages {
  small: string;
  large: string;
  wide?: string;
}

export interface BeanImages {
  small: string;
  large: string;
}

export interface Variant {
  channel: string;
  type: string;
  options: VariantOption[];
}

export interface VariantOption {
  tag: string;
  name: string;
  unlockRequirements?: string;
  image?: string;
}

export interface Track {
  id: string;
  devName: string;
  title: string;
  artist: string;
  album?: string;
  releaseYear: number;
  bpm: number;
  duration: number;
  difficulty: Difficulty;
  gameplayTags?: string[];
  genres?: string[];
  albumArt: string;
  added: string;
  shopHistory?: string[];
}

export interface Difficulty {
  vocals: number;
  guitar: number;
  bass: number;
  plasticBass: number;
  drums: number;
  plasticDrums: number;
}

export interface Instrument {
  id: string;
  name: string;
  description: string;
  type: TypeValue;
  rarity: TypeValue;
  images: ImageSet;
  series?: Series;
  gameplayTags?: string[];
  path?: string;
  showcaseVideo?: string;
  added: string;
  shopHistory?: string[];
}

export interface ImageSet {
  small: string;
  large: string;
}

export interface Car {
  id: string;
  vehicleId: string;
  name: string;
  description: string;
  type: TypeValue;
  rarity: TypeValue;
  images: ImageSet;
  series?: Series;
  gameplayTags?: string[];
  path?: string;
  showcaseVideo?: string;
  added: string;
  shopHistory?: string[];
}

export interface LegoKit {
  id: string;
  name: string;
  type: TypeValue;
  series?: Series;
  gameplayTags?: string[];
  images: LegoImages;
  path?: string;
  added: string;
  shopHistory?: string[];
}

export interface RenderImage {
  productTag: string;
  fileName: string;
  image: string;
}

export interface SkinsShop {
  outfits: Entry[];
}
