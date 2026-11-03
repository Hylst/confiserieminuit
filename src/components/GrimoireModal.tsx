import React from 'react';
import {
  CandyId,
  CandyJarState,
  NightStats,
  ShopUpgrade,
} from '../types/game';
import { CANDY_DEFINITIONS, MONSTER_DEFINITIONS } from '../data/gameData';
import { CandySprite, MonsterSprite, MoonShardIcon } from './PixelSprites';
import { BookOpen, CheckCircle2, Moon, Sparkles, Star, Trophy, X } from 'lucide-react';

interface GrimoireModalProps {
  isOpen: boolean;
  activeTab: 'upgrades' | 'bestiary';
  shards: number;
  upgrades: ShopUpgrade[];
  jars: Record<CandyId, CandyJarState>;
  onClose: () => void;
  onChangeTab: (tab: 'upgrades' | 'bestiary') => void;
  onBuyUpgrade: (upgradeId: string) => void;
  onUnlockJar: (candyId: CandyId) => void;
}

export const GrimoireModal: React.FC<GrimoireModalProps> = ({
  isOpen,
  activeTab,
  shards,
  upgrades,
  jars,
  onClose,
  onChangeTab,
  onBuyUpgrade,
  onUnlockJar,
}) => {
  if (!isOpen) return null;

  const getUpgradeCost = (u: ShopUpgrade) =>
    Math.round(u.baseCost * Math.pow(u.costMultiplier, u.level));

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/65 backdrop-blur-xs animate-fadeIn select-none">
      {/* Backdrop click to close */}
      <div className="flex-1" onClick={onClose} />

      {/* Slide-over Apothecary Grimoire Drawer */}
      <aside className="relative w-full max-w-lg h-full bg-[#181226] border-l-4 border-[#4A3869] shadow-2xl flex flex-col overflow-hidden">
        {/* Drawer Header */}
        <div className="p-4 wood-panel border-t-0 border-x-0 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#2E2344] border-2 border-[#FFB347] flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-[#FFD166]" />
            </div>
            <div>
              <h2 className="font-display-pixel text-lg text-[#FFF8E7]">
                Grimoire de l’Apothicaire
              </h2>
              <p className="text-xs text-[#C4B5D6]">
                Améliorations d’échoppe, charmes & bestiaire nocturne
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-[#120E1E] border border-[#4A3869] rounded-lg px-2.5 py-1">
              <MoonShardIcon className="w-4 h-4" />
              <span className="font-mono-num text-sm font-bold text-[#FFD166]">
                {Math.floor(shards)}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-[#2E2344] hover:bg-[#3F305C] text-[#FFF8E7] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-4 pt-3 bg-[#140F21] border-b border-[#382A52] flex gap-2">
          <button
            onClick={() => onChangeTab('upgrades')}
            className={`px-4 py-2 rounded-t-xl font-display-pixel text-sm font-bold border-t-2 border-x-2 transition-colors cursor-pointer ${
              activeTab === 'upgrades'
                ? 'bg-[#1F1830] border-[#FFB347] text-[#FFD166]'
                : 'bg-[#120E1E] border-transparent text-[#C4B5D6] hover:text-[#FFF8E7]'
            }`}
          >
            ✨ Améliorations & Recettes
          </button>
          <button
            onClick={() => onChangeTab('bestiary')}
            className={`px-4 py-2 rounded-t-xl font-display-pixel text-sm font-bold border-t-2 border-x-2 transition-colors cursor-pointer ${
              activeTab === 'bestiary'
                ? 'bg-[#1F1830] border-[#FFB347] text-[#FFD166]'
                : 'bg-[#120E1E] border-transparent text-[#C4B5D6] hover:text-[#FFF8E7]'
            }`}
          >
            🎃 Carnet des Monstres
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5">
          {activeTab === 'upgrades' ? (
            <>
              {/* Section 1: Locked Exotic Candy Recipes */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#FFB347] mb-2.5 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Nouvelles Recettes de Confiseries
                </h3>
                <div className="grid grid-cols-1 gap-2.5">
                  {CANDY_DEFINITIONS.filter((c) => c.unlockCost > 0).map((candy) => {
                    const jar = jars[candy.id];
                    const canAfford = shards >= candy.unlockCost;
                    return (
                      <div
                        key={candy.id}
                        className="wood-panel rounded-xl p-3 flex items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-[#140F21] border border-[#4A3869] flex items-center justify-center shrink-0">
                            <CandySprite candyId={candy.id} className="w-9 h-9" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-display-pixel text-sm font-bold text-[#FFF8E7]">
                                {candy.name}
                              </span>
                              <span className="font-mono-num text-xs text-[#FFD166] font-bold">
                                ({candy.basePrice} 🪙/unité)
                              </span>
                            </div>
                            <p className="text-xs text-[#C4B5D6] mt-0.5">{candy.description}</p>
                          </div>
                        </div>

                        {jar.unlocked ? (
                          <span className="px-3 py-1.5 rounded-lg bg-[#254238] border border-[#4EE29A] text-[#4EE29A] text-xs font-bold flex items-center gap-1 shrink-0">
                            <CheckCircle2 className="w-4 h-4" /> Débloqué
                          </span>
                        ) : (
                          <button
                            onClick={() => onUnlockJar(candy.id)}
                            disabled={!canAfford}
                            className={`pixel-btn px-3 py-2 rounded-xl font-mono-num text-xs font-extrabold shrink-0 cursor-pointer ${
                              canAfford
                                ? 'bg-gradient-to-b from-[#7E4AE8] to-[#5B2EC2] border-[#FFD166] text-[#FFF8E7]'
                                : 'bg-[#1A1329] border-[#382A52] text-[#C4B5D6]/50 cursor-not-allowed'
                            }`}
                          >
                            Débloquer • {candy.unlockCost} 🪙
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Section 2: Equipment & Cozy Decor Upgrades */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#FFB347] mb-2.5 flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5" /> Équipements & Décorations Magiques
                </h3>
                <div className="space-y-2.5">
                  {upgrades.map((up) => {
                    const isMaxed = up.level >= up.maxLevel;
                    const cost = getUpgradeCost(up);
                    const canAfford = !isMaxed && shards >= cost;

                    const iconEmoji =
                      up.iconType === 'cauldron'
                        ? '🧪'
                        : up.iconType === 'lantern'
                        ? '🎃'
                        : up.iconType === 'cat'
                        ? '🐈‍⬛'
                        : up.iconType === 'ladle'
                        ? '🥄'
                        : up.iconType === 'fireflies'
                        ? '✨'
                        : '🏺';

                    return (
                      <div
                        key={up.id}
                        className="wood-panel rounded-xl p-3 flex items-center justify-between gap-3"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-11 h-11 rounded-xl bg-[#140F21] border border-[#4A3869] flex items-center justify-center text-xl shrink-0">
                            {iconEmoji}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-display-pixel text-sm font-bold text-[#FFF8E7]">
                                {up.name}
                              </span>
                              <span className="px-1.5 py-0.5 rounded bg-[#140F21] border border-[#4A3869] font-mono-num text-[10px] font-bold text-[#FFB347]">
                                Niv. {up.level}/{up.maxLevel}
                              </span>
                            </div>
                            <p className="text-xs text-[#C4B5D6] mt-0.5">{up.description}</p>
                            <p className="text-[11px] font-semibold text-[#4EE29A] mt-1">
                              {up.effectText}
                            </p>
                          </div>
                        </div>

                        {isMaxed ? (
                          <span className="px-3 py-1.5 rounded-lg bg-[#254238] border border-[#4EE29A] text-[#4EE29A] text-xs font-bold shrink-0">
                            MAX
                          </span>
                        ) : (
                          <button
                            onClick={() => onBuyUpgrade(up.id)}
                            disabled={!canAfford}
                            className={`pixel-btn px-3 py-2 rounded-xl font-mono-num text-xs font-extrabold shrink-0 cursor-pointer ${
                              canAfford
                                ? 'bg-gradient-to-b from-[#FFB347] to-[#E08A1E] border-[#FFF8E7] text-[#1A112B]'
                                : 'bg-[#1A1329] border-[#382A52] text-[#C4B5D6]/50 cursor-not-allowed'
                            }`}
                          >
                            {cost} 🪙
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          ) : (
            /* Tab 2: Bestiary / Carnet des Monstres */
            <div className="space-y-3">
              <p className="text-xs text-[#C4B5D6]">
                Apprenez à connaître les habitués de la ruelle nocturne et leurs sucreries favorites :
              </p>
              {MONSTER_DEFINITIONS.map((monster) => (
                <div
                  key={monster.id}
                  className="wood-panel rounded-xl p-3 flex items-center gap-3.5"
                >
                  <div className="w-20 h-20 rounded-xl bg-[#140F21] border border-[#4A3869] flex items-center justify-center shrink-0 overflow-hidden">
                    <div className="scale-75">
                      <MonsterSprite monsterId={monster.id} patience={90} status="waiting" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <span className="font-display-pixel text-base font-bold text-[#FFF8E7]">
                          {monster.name}
                        </span>
                        <span className="ml-2 text-xs text-[#FFB347] font-semibold">
                          {monster.title}
                        </span>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-[#140F21] border border-[#4A3869] font-mono-num text-[11px] text-[#4EE29A]">
                        Pourboire x{monster.tipMultiplier}
                      </span>
                    </div>
                    <p className="text-xs text-[#C4B5D6] mt-1">{monster.description}</p>
                    <div className="mt-2 flex items-center gap-1.5 flex-wrap">
                      <span className="text-[11px] text-[#FFF8E7]/80 font-semibold">
                        Péché mignon :
                      </span>
                      {monster.favoriteCandies.map((cid) => {
                        const cdef = CANDY_DEFINITIONS.find((c) => c.id === cid)!;
                        return (
                          <span
                            key={cid}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#140F21] border border-[#4A3869] text-[10px] text-[#FFF8E7]"
                          >
                            <CandySprite candyId={cid} className="w-3.5 h-3.5" />
                            {cdef.shortName}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </aside>
    </div>
  );
};

interface NightSummaryModalProps {
  isOpen: boolean;
  stats: NightStats;
  shards: number;
  onOpenGrimoire: () => void;
  onStartNextNight: () => void;
}

export const NightSummaryModal: React.FC<NightSummaryModalProps> = ({
  isOpen,
  stats,
  shards,
  onOpenGrimoire,
  onStartNextNight,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs select-none">
      <div className="w-full max-w-md wood-panel rounded-2xl p-6 border-4 border-[#FFB347] shadow-2xl text-center relative overflow-hidden">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-[#2E2344] border-2 border-[#FFD166] flex items-center justify-center mb-3 shadow-lg">
          <Moon className="w-7 h-7 text-[#FFD166]" />
        </div>

        <h2 className="font-display-pixel text-2xl text-[#FFF8E7]">
          L’Aube se Lève sur la Nuit {stats.nightNumber}
        </h2>
        <p className="text-xs text-[#C4B5D6] mt-1">
          Les monstres regagnent leurs manoirs le ventre plein de sucreries !
        </p>

        {/* Stats Grid */}
        <div className="mt-5 grid grid-cols-2 gap-3 text-left">
          <div className="bg-[#140F21] border border-[#4A3869] rounded-xl p-3">
            <div className="text-[11px] text-[#C4B5D6] uppercase">Monstres Servis</div>
            <div className="font-mono-num text-xl font-extrabold text-[#4EE29A] mt-0.5">
              {stats.customersServed} 🎃
            </div>
          </div>

          <div className="bg-[#140F21] border border-[#4A3869] rounded-xl p-3">
            <div className="text-[11px] text-[#C4B5D6] uppercase">Éclats Récoltés</div>
            <div className="font-mono-num text-xl font-extrabold text-[#FFD166] mt-0.5">
              +{stats.shardsEarned} 🪙
            </div>
          </div>

          <div className="bg-[#140F21] border border-[#4A3869] rounded-xl p-3">
            <div className="text-[11px] text-[#C4B5D6] uppercase">Pourboires & Bonus</div>
            <div className="font-mono-num text-lg font-bold text-[#FFB347] mt-0.5">
              +{stats.tipsEarned} 🪙
            </div>
          </div>

          <div className="bg-[#140F21] border border-[#4A3869] rounded-xl p-3">
            <div className="text-[11px] text-[#C4B5D6] uppercase">Meilleur Combo</div>
            <div className="font-mono-num text-lg font-bold text-[#9D65FF] mt-0.5 flex items-center gap-1">
              <Trophy className="w-4 h-4 text-[#FFD166]" /> x
              {(1 + Math.min(stats.maxComboReached, 10) * 0.15).toFixed(2)}
            </div>
          </div>
        </div>

        <div className="mt-4 py-2 px-3 rounded-xl bg-[#140F21]/80 border border-[#4A3869] flex items-center justify-between text-xs">
          <span className="text-[#C4B5D6]">Trésorerie actuelle :</span>
          <span className="font-mono-num font-bold text-[#FFD166] text-sm">
            {Math.floor(shards)} Éclats de Lune 🪙
          </span>
        </div>

        {/* Actions */}
        <div className="mt-5 flex flex-col sm:flex-row gap-2.5">
          <button
            onClick={onOpenGrimoire}
            className="flex-1 pixel-btn py-2.5 px-4 rounded-xl bg-[#2E2344] border-[#9D65FF] text-[#FFF8E7] font-display-pixel text-sm font-bold cursor-pointer"
          >
            📖 Ouvrir le Grimoire
          </button>
          <button
            onClick={onStartNextNight}
            className="flex-1 pixel-btn py-2.5 px-4 rounded-xl bg-gradient-to-b from-[#4EE29A] to-[#2BB673] border-[#FFF8E7] text-[#120E1E] font-display-pixel text-sm font-extrabold cursor-pointer"
          >
            🌙 Nuit {stats.nightNumber + 1} →
          </button>
        </div>
      </div>
    </div>
  );
};
