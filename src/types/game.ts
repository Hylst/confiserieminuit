export type CandyId =
  | 'spectral_lollipop'
  | 'gummy_eyeball'
  | 'pumpkin_caramel'
  | 'bone_crunch'
  | 'bat_licorice'
  | 'midnight_star';

export type MonsterId =
  | 'witch'
  | 'skeleton'
  | 'ghost'
  | 'pumpkin_spirit'
  | 'werewolf'
  | 'vampire';

export interface CandyDefinition {
  id: CandyId;
  name: string;
  shortName: string;
  subtitle: string;
  description: string;
  basePrice: number;
  baseMaxStock: number;
  refillTimeSec: number; // time to brew 1 unit passively or manually
  unlockCost: number; // 0 if unlocked from start
  colorPrimary: string;
  colorSecondary: string;
  shortcutKey: string;
}

export interface CandyJarState {
  id: CandyId;
  unlocked: boolean;
  level: number;
  stock: number;
  maxStock: number;
  brewProgress: number; // 0 to 100
}

export interface MonsterDefinition {
  id: MonsterId;
  name: string;
  title: string;
  description: string;
  basePatienceSec: number;
  tipMultiplier: number;
  minNight: number;
  favoriteCandies: CandyId[];
  greetings: string[];
  happyQuotes: string[];
  impatientQuotes: string[];
  accentColor: string;
}

export interface OrderItem {
  candyId: CandyId;
  fulfilled: boolean;
}

export interface ActiveCustomer {
  uid: string;
  slotIndex: number; // 0, 1, 2
  monsterId: MonsterId;
  orders: OrderItem[];
  patience: number; // 0 to 100
  maxPatienceSec: number;
  status: 'waiting' | 'happy_leaving' | 'angry_leaving';
  currentQuote: string;
  arrivedAt: number;
  isVip?: boolean;
}

export type UpgradeCategory = 'recipes' | 'equipment' | 'decor';

export interface ShopUpgrade {
  id: string;
  name: string;
  category: UpgradeCategory;
  description: string;
  effectText: string;
  baseCost: number;
  costMultiplier: number;
  level: number;
  maxLevel: number;
  iconType: 'cauldron' | 'lantern' | 'cat' | 'ladle' | 'fireflies' | 'tea' | 'jar_capacity';
}

export interface FloatingText {
  id: string;
  x: number; // percentage 10-90
  y: number; // percentage 15-80
  text: string;
  subtext?: string;
  color: string;
}

export interface FlyingCandy {
  id: string;
  candyId: CandyId;
  fromJarIndex: number;
  toSlotIndex: number;
}

export interface NightStats {
  nightNumber: number;
  customersServed: number;
  customersLost: number;
  shardsEarned: number;
  tipsEarned: number;
  maxComboReached: number;
  cauldronClicks: number;
}
