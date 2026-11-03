import React from 'react';
import { CandyId } from '../types/game';
import { CANDY_DEFINITIONS } from '../data/gameData';
import { BlackCatSprite, CandySprite } from './PixelSprites';
import { Bell, Coffee, Sparkles } from 'lucide-react';

interface CounterWorkstationProps {
  selectedCandy: CandyId | null;
  cauldronClickPower: number;
  sugarRushCharge: number; // 0 to 100
  sugarRushActive: boolean;
  teaCooldown: number; // seconds left, 0 = ready
  hasEmptyCustomerSlot: boolean;
  hasWaitingCustomers: boolean;
  catLevel: number;
  catPurring: boolean;
  onCauldronClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onUseSoothingTea: () => void;
  onRingCustomerBell: () => void;
  onPetCat: () => void;
  onClearSelectedCandy: () => void;
}

export const CounterWorkstation: React.FC<CounterWorkstationProps> = ({
  selectedCandy,
  cauldronClickPower,
  sugarRushCharge,
  sugarRushActive,
  teaCooldown,
  hasEmptyCustomerSlot,
  hasWaitingCustomers,
  catLevel,
  catPurring,
  onCauldronClick,
  onUseSoothingTea,
  onRingCustomerBell,
  onPetCat,
  onClearSelectedCandy,
}) => {
  const selectedCandyDef = selectedCandy
    ? CANDY_DEFINITIONS.find((c) => c.id === selectedCandy)
    : null;

  return (
    <div className="relative z-20 wood-shelf px-3 md:px-6 py-2 flex items-center justify-between gap-2 md:gap-4 select-none">
      {/* Left: Interactive Sugar Cauldron (Clicker Mechanic) */}
      <div className="flex items-center gap-2.5 md:gap-3">
        <button
          type="button"
          onClick={onCauldronClick}
          title="Touiller le Chaudron de Sucre [Touche Espace] : Gagnez des Éclats et chargez la Ferveur Sucrée !"
          className={`group relative pixel-btn rounded-xl px-3 py-1.5 flex items-center gap-2.5 cursor-pointer ${
            sugarRushActive
              ? 'bg-gradient-to-r from-[#5B2EC2] to-[#9D65FF] border-[#FFD166]'
              : 'bg-[#1D152E] hover:bg-[#281D3F] border-[#6C5396]'
          }`}
        >
          {/* Bubbling Cauldron SVG */}
          <div className="relative w-9 h-9 flex items-center justify-center animate-cauldron">
            <svg viewBox="0 0 40 40" className="w-full h-full">
              {/* Bubbles */}
              <circle cx="15" cy="9" r="2.5" fill="#4EE29A" className="animate-ping" style={{ animationDuration: '2s' }} />
              <circle cx="23" cy="7" r="2" fill="#FFD166" />
              <circle cx="20" cy="11" r="3" fill="#9D65FF" />
              {/* Cauldron Rim */}
              <rect x="7" y="12" width="26" height="5" rx="2.5" fill="#3B2D54" stroke="#120E1E" strokeWidth="2" />
              {/* Glowing Syrup Surface */}
              <ellipse cx="20" cy="14" rx="10" ry="2.2" fill={sugarRushActive ? '#FFD166' : '#4EE29A'} />
              {/* Cauldron Belly */}
              <path
                d="M9 16C7 26 12 34 20 34C28 34 33 26 31 16H9Z"
                fill="#281E3C"
                stroke="#120E1E"
                strokeWidth="2.2"
              />
              {/* Shine */}
              <path d="M13 20C12 24 14 28 16 30" stroke="#6C5396" strokeWidth="2" strokeLinecap="round" fill="none" />
            </svg>
          </div>

          <div className="text-left">
            <div className="flex items-center gap-1.5">
              <span className="font-display-pixel text-xs md:text-sm font-bold text-[#FFF8E7]">
                Chaudron
              </span>
              <span className="px-1.5 py-0.2 rounded bg-[#FFB347]/20 border border-[#FFB347]/50 font-mono-num text-[10px] font-bold text-[#FFD166]">
                +{cauldronClickPower} 🪙
              </span>
            </div>

            {/* Sugar Rush Charge Bar */}
            <div className="mt-1 flex items-center gap-1.5">
              <div className="w-20 md:w-28 h-2 bg-[#120E1E] rounded-full overflow-hidden border border-[#4A3869]">
                <div
                  className={`h-full transition-all duration-150 ${
                    sugarRushActive
                      ? 'bg-gradient-to-r from-[#FFD166] via-[#FF9E2C] to-[#FFD166]'
                      : 'bg-gradient-to-r from-[#4EE29A] to-[#9D65FF]'
                  }`}
                  style={{ width: `${Math.min(100, sugarRushCharge)}%` }}
                />
              </div>
              <span className="font-mono-num text-[10px] text-[#C4B5D6]">
                {sugarRushActive ? 'MAX!' : `${Math.floor(sugarRushCharge)}%`}
              </span>
            </div>
          </div>
        </button>

        {/* Familiar Black Cat on Counter (When Unlocked or Preview) */}
        {catLevel > 0 && (
          <div className="hidden sm:flex items-center">
            <BlackCatSprite activePurr={catPurring} onClick={onPetCat} />
          </div>
        )}
      </div>

      {/* Center: Active Serving Tray & Smart Assist Status */}
      <div className="hidden lg:flex items-center gap-3 bg-[#171126]/90 border-2 border-[#4A3869] rounded-xl px-3.5 py-1.5 shadow-inner">
        {selectedCandyDef ? (
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#2E2344] border border-[#FFB347] flex items-center justify-center">
              <CandySprite candyId={selectedCandyDef.id} className="w-6 h-6" />
            </div>
            <div className="text-xs">
              <div className="font-bold text-[#FFD166] flex items-center gap-1">
                <span>Plateau : {selectedCandyDef.name}</span>
              </div>
              <div className="text-[11px] text-[#C4B5D6]">
                Cliquez sur un client pour lui servir ce bonbon
              </div>
            </div>
            <button
              type="button"
              onClick={onClearSelectedCandy}
              className="ml-1 px-2 py-0.5 rounded bg-[#2E2344] hover:bg-[#3F305C] text-[10px] text-[#C4B5D6] cursor-pointer"
            >
              Poser
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-xs text-[#C4B5D6]">
            <Sparkles className="w-4 h-4 text-[#FFB347] shrink-0" />
            <span>
              <strong className="text-[#FFF8E7]">Service Rapide :</strong> Cliquez sur un{' '}
              <span className="text-[#FFB347] font-semibold">Bocal [1-6]</span> ou sur la{' '}
              <span className="text-[#4EE29A] font-semibold">Bulle d’un client</span> pour servir !
            </span>
          </div>
        )}
      </div>

      {/* Right: Shopkeeper Cozy Actions (Soothing Tea & Customer Bell) */}
      <div className="flex items-center gap-2">
        {/* Soothing Chamomile Tea */}
        <button
          type="button"
          disabled={teaCooldown > 0 || !hasWaitingCustomers}
          onClick={onUseSoothingTea}
          title="Servir une Tisane de Camomille : Redonne +35% de patience à tous les monstres présents !"
          className={`pixel-btn rounded-xl px-2.5 md:px-3 py-1.5 flex items-center gap-2 text-xs font-bold cursor-pointer ${
            teaCooldown === 0 && hasWaitingCustomers
              ? 'bg-[#213B34] border-[#4EE29A] text-[#4EE29A]'
              : 'bg-[#1B1429] border-[#3A2C52] text-[#C4B5D6]/50 opacity-70 cursor-not-allowed'
          }`}
        >
          <Coffee className="w-4 h-4 shrink-0" />
          <div className="text-left leading-tight">
            <div className="hidden sm:block">Tisane Douce</div>
            <div className="font-mono-num text-[10px]">
              {teaCooldown > 0 ? `${Math.ceil(teaCooldown)}s` : '+35% Patience'}
            </div>
          </div>
        </button>

        {/* Customer Welcome Bell */}
        <button
          type="button"
          disabled={!hasEmptyCustomerSlot}
          onClick={onRingCustomerBell}
          title="Sonner la Clochette d'Appel : Fait venir un client immédiatement (+5 🪙 bonus d'accueil !)"
          className={`pixel-btn rounded-xl px-2.5 md:px-3 py-1.5 flex items-center gap-2 text-xs font-bold cursor-pointer ${
            hasEmptyCustomerSlot
              ? 'bg-[#3A2859] border-[#FFB347] text-[#FFD166]'
              : 'bg-[#1B1429] border-[#3A2C52] text-[#C4B5D6]/50 opacity-60 cursor-not-allowed'
          }`}
        >
          <Bell className={`w-4 h-4 shrink-0 ${hasEmptyCustomerSlot ? 'animate-bounce' : ''}`} />
          <div className="text-left leading-tight">
            <div className="hidden sm:block">Appeler Client</div>
            <div className="font-mono-num text-[10px] text-[#4EE29A]">+5 🪙 Bonus</div>
          </div>
        </button>
      </div>
    </div>
  );
};
