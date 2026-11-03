import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  ActiveCustomer,
  CandyId,
  CandyJarState,
  FloatingText,
  FlyingCandy,
  MonsterId,
  NightStats,
  OrderItem,
  ShopUpgrade,
} from './types/game';
import {
  CANDY_DEFINITIONS,
  INITIAL_SHOP_UPGRADES,
  MONSTER_DEFINITIONS,
} from './data/gameData';
import { soundEngine } from './utils/sound';
import { TopHud } from './components/TopHud';
import { CustomerStage } from './components/CustomerStage';
import { CounterWorkstation } from './components/CounterWorkstation';
import { CandyShelf } from './components/CandyShelf';
import { GrimoireModal, NightSummaryModal } from './components/GrimoireModal';

const INITIAL_JARS: Record<CandyId, CandyJarState> = {
  spectral_lollipop: {
    id: 'spectral_lollipop',
    unlocked: true,
    level: 1,
    stock: 8,
    maxStock: 8,
    brewProgress: 0,
  },
  gummy_eyeball: {
    id: 'gummy_eyeball',
    unlocked: true,
    level: 1,
    stock: 8,
    maxStock: 8,
    brewProgress: 0,
  },
  pumpkin_caramel: {
    id: 'pumpkin_caramel',
    unlocked: true,
    level: 1,
    stock: 8,
    maxStock: 8,
    brewProgress: 0,
  },
  bone_crunch: {
    id: 'bone_crunch',
    unlocked: true,
    level: 1,
    stock: 7,
    maxStock: 7,
    brewProgress: 0,
  },
  bat_licorice: {
    id: 'bat_licorice',
    unlocked: false,
    level: 1,
    stock: 7,
    maxStock: 7,
    brewProgress: 0,
  },
  midnight_star: {
    id: 'midnight_star',
    unlocked: false,
    level: 1,
    stock: 6,
    maxStock: 6,
    brewProgress: 0,
  },
};

export function App() {
  // Core Currencies & Progression
  const [shards, setShards] = useState<number>(35);
  const [reputation, setReputation] = useState<number>(12);
  const [nightNumber, setNightNumber] = useState<number>(1);
  const [nightProgress, setNightProgress] = useState<number>(0); // 0 to 100
  const [combo, setCombo] = useState<number>(0);

  // Modes & Toggles
  const [cozyZenMode, setCozyZenMode] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [musicEnabled, setMusicEnabled] = useState<boolean>(false);

  // Inventory & Upgrades
  const [jars, setJars] = useState<Record<CandyId, CandyJarState>>(INITIAL_JARS);
  const [upgrades, setUpgrades] = useState<ShopUpgrade[]>(INITIAL_SHOP_UPGRADES);

  // Customers & Workstation State
  const [customers, setCustomers] = useState<(ActiveCustomer | null)[]>([null, null, null]);
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [selectedCandy, setSelectedCandy] = useState<CandyId | null>(null);

  // Special Abilities & Sugar Rush
  const [sugarRushCharge, setSugarRushCharge] = useState<number>(20);
  const [sugarRushActive, setSugarRushActive] = useState<boolean>(false);
  const [teaCooldown, setTeaCooldown] = useState<number>(0);
  const [catPurring, setCatPurring] = useState<boolean>(false);

  // Visual Particles & Modals
  const [floatingTexts, setFloatingTexts] = useState<FloatingText[]>([]);
  const [flyingCandies, setFlyingCandies] = useState<FlyingCandy[]>([]);
  const [grimoireOpen, setGrimoireOpen] = useState<boolean>(false);
  const [grimoireTab, setGrimoireTab] = useState<'upgrades' | 'bestiary'>('upgrades');
  const [nightSummaryOpen, setNightSummaryOpen] = useState<boolean>(false);
  const [nightStats, setNightStats] = useState<NightStats>({
    nightNumber: 1,
    customersServed: 0,
    customersLost: 0,
    shardsEarned: 0,
    tipsEarned: 0,
    maxComboReached: 0,
    cauldronClicks: 0,
  });

  // Helper to read upgrade levels
  const getUpgradeLevel = useCallback(
    (id: string) => upgrades.find((u) => u.id === id)?.level ?? 0,
    [upgrades]
  );

  const autoCauldronLevel = getUpgradeLevel('auto_cauldron');
  const ladleLevel = getUpgradeLevel('sugar_ladle');
  const lanternLevel = getUpgradeLevel('pumpkin_lantern');
  const catLevel = getUpgradeLevel('black_cat');
  const firefliesLevel = getUpgradeLevel('astral_fireflies');

  const cauldronClickPower = 2 + (ladleLevel - 1) * 3;
  const passiveShardsPerSec = autoCauldronLevel * 2;

  // Spawn Floating Feedback Text
  const addFloatingText = useCallback(
    (text: string, x: number, y: number, color = '#FFD166', subtext?: string) => {
      const id = `${Date.now()}-${Math.random()}`;
      setFloatingTexts((prev) => [...prev.slice(-14), { id, text, x, y, color, subtext }]);
      setTimeout(() => {
        setFloatingTexts((prev) => prev.filter((item) => item.id !== id));
      }, 1150);
    },
    []
  );

  // Spawn Flying Candy Projectile
  const addFlyingCandy = useCallback((candyId: CandyId, toSlotIndex: number) => {
    const fromJarIndex = CANDY_DEFINITIONS.findIndex((c) => c.id === candyId);
    const id = `${Date.now()}-${Math.random()}`;
    setFlyingCandies((prev) => [...prev, { id, candyId, fromJarIndex, toSlotIndex }]);
    setTimeout(() => {
      setFlyingCandies((prev) => prev.filter((item) => item.id !== id));
    }, 320);
  }, []);

  // Generate a new Monster Customer for a given slot
  const createCustomerForSlot = useCallback(
    (slotIndex: number, currentJars: Record<CandyId, CandyJarState>, currentNight: number): ActiveCustomer => {
      const unlockedCandyIds = (Object.keys(currentJars) as CandyId[]).filter(
        (id) => currentJars[id].unlocked
      );

      // Pick monster archetype
      const monsterPool = MONSTER_DEFINITIONS;
      const monsterDef = monsterPool[Math.floor(Math.random() * monsterPool.length)];

      // Determine number of requested candies (1 to 3)
      const maxOrderSize = currentNight === 1 ? 2 : 3;
      const roll = Math.random();
      const orderCount =
        roll < 0.42 ? 1 : roll < 0.82 ? 2 : Math.min(3, maxOrderSize);

      const orders: OrderItem[] = [];
      for (let i = 0; i < orderCount; i++) {
        // 55% chance to pick one of their favorite unlocked candies
        const unlockedFavorites = monsterDef.favoriteCandies.filter((cid) =>
          unlockedCandyIds.includes(cid)
        );
        let chosenCandy: CandyId;
        if (unlockedFavorites.length > 0 && Math.random() < 0.55) {
          chosenCandy =
            unlockedFavorites[Math.floor(Math.random() * unlockedFavorites.length)];
        } else {
          chosenCandy =
            unlockedCandyIds[Math.floor(Math.random() * unlockedCandyIds.length)];
        }
        orders.push({ candyId: chosenCandy, fulfilled: false });
      }

      // VIP chance boosted by Astral Fireflies
      const vipChance = 0.1 + firefliesLevel * 0.06;
      const isVip = Math.random() < vipChance;

      const greeting =
        monsterDef.greetings[Math.floor(Math.random() * monsterDef.greetings.length)];

      return {
        uid: `cust-${Date.now()}-${Math.random()}`,
        slotIndex,
        monsterId: monsterDef.id as MonsterId,
        orders,
        patience: 100,
        maxPatienceSec: monsterDef.basePatienceSec + (orders.length - 1) * 4,
        status: 'waiting',
        currentQuote: greeting,
        arrivedAt: Date.now(),
        isVip,
      };
    },
    [firefliesLevel]
  );

  // Seed initial customers on first mount
  const initializedRef = useRef(false);
  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;
    const c0 = createCustomerForSlot(0, INITIAL_JARS, 1);
    const c1 = createCustomerForSlot(1, INITIAL_JARS, 1);
    setCustomers([c0, c1, null]);
  }, [createCustomerForSlot]);

  // Core Function: Serve a specific candy to a specific customer slot
  const serveCandyToCustomer = useCallback(
    (slotIndex: number, candyId: CandyId) => {
      const targetCustomer = customers[slotIndex];
      if (!targetCustomer || targetCustomer.status !== 'waiting') return false;

      const jar = jars[candyId];
      if (!jar || !jar.unlocked) return false;

      // Find an unfulfilled order item matching candyId
      const orderIndex = targetCustomer.orders.findIndex(
        (o) => o.candyId === candyId && !o.fulfilled
      );
      if (orderIndex === -1) return false;

      // If jar is out of stock, auto-brew 1 unit or notify
      if (jar.stock <= 0) {
        soundEngine.playPop(-2);
        addFloatingText('Bocal vide ! Brassage +1', 20 + slotIndex * 30, 68, '#FFAA33');
        setJars((prev) => ({
          ...prev,
          [candyId]: {
            ...prev[candyId],
            stock: 1,
            brewProgress: 0,
          },
        }));
        return false;
      }

      // Deduct 1 candy from jar
      setJars((prev) => ({
        ...prev,
        [candyId]: {
          ...prev[candyId],
          stock: Math.max(0, prev[candyId].stock - 1),
        },
      }));

      // Visual & Audio feedback for serving candy
      addFlyingCandy(candyId, slotIndex);
      soundEngine.playPop(orderIndex + 1);

      const candyDef = CANDY_DEFINITIONS.find((c) => c.id === candyId)!;
      const monsterDef = MONSTER_DEFINITIONS.find((m) => m.id === targetCustomer.monsterId)!;

      // Calculate candy payment
      const baseCandyValue = Math.round(candyDef.basePrice * (1 + (jar.level - 1) * 0.35));
      const rushMult = sugarRushActive ? 1.5 : 1;
      const vipMult = targetCustomer.isVip ? 2 : 1;
      const itemPayment = Math.round(baseCandyValue * rushMult * vipMult);

      // Update customer orders
      const updatedOrders = targetCustomer.orders.map((o, idx) =>
        idx === orderIndex ? { ...o, fulfilled: true } : o
      );
      const allFulfilled = updatedOrders.every((o) => o.fulfilled);

      const slotX = 20 + slotIndex * 30;

      if (!allFulfilled) {
        // Partial order served: restore +14% patience & award candy price
        setShards((s) => s + itemPayment);
        setNightStats((st) => ({
          ...st,
          shardsEarned: st.shardsEarned + itemPayment,
        }));
        addFloatingText(`+${itemPayment} 🪙`, slotX, 34, '#FFD166');

        setCustomers((prev) =>
          prev.map((c, idx) =>
            idx === slotIndex && c
              ? {
                  ...c,
                  orders: updatedOrders,
                  patience: Math.min(100, c.patience + 14),
                }
              : c
          )
        );
      } else {
        // Full order completed! Calculate generous tip & combo bonus
        const newCombo = combo + 1;
        setCombo(newCombo);
        const comboMult = 1 + Math.min(newCombo, 10) * 0.15;
        const firefliesTipMult = 1 + firefliesLevel * 0.2;
        const speedBonus = targetCustomer.patience >= 65 ? 1.25 : 1.0;

        const tipAmount = Math.round(
          itemPayment *
            0.45 *
            monsterDef.tipMultiplier *
            comboMult *
            firefliesTipMult *
            speedBonus
        );
        const totalGain = itemPayment + tipAmount;

        soundEngine.playHappyCustomer();
        setShards((s) => s + totalGain);
        setReputation((r) => r + (targetCustomer.isVip ? 3 : 1));
        setSugarRushCharge((ch) => Math.min(100, ch + 10));

        setNightStats((st) => ({
          ...st,
          customersServed: st.customersServed + 1,
          shardsEarned: st.shardsEarned + totalGain,
          tipsEarned: st.tipsEarned + tipAmount,
          maxComboReached: Math.max(st.maxComboReached, newCombo),
        }));

        const happyQuote =
          monsterDef.happyQuotes[Math.floor(Math.random() * monsterDef.happyQuotes.length)];

        addFloatingText(
          `+${totalGain} 🪙`,
          slotX,
          28,
          '#4EE29A',
          `Pourboire +${tipAmount} 🪙 (Combo x${comboMult.toFixed(2)})`
        );

        setCustomers((prev) =>
          prev.map((c, idx) =>
            idx === slotIndex && c
              ? {
                  ...c,
                  orders: updatedOrders,
                  status: 'happy_leaving',
                  currentQuote: happyQuote,
                }
              : c
          )
        );

        // Clear slot after happy jump animation
        setTimeout(() => {
          setCustomers((prev) =>
            prev.map((c, idx) =>
              idx === slotIndex && c?.uid === targetCustomer.uid ? null : c
            )
          );
        }, 680);
      }

      setSelectedCandy(null);
      return true;
    },
    [
      customers,
      jars,
      sugarRushActive,
      combo,
      firefliesLevel,
      addFloatingText,
      addFlyingCandy,
    ]
  );

  // Smart Jar Click: Automatically serve the best waiting customer who wants this candy!
  const handleJarClick = useCallback(
    (candyId: CandyId) => {
      const jar = jars[candyId];
      if (!jar.unlocked) {
        const candyDef = CANDY_DEFINITIONS.find((c) => c.id === candyId)!;
        if (shards >= candyDef.unlockCost) {
          soundEngine.playUpgrade();
          setShards((s) => s - candyDef.unlockCost);
          setJars((prev) => ({
            ...prev,
            [candyId]: { ...prev[candyId], unlocked: true, stock: prev[candyId].maxStock },
          }));
          addFloatingText(`Recette débloquée : ${candyDef.shortName} !`, 50, 55, '#4EE29A');
        } else {
          soundEngine.playPop(-3);
          addFloatingText(`Il manque ${Math.ceil(candyDef.unlockCost - shards)} 🪙`, 50, 70, '#FF5263');
        }
        return;
      }

      // If jar is empty, clicking it manually brews +2 candies right away!
      if (jar.stock <= 0) {
        soundEngine.playCauldronBubble();
        setJars((prev) => ({
          ...prev,
          [candyId]: {
            ...prev[candyId],
            stock: Math.min(prev[candyId].maxStock, prev[candyId].stock + 2),
            brewProgress: 0,
          },
        }));
        addFloatingText('Brassage express +2 !', 50, 72, '#4EE29A');
        return;
      }

      // 1. Check if the currently selected customer slot needs this candy
      if (selectedSlot !== null) {
        const selCust = customers[selectedSlot];
        if (
          selCust &&
          selCust.status === 'waiting' &&
          selCust.orders.some((o) => o.candyId === candyId && !o.fulfilled)
        ) {
          serveCandyToCustomer(selectedSlot, candyId);
          return;
        }
      }

      // 2. Otherwise, find the waiting customer with the lowest patience who needs this candy
      let bestSlot: number | null = null;
      let lowestPatience = 999;

      customers.forEach((c, idx) => {
        if (
          c &&
          c.status === 'waiting' &&
          c.orders.some((o) => o.candyId === candyId && !o.fulfilled)
        ) {
          if (c.patience < lowestPatience) {
            lowestPatience = c.patience;
            bestSlot = idx;
          }
        }
      });

      if (bestSlot !== null) {
        serveCandyToCustomer(bestSlot, candyId);
      } else {
        // No customer currently requests this candy -> place it on the serving tray
        soundEngine.playPop(0);
        setSelectedCandy((prev) => (prev === candyId ? null : candyId));
      }
    },
    [jars, shards, selectedSlot, customers, serveCandyToCustomer, addFloatingText]
  );

  // Clicking a customer slot
  const handleSelectCustomerSlot = useCallback(
    (slotIndex: number) => {
      const cust = customers[slotIndex];
      if (!cust || cust.status !== 'waiting') return;

      // If player is holding a candy on the tray that this customer wants, serve it!
      if (
        selectedCandy &&
        cust.orders.some((o) => o.candyId === selectedCandy && !o.fulfilled)
      ) {
        serveCandyToCustomer(slotIndex, selectedCandy);
        return;
      }

      // Otherwise, if this customer has an unfulfilled order whose jar is in stock, serve the first available item!
      const availableOrder = cust.orders.find(
        (o) => !o.fulfilled && jars[o.candyId]?.unlocked && jars[o.candyId]?.stock > 0
      );
      if (availableOrder) {
        serveCandyToCustomer(slotIndex, availableOrder.candyId);
        return;
      }

      setSelectedSlot((prev) => (prev === slotIndex ? null : slotIndex));
    },
    [customers, selectedCandy, jars, serveCandyToCustomer]
  );

  // Manual Brew Button on Jar
  const handleManualBrewJar = useCallback(
    (candyId: CandyId, e: React.MouseEvent) => {
      e.stopPropagation();
      soundEngine.playCauldronBubble();
      setJars((prev) => {
        const j = prev[candyId];
        if (!j.unlocked || j.stock >= j.maxStock) return prev;
        return {
          ...prev,
          [candyId]: {
            ...j,
            stock: Math.min(j.maxStock, j.stock + 2),
            brewProgress: 0,
          },
        };
      });
    },
    []
  );

  // Unlock Jar Button
  const handleUnlockJar = useCallback(
    (candyId: CandyId, e?: React.MouseEvent) => {
      if (e) e.stopPropagation();
      const def = CANDY_DEFINITIONS.find((c) => c.id === candyId)!;
      if (shards < def.unlockCost || jars[candyId].unlocked) return;

      soundEngine.playUpgrade();
      setShards((s) => s - def.unlockCost);
      setJars((prev) => ({
        ...prev,
        [candyId]: {
          ...prev[candyId],
          unlocked: true,
          stock: prev[candyId].maxStock,
        },
      }));
      addFloatingText(`Nouveau Bocal : ${def.name} !`, 50, 50, '#4EE29A');
    },
    [shards, jars, addFloatingText]
  );

  // Upgrade Jar Level Button
  const handleUpgradeJarLevel = useCallback(
    (candyId: CandyId, e: React.MouseEvent) => {
      e.stopPropagation();
      const def = CANDY_DEFINITIONS.find((c) => c.id === candyId)!;
      const jar = jars[candyId];
      const cost = Math.round(def.basePrice * 2.5 * Math.pow(1.65, jar.level - 1));
      if (shards < cost) return;

      soundEngine.playUpgrade();
      setShards((s) => s - cost);
      setJars((prev) => ({
        ...prev,
        [candyId]: {
          ...prev[candyId],
          level: prev[candyId].level + 1,
          stock: prev[candyId].maxStock, // Instant full refill bonus!
        },
      }));
      addFloatingText(`${def.shortName} Niv.${jar.level + 1} !`, 50, 68, '#FFD166', 'Stock rechargé !');
    },
    [jars, shards, addFloatingText]
  );

  // Click on the Enchanted Sugar Cauldron (Clicker Mechanic)
  const handleCauldronClick = useCallback(
    (e?: React.MouseEvent<HTMLButtonElement>) => {
      if (e) e.stopPropagation();
      soundEngine.playCauldronBubble();
      const gain = sugarRushActive ? Math.round(cauldronClickPower * 1.5) : cauldronClickPower;
      setShards((s) => s + gain);
      setNightStats((st) => ({
        ...st,
        shardsEarned: st.shardsEarned + gain,
        cauldronClicks: st.cauldronClicks + 1,
      }));

      // Advance all jar brew progress by +18% per click!
      setJars((prev) => {
        const next = { ...prev };
        (Object.keys(next) as CandyId[]).forEach((cid) => {
          const j = next[cid];
          if (j.unlocked && j.stock < j.maxStock) {
            const newProg = j.brewProgress + 22;
            if (newProg >= 100) {
              next[cid] = {
                ...j,
                stock: Math.min(j.maxStock, j.stock + 1),
                brewProgress: newProg - 100,
              };
            } else {
              next[cid] = { ...j, brewProgress: newProg };
            }
          }
        });
        return next;
      });

      // Charge Sugar Rush
      if (!sugarRushActive) {
        const chargeAdd = 8 + ladleLevel * 2;
        setSugarRushCharge((prev) => {
          const nextCharge = prev + chargeAdd;
          if (nextCharge >= 100) {
            soundEngine.playUpgrade();
            setSugarRushActive(true);
            addFloatingText('✨ FERVEUR SUCRÉE ACTIVÉE ! ✨', 50, 26, '#FFD166', 'Prix x1.5 pendant 12s');
            return 100;
          }
          return nextCharge;
        });
      }

      addFloatingText(`+${gain} 🪙`, 18 + Math.random() * 8, 56, '#FFD166');
    },
    [cauldronClickPower, ladleLevel, sugarRushActive, addFloatingText]
  );

  // Sugar Rush 12-second countdown when active
  useEffect(() => {
    if (!sugarRushActive) return;
    const timer = setInterval(() => {
      setSugarRushCharge((prev) => {
        if (prev <= 4) {
          setSugarRushActive(false);
          return 0;
        }
        return prev - 4;
      });
    }, 480);
    return () => clearInterval(timer);
  }, [sugarRushActive]);

  // Soothing Chamomile Tea Ability
  const handleUseSoothingTea = useCallback(() => {
    if (teaCooldown > 0) return;
    soundEngine.playHappyCustomer();
    setTeaCooldown(18);
    setCustomers((prev) =>
      prev.map((c) =>
        c && c.status === 'waiting'
          ? {
              ...c,
              patience: Math.min(100, c.patience + 35),
              currentQuote: '« Oh, quelle délicieuse tisane chaude ! Merci ~ »',
            }
          : c
      )
    );
    addFloatingText('🍵 Tisane Servie : +35% Patience !', 50, 38, '#4EE29A');
  }, [teaCooldown, addFloatingText]);

  // Customer Welcome Bell
  const handleRingCustomerBell = useCallback(() => {
    const emptyIdx = customers.findIndex((c) => c === null);
    if (emptyIdx === -1) return;
    soundEngine.playBell();
    const newCust = createCustomerForSlot(emptyIdx, jars, nightNumber);
    setCustomers((prev) => prev.map((c, idx) => (idx === emptyIdx ? newCust : c)));
    setShards((s) => s + 5);
    setNightStats((st) => ({ ...st, shardsEarned: st.shardsEarned + 5 }));
    addFloatingText('+5 🪙 Accueil Rapide !', 20 + emptyIdx * 30, 32, '#FFD166');
  }, [customers, createCustomerForSlot, jars, nightNumber, addFloatingText]);

  // Pet Black Cat Familiar
  const handlePetCat = useCallback(() => {
    soundEngine.playHappyCustomer();
    setCatPurring(true);
    setTimeout(() => setCatPurring(false), 1800);
    setCustomers((prev) =>
      prev.map((c) =>
        c && c.status === 'waiting'
          ? { ...c, patience: Math.min(100, c.patience + 12) }
          : c
      )
    );
    addFloatingText('🐈‍⬛ Ronronnement : +12% Patience !', 30, 52, '#FFB347');
  }, [addFloatingText]);

  // Buy Shop Upgrade in Grimoire
  const handleBuyUpgrade = useCallback(
    (upgradeId: string) => {
      const target = upgrades.find((u) => u.id === upgradeId);
      if (!target || target.level >= target.maxLevel) return;
      const cost = Math.round(target.baseCost * Math.pow(target.costMultiplier, target.level));
      if (shards < cost) return;

      soundEngine.playUpgrade();
      setShards((s) => s - cost);
      setUpgrades((prev) =>
        prev.map((u) => (u.id === upgradeId ? { ...u, level: u.level + 1 } : u))
      );

      // If jar_expansion was bought, increase maxStock & refill all jars immediately!
      if (upgradeId === 'jar_expansion') {
        setJars((prev) => {
          const next = { ...prev };
          (Object.keys(next) as CandyId[]).forEach((cid) => {
            const newMax = next[cid].maxStock + 3;
            next[cid] = {
              ...next[cid],
              maxStock: newMax,
              stock: newMax,
            };
          });
          return next;
        });
      }

      addFloatingText(`Amélioré : ${target.name} !`, 50, 40, '#4EE29A');
    },
    [upgrades, shards, addFloatingText]
  );

  // Main Game Loop (runs every 200ms = 5 ticks per second)
  useEffect(() => {
    if (isPaused || nightSummaryOpen) return;

    const dt = 0.2; // seconds
    const interval = setInterval(() => {
      // 1. Advance Lunar Clock (a full night lasts ~110 seconds)
      setNightProgress((prev) => {
        const next = prev + dt * 0.9;
        if (next >= 100) {
          soundEngine.playUpgrade();
          setNightSummaryOpen(true);
          return 100;
        }
        return next;
      });

      // 2. Passive Moon Shards from Auto-Cauldron
      if (passiveShardsPerSec > 0) {
        setShards((s) => s + passiveShardsPerSec * dt);
      }

      // 3. Tea Cooldown
      setTeaCooldown((prev) => Math.max(0, prev - dt));

      // 4. Auto-Brew Candy Jars
      const brewSpeedMult =
        (1 + autoCauldronLevel * 0.35) * (sugarRushActive ? 2.0 : 1.0);

      setJars((prev) => {
        let changed = false;
        const next = { ...prev };
        CANDY_DEFINITIONS.forEach((def) => {
          const jar = next[def.id];
          if (jar.unlocked && jar.stock < jar.maxStock) {
            changed = true;
            const step = (100 / def.refillTimeSec) * dt * brewSpeedMult;
            const newProg = jar.brewProgress + step;
            if (newProg >= 100) {
              next[def.id] = {
                ...jar,
                stock: Math.min(jar.maxStock, jar.stock + 1),
                brewProgress: newProg - 100,
              };
            } else {
              next[def.id] = { ...jar, brewProgress: newProg };
            }
          }
        });
        return changed ? next : prev;
      });

      // 5. Update Customer Patience & Spawn New Customers
      const lanternSlowMult = Math.max(0.32, 1 - lanternLevel * 0.18);
      const zenMult = cozyZenMode ? 0.42 : 1.0;

      setCustomers((prev) => {
        return prev.map((c, slotIdx) => {
          if (!c) {
            // Chance to spawn a new customer in empty slot
            const activeCount = prev.filter(Boolean).length;
            const spawnProb = activeCount === 0 ? 0.45 : activeCount === 1 ? 0.12 : 0.06;
            if (Math.random() < spawnProb) {
              return createCustomerForSlot(slotIdx, jars, nightNumber);
            }
            return null;
          }

          if (c.status !== 'waiting') return c;

          const decayPerSec = (100 / c.maxPatienceSec) * lanternSlowMult * zenMult;
          const nextPatience = c.patience - decayPerSec * dt;

          // Switch to impatient quote if crossing below 35%
          let nextQuote = c.currentQuote;
          if (c.patience >= 35 && nextPatience < 35) {
            const mDef = MONSTER_DEFINITIONS.find((m) => m.id === c.monsterId)!;
            nextQuote =
              mDef.impatientQuotes[Math.floor(Math.random() * mDef.impatientQuotes.length)];
          }

          if (nextPatience <= 0) {
            // Monster leaves impatiently
            soundEngine.playCustomerLeaveSad();
            setCombo(0);
            setNightStats((st) => ({ ...st, customersLost: st.customersLost + 1 }));
            addFloatingText('Client reparti…', 20 + slotIdx * 30, 32, '#FF5263');

            setTimeout(() => {
              setCustomers((curr) =>
                curr.map((item, idx) => (idx === slotIdx && item?.uid === c.uid ? null : item))
              );
            }, 600);

            return {
              ...c,
              patience: 0,
              status: 'angry_leaving',
              currentQuote: '« Tant pis, je repasserai une autre nuit ! »',
            };
          }

          return {
            ...c,
            patience: nextPatience,
            currentQuote: nextQuote,
          };
        });
      });
    }, 200);

    return () => clearInterval(interval);
  }, [
    isPaused,
    nightSummaryOpen,
    passiveShardsPerSec,
    autoCauldronLevel,
    sugarRushActive,
    lanternLevel,
    cozyZenMode,
    jars,
    nightNumber,
    createCustomerForSlot,
    addFloatingText,
  ]);

  // Familiar Black Cat "Réglisse" Periodic Assist
  useEffect(() => {
    if (catLevel <= 0 || isPaused || nightSummaryOpen) return;
    const catIntervalMs = Math.max(3500, 7500 - catLevel * 1400);

    const timer = setInterval(() => {
      // Find a waiting customer who needs an available candy
      for (let i = 0; i < customers.length; i++) {
        const cust = customers[i];
        if (cust && cust.status === 'waiting') {
          const needed = cust.orders.find(
            (o) => !o.fulfilled && jars[o.candyId]?.unlocked && jars[o.candyId]?.stock > 0
          );
          if (needed) {
            setCatPurring(true);
            setTimeout(() => setCatPurring(false), 1200);
            serveCandyToCustomer(i, needed.candyId);
            return;
          }
        }
      }
    }, catIntervalMs);

    return () => clearInterval(timer);
  }, [catLevel, isPaused, nightSummaryOpen, customers, jars, serveCandyToCustomer]);

  // Keyboard Shortcuts: [1]-[6] for Candy Jars, [Space] for Cauldron, [T] for Tea
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (grimoireOpen || nightSummaryOpen) {
        if (e.key === 'Escape') setGrimoireOpen(false);
        return;
      }

      if (e.key >= '1' && e.key <= '6') {
        const index = parseInt(e.key, 10) - 1;
        const candyDef = CANDY_DEFINITIONS[index];
        if (candyDef) {
          e.preventDefault();
          handleJarClick(candyDef.id);
        }
      } else if (e.code === 'Space') {
        e.preventDefault();
        handleCauldronClick();
      } else if (e.key.toLowerCase() === 't') {
        e.preventDefault();
        handleUseSoothingTea();
      } else if (e.key.toLowerCase() === 'g') {
        e.preventDefault();
        setGrimoireOpen((o) => !o);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    grimoireOpen,
    nightSummaryOpen,
    handleJarClick,
    handleCauldronClick,
    handleUseSoothingTea,
  ]);

  // Count how many upgrades or locked recipes are currently affordable
  const affordableUpgradesCount =
    upgrades.filter((u) => {
      if (u.level >= u.maxLevel) return false;
      const cost = Math.round(u.baseCost * Math.pow(u.costMultiplier, u.level));
      return shards >= cost;
    }).length +
    CANDY_DEFINITIONS.filter((c) => !jars[c.id].unlocked && shards >= c.unlockCost).length;

  // Start Next Night
  const handleStartNextNight = () => {
    const nextNight = nightNumber + 1;
    setNightNumber(nextNight);
    setNightProgress(0);
    setNightSummaryOpen(false);
    // Refill all unlocked jars for the new night
    setJars((prev) => {
      const next = { ...prev };
      (Object.keys(next) as CandyId[]).forEach((cid) => {
        if (next[cid].unlocked) {
          next[cid] = { ...next[cid], stock: next[cid].maxStock, brewProgress: 0 };
        }
      });
      return next;
    });
    setNightStats({
      nightNumber: nextNight,
      customersServed: 0,
      customersLost: 0,
      shardsEarned: 0,
      tipsEarned: 0,
      maxComboReached: combo,
      cauldronClicks: 0,
    });
    const c0 = createCustomerForSlot(0, jars, nextNight);
    const c1 = createCustomerForSlot(1, jars, nextNight);
    setCustomers([c0, c1, null]);
  };

  return (
    <main className="h-screen w-screen overflow-hidden flex flex-col bg-[#120E1E] text-[#FFF8E7] select-none">
      {/* 1. Top HUD Bar */}
      <TopHud
        nightNumber={nightNumber}
        nightProgress={nightProgress}
        shards={shards}
        passiveShardsPerSec={passiveShardsPerSec}
        reputation={reputation}
        combo={combo}
        sugarRushActive={sugarRushActive}
        cozyZenMode={cozyZenMode}
        isPaused={isPaused}
        soundEnabled={soundEnabled}
        musicEnabled={musicEnabled}
        affordableUpgradesCount={affordableUpgradesCount}
        onToggleZenMode={() => setCozyZenMode((z) => !z)}
        onTogglePause={() => setIsPaused((p) => !p)}
        onToggleSound={() => {
          const next = !soundEnabled;
          soundEngine.enabled = next;
          setSoundEnabled(next);
        }}
        onToggleMusic={() => {
          const next = soundEngine.toggleMusic();
          setMusicEnabled(next);
        }}
        onOpenGrimoire={(tab = 'upgrades') => {
          setGrimoireTab(tab);
          setGrimoireOpen(true);
        }}
      />

      {/* 2. Upper-Middle Nocturnal Customer Stage */}
      <CustomerStage
        customers={customers}
        selectedSlot={selectedSlot}
        selectedCandy={selectedCandy}
        jars={jars}
        lanternLevel={lanternLevel}
        firefliesLevel={firefliesLevel}
        sugarRushActive={sugarRushActive}
        floatingTexts={floatingTexts}
        flyingCandies={flyingCandies}
        onSelectCustomerSlot={handleSelectCustomerSlot}
        onDirectServeCandyToSlot={(slotIdx, candyId) => serveCandyToCustomer(slotIdx, candyId)}
      />

      {/* 3. Lower-Middle Mahogany Countertop & Clicker Cauldron */}
      <CounterWorkstation
        selectedCandy={selectedCandy}
        cauldronClickPower={cauldronClickPower}
        sugarRushCharge={sugarRushCharge}
        sugarRushActive={sugarRushActive}
        teaCooldown={teaCooldown}
        hasEmptyCustomerSlot={customers.some((c) => c === null)}
        hasWaitingCustomers={customers.some((c) => c !== null && c.status === 'waiting')}
        catLevel={catLevel}
        catPurring={catPurring}
        onCauldronClick={handleCauldronClick}
        onUseSoothingTea={handleUseSoothingTea}
        onRingCustomerBell={handleRingCustomerBell}
        onPetCat={handlePetCat}
        onClearSelectedCandy={() => setSelectedCandy(null)}
      />

      {/* 4. Bottom Apothecary Candy Jars Shelf */}
      <CandyShelf
        jars={jars}
        customers={customers}
        selectedCandy={selectedCandy}
        shards={shards}
        sugarRushActive={sugarRushActive}
        onJarClick={handleJarClick}
        onManualBrewJar={handleManualBrewJar}
        onUnlockJar={handleUnlockJar}
        onUpgradeJarLevel={handleUpgradeJarLevel}
      />

      {/* Slide-over Grimoire & Bestiary Modal */}
      <GrimoireModal
        isOpen={grimoireOpen}
        activeTab={grimoireTab}
        shards={shards}
        upgrades={upgrades}
        jars={jars}
        onClose={() => setGrimoireOpen(false)}
        onChangeTab={(t) => setGrimoireTab(t)}
        onBuyUpgrade={handleBuyUpgrade}
        onUnlockJar={(cid) => handleUnlockJar(cid)}
      />

      {/* End-of-Night Cozy Summary Modal */}
      <NightSummaryModal
        isOpen={nightSummaryOpen}
        stats={nightStats}
        shards={shards}
        onOpenGrimoire={() => {
          setNightSummaryOpen(false);
          setGrimoireTab('upgrades');
          setGrimoireOpen(true);
        }}
        onStartNextNight={handleStartNextNight}
      />
    </main>
  );
}
export default App;
