import React from 'react';
import { ActiveCustomer, CandyId, CandyJarState } from '../types/game';
import { CANDY_DEFINITIONS } from '../data/gameData';
import { ApothecaryJarSprite } from './PixelSprites';
import { ArrowUpCircle, Lock, PlusCircle, Sparkles } from 'lucide-react';

interface CandyShelfProps {
  jars: Record<CandyId, CandyJarState>;
  customers: (ActiveCustomer | null)[];
  selectedCandy: CandyId | null;
  shards: number;
  sugarRushActive: boolean;
  onJarClick: (candyId: CandyId) => void;
  onManualBrewJar: (candyId: CandyId, e: React.MouseEvent) => void;
  onUnlockJar: (candyId: CandyId, e: React.MouseEvent) => void;
  onUpgradeJarLevel: (candyId: CandyId, e: React.MouseEvent) => void;
}

export const CandyShelf: React.FC<CandyShelfProps> = ({
  jars,
  customers,
  selectedCandy,
  shards,
  sugarRushActive,
  onJarClick,
  onManualBrewJar,
  onUnlockJar,
  onUpgradeJarLevel,
}) => {
  // Count how many waiting customer orders currently need each candy
  const demandByCandy: Record<CandyId, number> = {
    spectral_lollipop: 0,
    gummy_eyeball: 0,
    pumpkin_caramel: 0,
    bone_crunch: 0,
    bat_licorice: 0,
    midnight_star: 0,
  };

  customers.forEach((c) => {
    if (c && c.status === 'waiting') {
      c.orders.forEach((o) => {
        if (!o.fulfilled) {
          demandByCandy[o.candyId] = (demandByCandy[o.candyId] || 0) + 1;
        }
      });
    }
  });

  return (
    <section className="relative z-20 bg-[#171126] border-t-2 border-[#4A3869] px-2.5 md:px-6 py-2.5 select-none">
      <div className="max-w-6xl mx-auto grid grid-cols-3 sm:grid-cols-6 gap-2 md:gap-3">
        {CANDY_DEFINITIONS.map((candy) => {
          const jar = jars[candy.id];
          const isSelected = selectedCandy === candy.id;
          const demandCount = demandByCandy[candy.id] || 0;

          // Effective price calculation
          const baseVal = Math.round(candy.basePrice * (1 + (jar.level - 1) * 0.35));
          const effectivePrice = sugarRushActive ? Math.round(baseVal * 1.5) : baseVal;
          const upgradeCost = Math.round((candy.basePrice * 2.5) * Math.pow(1.65, jar.level - 1));
          const canAffordUpgrade = shards >= upgradeCost;
          const canAffordUnlock = shards >= candy.unlockCost;

          return (
            <div
              key={candy.id}
              onClick={() => onJarClick(candy.id)}
              className={`group relative rounded-xl p-2 flex flex-col items-center justify-between transition-all cursor-pointer ${
                !jar.unlocked
                  ? 'bg-[#150F22]/90 border-2 border-dashed border-[#4A3869]/70 hover:border-[#9D65FF]'
                  : isSelected
                  ? 'wood-panel border-[#FFD166] ring-2 ring-[#FFD166]/60 -translate-y-1'
                  : demandCount > 0
                  ? 'wood-panel border-[#4EE29A] shadow-[0_0_14px_rgba(78,226,154,0.22)] hover:-translate-y-1'
                  : 'wood-panel hover:border-[#8D6BCE] hover:-translate-y-0.5'
              }`}
            >
              {/* Top Row: Keyboard Shortcut & Demand Indicator */}
              <div className="w-full flex items-center justify-between gap-1 z-10">
                <span className="px-1.5 py-0.5 rounded bg-[#120E1E] border border-[#4A3869] font-mono-num text-[10px] font-bold text-[#C4B5D6]">
                  [{candy.shortcutKey}]
                </span>

                {jar.unlocked && demandCount > 0 ? (
                  <span className="px-1.5 py-0.5 rounded-full bg-[#4EE29A] text-[#120E1E] font-mono-num text-[10px] font-extrabold flex items-center gap-0.5 animate-pulse shadow">
                    <Sparkles className="w-2.5 h-2.5" /> Demandé x{demandCount}
                  </span>
                ) : jar.unlocked ? (
                  <span className="font-mono-num text-[10px] font-bold text-[#FFD166] bg-[#120E1E]/80 px-1.5 py-0.5 rounded border border-[#FFB347]/30">
                    {effectivePrice} 🪙
                  </span>
                ) : (
                  <span className="text-[10px] font-bold text-[#9D65FF] uppercase">Recette</span>
                )}
              </div>

              {/* Center: Apothecary Glass Jar Illustration */}
              <div className="my-0.5 relative flex flex-col items-center">
                <ApothecaryJarSprite
                  candyId={candy.id}
                  stock={jar.stock}
                  maxStock={jar.maxStock}
                  unlocked={jar.unlocked}
                  colorPrimary={candy.colorPrimary}
                />

                {/* Stock Pill Overlaid at Jar Base */}
                {jar.unlocked && (
                  <div
                    className={`-mt-2 z-10 px-2 py-0.2 rounded-full border font-mono-num text-[11px] font-extrabold shadow ${
                      jar.stock === 0
                        ? 'bg-[#FF5263] border-[#FFF8E7] text-[#FFF8E7] animate-bounce'
                        : jar.stock <= 2
                        ? 'bg-[#FFAA33] border-[#120E1E] text-[#120E1E]'
                        : 'bg-[#150F24] border-[#4A3869] text-[#FFF8E7]'
                    }`}
                  >
                    {jar.stock}/{jar.maxStock}
                  </div>
                )}
              </div>

              {/* Candy Name & Auto-Refill Bar */}
              <div className="w-full text-center mt-0.5">
                <div className="font-display-pixel text-xs md:text-sm font-bold text-[#FFF8E7] truncate">
                  {candy.shortName}
                </div>

                {jar.unlocked ? (
                  <>
                    {/* Brew Progress Bar */}
                    <div className="w-full h-1.5 bg-[#120E1E] rounded-full overflow-hidden mt-1 border border-[#4A3869]/50">
                      <div
                        className="h-full transition-all duration-150"
                        style={{
                          width: `${jar.stock >= jar.maxStock ? 100 : jar.brewProgress}%`,
                          backgroundColor: candy.colorPrimary,
                        }}
                      />
                    </div>

                    {/* Action Row: Manual Brew +1 or Upgrade Level */}
                    <div className="mt-1.5 grid grid-cols-2 gap-1 w-full">
                      <button
                        type="button"
                        onClick={(e) => onManualBrewJar(candy.id, e)}
                        disabled={jar.stock >= jar.maxStock}
                        title="Brasser manuellement un bonbon immédiatement"
                        className={`px-1.5 py-1 rounded text-[10px] font-bold flex items-center justify-center gap-0.5 border transition-colors ${
                          jar.stock < jar.maxStock
                            ? 'bg-[#261C38] hover:bg-[#382952] border-[#6C5396] text-[#4EE29A] cursor-pointer'
                            : 'bg-[#161021] border-[#2E2344] text-[#C4B5D6]/40 cursor-not-allowed'
                        }`}
                      >
                        <PlusCircle className="w-3 h-3 shrink-0" />
                        <span>Brasser</span>
                      </button>

                      <button
                        type="button"
                        onClick={(e) => onUpgradeJarLevel(candy.id, e)}
                        disabled={!canAffordUpgrade}
                        title={`Améliorer la recette au Niv.${jar.level + 1} (+35% prix de vente & recharge le bocal)`}
                        className={`px-1.5 py-1 rounded font-mono-num text-[10px] font-bold flex items-center justify-center gap-0.5 border transition-colors ${
                          canAffordUpgrade
                            ? 'bg-[#3B285E] hover:bg-[#4F367E] border-[#FFB347] text-[#FFD166] cursor-pointer'
                            : 'bg-[#161021] border-[#2E2344] text-[#C4B5D6]/40 cursor-not-allowed'
                        }`}
                      >
                        <ArrowUpCircle className="w-3 h-3 shrink-0" />
                        <span>{upgradeCost}🪙</span>
                      </button>
                    </div>
                  </>
                ) : (
                  /* Locked Jar Unlock Button */
                  <button
                    type="button"
                    onClick={(e) => onUnlockJar(candy.id, e)}
                    disabled={!canAffordUnlock}
                    className={`mt-1.5 w-full py-1.5 px-2 rounded-lg font-mono-num text-xs font-extrabold flex items-center justify-center gap-1 border-2 transition-all ${
                      canAffordUnlock
                        ? 'bg-gradient-to-r from-[#7E4AE8] to-[#9D65FF] border-[#FFD166] text-[#FFF8E7] shadow-[0_2px_0_#0B0814] cursor-pointer animate-pulse'
                        : 'bg-[#1D152E] border-[#4A3869] text-[#C4B5D6]/60 cursor-not-allowed'
                    }`}
                  >
                    <Lock className="w-3 h-3" />
                    <span>Débloquer {candy.unlockCost} 🪙</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
