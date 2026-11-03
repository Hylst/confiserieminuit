import React from 'react';
import {
  ActiveCustomer,
  CandyId,
  CandyJarState,
  FloatingText,
  FlyingCandy,
} from '../types/game';
import { CANDY_DEFINITIONS, MONSTER_DEFINITIONS } from '../data/gameData';
import { CandySprite, MonsterSprite } from './PixelSprites';
import { Check, Sparkles } from 'lucide-react';

interface CustomerStageProps {
  customers: (ActiveCustomer | null)[];
  selectedSlot: number | null;
  selectedCandy: CandyId | null;
  jars: Record<CandyId, CandyJarState>;
  lanternLevel: number;
  firefliesLevel: number;
  sugarRushActive: boolean;
  floatingTexts: FloatingText[];
  flyingCandies: FlyingCandy[];
  onSelectCustomerSlot: (slotIndex: number) => void;
  onDirectServeCandyToSlot: (slotIndex: number, candyId: CandyId) => void;
}

export const CustomerStage: React.FC<CustomerStageProps> = ({
  customers,
  selectedSlot,
  selectedCandy,
  jars,
  lanternLevel,
  firefliesLevel,
  sugarRushActive,
  floatingTexts,
  flyingCandies,
  onSelectCustomerSlot,
  onDirectServeCandyToSlot,
}) => {
  return (
    <section className="relative flex-1 min-h-0 w-full overflow-hidden flex flex-col justify-end select-none">
      {/* 1. Nocturnal Parallax Sky & Crooked Monster Town Silhouette */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#100B1C] via-[#1C1430] to-[#2C1E45] pointer-events-none">
        {/* Stars */}
        <div className="absolute inset-0 opacity-75">
          <div className="absolute top-[12%] left-[8%] w-1.5 h-1.5 rounded-full bg-[#FFF8E7] animate-pulse" />
          <div className="absolute top-[20%] left-[22%] w-1 h-1 rounded-full bg-[#FFD166]" />
          <div className="absolute top-[9%] left-[44%] w-1.5 h-1.5 rounded-full bg-[#FFF8E7] animate-ping" style={{ animationDuration: '4s' }} />
          <div className="absolute top-[16%] left-[67%] w-1 h-1 rounded-full bg-[#9D65FF]" />
          <div className="absolute top-[10%] left-[88%] w-1.5 h-1.5 rounded-full bg-[#FFF8E7]" />
          <div className="absolute top-[28%] left-[78%] w-1 h-1 rounded-full bg-[#FFD166] animate-pulse" />
        </div>

        {/* Crescent Moon */}
        <div className="absolute top-4 right-10 md:right-20 w-16 h-16 md:w-20 md:h-20 pointer-events-none">
          <div className="absolute inset-0 rounded-full bg-[#FFD166] opacity-20 blur-xl animate-lantern-pulse" />
          <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-[0_0_12px_rgba(255,209,102,0.5)]">
            <path
              d="M42 10C26 10 14 22 14 38C14 49 21 58 31 61C22 55 19 43 24 32C28 22 39 17 49 19C47 14 45 11 42 10Z"
              fill="#FFF3B0"
            />
          </svg>
        </div>

        {/* Distant Silhouetted Gothic-Cozy Village Roofs */}
        <svg
          viewBox="0 0 1200 220"
          preserveAspectRatio="none"
          className="absolute bottom-0 inset-x-0 w-full h-32 md:h-40 text-[#150F24] fill-current opacity-90"
        >
          <path d="M0,220 L0,130 L45,80 L90,130 L90,110 L140,55 L190,110 L230,110 L265,70 L300,110 L350,140 L900,140 L940,85 L985,135 L1035,60 L1090,130 L1145,85 L1200,130 L1200,220 Z" />
          {/* Warm lit village windows */}
          <rect x="132" y="95" width="8" height="12" rx="2" fill="#FFB347" opacity="0.6" />
          <rect x="145" y="95" width="8" height="12" rx="2" fill="#FFB347" opacity="0.6" />
          <rect x="1028" y="98" width="9" height="14" rx="2" fill="#FFD166" opacity="0.55" />
          <rect x="935" y="112" width="7" height="10" rx="2" fill="#9D65FF" opacity="0.6" />
        </svg>

        {/* Ambient Firefly Particles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute bottom-16 left-[15%] w-2 h-2 rounded-full bg-[#FFD166] shadow-[0_0_8px_#FFD166] animate-firefly" />
          <div
            className="absolute bottom-24 left-[48%] w-2 h-2 rounded-full bg-[#4EE29A] shadow-[0_0_8px_#4EE29A] animate-firefly"
            style={{ animationDelay: '1.5s' }}
          />
          <div
            className="absolute bottom-20 left-[82%] w-2 h-2 rounded-full bg-[#FFB347] shadow-[0_0_8px_#FFB347] animate-firefly"
            style={{ animationDelay: '2.8s' }}
          />
        </div>
      </div>

      {/* 2. Wooden Stall Frame Pillars & Top Awning */}
      <div className="absolute top-0 inset-x-0 z-10 pointer-events-none">
        {/* Striped Cozy Stall Awning */}
        <div className="w-full h-6 md:h-7 flex border-b-4 border-[#0E0918] shadow-lg">
          {Array.from({ length: 16 }).map((_, idx) => (
            <div
              key={idx}
              className={`flex-1 h-full ${
                idx % 2 === 0 ? 'bg-[#3A245B]' : 'bg-[#26173E]'
              } border-r border-[#1A102B]`}
            />
          ))}
        </div>

        {/* Astral Fireflies Garland (Visual Upgrade!) */}
        {firefliesLevel > 0 && (
          <div className="w-full flex justify-around px-8 -mt-1">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-0.5 h-2 bg-[#4A3869]" />
                <div
                  className={`w-3 h-3 rounded-full ${
                    i % 2 === 0 ? 'bg-[#FFD166] shadow-[0_0_10px_#FFD166]' : 'bg-[#9D65FF] shadow-[0_0_10px_#9D65FF]'
                  } animate-pulse`}
                  style={{ animationDelay: `${i * 0.25}s` }}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Left & Right Wooden Frame Posts */}
      <div className="absolute inset-y-0 left-0 w-3 md:w-6 bg-gradient-to-r from-[#261B38] to-[#1A1228] border-r-2 border-[#4A3869] z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-3 md:w-6 bg-gradient-to-l from-[#261B38] to-[#1A1228] border-l-2 border-[#4A3869] z-10 pointer-events-none" />

      {/* Hanging Pumpkin Lantern (Visual Upgrade or Base Warmth) */}
      <div className="absolute top-6 left-5 md:left-10 z-20 pointer-events-none animate-lantern-sway">
        {/* Radial Amber Light Pool */}
        <div
          className="absolute -inset-12 rounded-full blur-2xl animate-lantern-pulse"
          style={{
            background:
              lanternLevel > 0
                ? 'radial-gradient(circle, rgba(255,179,71,0.38) 0%, rgba(255,179,71,0) 70%)'
                : 'radial-gradient(circle, rgba(255,179,71,0.18) 0%, rgba(255,179,71,0) 70%)',
          }}
        />
        <div className="flex flex-col items-center">
          <div className="w-1 h-4 bg-[#4A3869]" />
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center border-2 ${
              lanternLevel > 0
                ? 'bg-[#FF9E2C] border-[#FFD166] shadow-[0_0_16px_#FFB347]'
                : 'bg-[#2E2344] border-[#FFB347] shadow-[0_0_10px_rgba(255,179,71,0.4)]'
            }`}
          >
            <span className="text-base">{lanternLevel > 0 ? '🎃' : '🏮'}</span>
          </div>
          {lanternLevel > 0 && (
            <span className="mt-0.5 px-1.5 py-0.2 rounded bg-[#150F24]/90 border border-[#FFB347]/50 text-[9px] font-mono-num text-[#FFD166]">
              Niv.{lanternLevel}
            </span>
          )}
        </div>
      </div>

      {/* Sugar Rush Banner */}
      {sugarRushActive && (
        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 px-4 py-1 rounded-full bg-gradient-to-r from-[#FF9E2C] via-[#FFD166] to-[#FF9E2C] text-[#1A112B] font-display-pixel text-xs md:text-sm font-extrabold border-2 border-[#FFF8E7] shadow-[0_0_20px_rgba(255,209,102,0.7)] animate-bounce">
          ✨ FERVEUR SUCRÉE ACTIVE  :  VALEUR DES BONBONS x1.5 ! ✨
        </div>
      )}

      {/* 3. Customer Queue Stage (3 Slots) */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 md:px-10 pt-8 pb-1 grid grid-cols-3 gap-2 md:gap-6 items-end h-full">
        {[0, 1, 2].map((slotIdx) => {
          const customer = customers[slotIdx];
          const isSelected = selectedSlot === slotIdx;

          if (!customer) {
            return (
              <div
                key={slotIdx}
                className="h-full flex flex-col items-center justify-end pb-4 opacity-45 pointer-events-none"
              >
                <div className="w-24 h-3 rounded-full bg-[#0E0918]/60 border border-[#4A3869]/30 mb-1" />
                <span className="text-[11px] text-[#C4B5D6]/60 font-medium">
                  En attente d’un client…
                </span>
              </div>
            );
          }

          const monsterDef = MONSTER_DEFINITIONS.find((m) => m.id === customer.monsterId)!;
          const patienceColor =
            customer.patience > 60
              ? '#4EE29A'
              : customer.patience >= 30
              ? '#FFAA33'
              : '#FF5263';

          // Check if currently selected candy in tray is needed by this customer
          const needsSelectedCandy =
            selectedCandy !== null &&
            customer.orders.some((o) => o.candyId === selectedCandy && !o.fulfilled);

          return (
            <div
              key={customer.uid}
              onClick={() => onSelectCustomerSlot(slotIdx)}
              className={`group relative flex flex-col items-center justify-end h-full pb-1 transition-all cursor-pointer ${
                customer.status === 'happy_leaving'
                  ? 'opacity-90 scale-105'
                  : customer.status === 'angry_leaving'
                  ? 'opacity-40 scale-90 -translate-y-2'
                  : ''
              }`}
            >
              {/* Target Selection Halo */}
              {isSelected && customer.status === 'waiting' && (
                <div className="absolute inset-x-3 bottom-1 top-4 rounded-2xl border-2 border-dashed border-[#FFB347]/70 bg-[#FFB347]/5 pointer-events-none" />
              )}

              {/* 1. Parchment Order Bubble above Monster */}
              {customer.status === 'waiting' && (
                <div
                  className={`relative z-20 mb-2 parchment-bubble rounded-2xl px-2.5 py-2 min-w-[116px] md:min-w-[152px] transition-transform ${
                    needsSelectedCandy
                      ? 'ring-3 ring-[#4EE29A] scale-105'
                      : isSelected
                      ? 'ring-2 ring-[#FFB347]'
                      : 'group-hover:-translate-y-0.5'
                  }`}
                >
                  {/* VIP Badge */}
                  {customer.isVip && (
                    <div className="absolute -top-2.5 -left-2 px-1.5 py-0.5 rounded-full bg-[#FFD166] border-2 border-[#231636] text-[#231636] text-[9px] font-extrabold uppercase tracking-wider flex items-center gap-0.5 shadow">
                      <Sparkles className="w-2.5 h-2.5" /> VIP x2
                    </div>
                  )}

                  {/* Requested Candies Row (1 to 3 items) */}
                  <div className="flex items-center justify-center gap-1.5 md:gap-2">
                    {customer.orders.map((orderItem, orderIdx) => {
                      const candyDef = CANDY_DEFINITIONS.find((c) => c.id === orderItem.candyId)!;
                      const jarState = jars[orderItem.candyId];
                      const canServeNow =
                        !orderItem.fulfilled && jarState?.unlocked && jarState?.stock > 0;

                      return (
                        <button
                          key={orderIdx}
                          type="button"
                          disabled={orderItem.fulfilled}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (!orderItem.fulfilled) {
                              onDirectServeCandyToSlot(slotIdx, orderItem.candyId);
                            }
                          }}
                          title={
                            orderItem.fulfilled
                              ? `${candyDef.name} (Servi !)`
                              : canServeNow
                              ? `Cliquer pour servir : ${candyDef.name} [Touche ${candyDef.shortcutKey}]`
                              : `${candyDef.name}  :  Stock épuisé ! Rechargez le bocal [${candyDef.shortcutKey}]`
                          }
                          className={`relative w-10 h-10 md:w-11 md:h-11 rounded-xl border-2 flex items-center justify-center transition-all ${
                            orderItem.fulfilled
                              ? 'bg-[#4EE29A]/25 border-[#2D6A4F] scale-90 opacity-75'
                              : canServeNow
                              ? 'bg-[#FFFDF9] border-[#4A3869] hover:border-[#7E4AE8] hover:scale-110 active:scale-95 shadow-[0_2px_0_#231636] cursor-pointer'
                              : 'bg-[#F2E5D5] border-[#B56576] opacity-75 cursor-not-allowed'
                          }`}
                        >
                          <CandySprite candyId={orderItem.candyId} className="w-7 h-7 md:w-8 md:h-8" />

                          {/* Shortcut key hint */}
                          {!orderItem.fulfilled && (
                            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded bg-[#231636] text-[#FFF8E7] font-mono-num text-[9px] font-bold flex items-center justify-center">
                              {candyDef.shortcutKey}
                            </span>
                          )}

                          {/* Fulfilled Checkmark */}
                          {orderItem.fulfilled && (
                            <span className="absolute inset-0 rounded-xl bg-[#4EE29A]/40 flex items-center justify-center">
                              <Check className="w-5 h-5 text-[#143625] stroke-[3]" />
                            </span>
                          )}

                          {/* Empty stock warning dot */}
                          {!orderItem.fulfilled && !canServeNow && (
                            <span className="absolute -bottom-1 inset-x-1 rounded bg-[#FF5263] text-[#FFF8E7] text-[8px] font-bold uppercase leading-tight text-center">
                              Vide
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Patience Progress Bar inside the bottom of the bubble */}
                  <div className="mt-2 w-full h-2 bg-[#D8C6A8] rounded-full overflow-hidden border border-[#4A3869]/40">
                    <div
                      className="h-full transition-all duration-200 rounded-full"
                      style={{
                        width: `${Math.max(0, Math.min(100, customer.patience))}%`,
                        backgroundColor: patienceColor,
                      }}
                    />
                  </div>

                  {/* Speech Bubble Pointer Triangle */}
                  <div className=" -bottom-2 left-1/2 -translate-x-1/2 absolute w-3.5 h-3.5 rotate-45 bg-[#F4E6C8] border-r-2 border-b-2 border-[#4A3869]" />
                </div>
              )}

              {/* 2. Monster Character Sprite */}
              <div className="relative flex flex-col items-center">
                <MonsterSprite
                  monsterId={customer.monsterId}
                  patience={customer.patience}
                  status={customer.status}
                />

                {/* Monster Name Tag & Micro-Dialogue */}
                <div className="mt-0.5 flex flex-col items-center text-center max-w-[180px] md:max-w-[220px]">
                  <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#150F24]/95 border border-[#4A3869] shadow">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: monsterDef.accentColor }}
                    />
                    <span className="text-xs font-bold text-[#FFF8E7]">{monsterDef.name}</span>
                    <span className="text-[10px] text-[#C4B5D6] hidden sm:inline">
                      • {monsterDef.title}
                    </span>
                  </div>

                  <p className="mt-0.5 text-[11px] text-[#FFF8E7]/90 italic line-clamp-1 px-2 py-0.5 rounded bg-[#120E1E]/75">
                    {customer.currentQuote}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. Flying Candy Projectiles */}
      {flyingCandies.map((fc) => {
        const leftPct = 18 + fc.toSlotIndex * 32;
        return (
          <div
            key={fc.id}
            className="pointer-events-none absolute z-30 transition-all duration-300 animate-bounce"
            style={{
              left: `${leftPct}%`,
              bottom: '28%',
            }}
          >
            <CandySprite candyId={fc.candyId} className="w-10 h-10 drop-shadow-[0_0_10px_#FFF8E7]" />
          </div>
        );
      })}

      {/* 5. Floating Score / Coin Feedback Particles */}
      <div className="pointer-events-none absolute inset-0 z-40 overflow-hidden">
        {floatingTexts.map((ft) => (
          <div
            key={ft.id}
            className="absolute animate-float-up flex flex-col items-center"
            style={{ left: `${ft.x}%`, top: `${ft.y}%` }}
          >
            <span
              className="font-mono-num text-sm md:text-base font-extrabold px-2 py-0.5 rounded-lg bg-[#150F24]/90 border border-[#4A3869] shadow-lg whitespace-nowrap"
              style={{ color: ft.color }}
            >
              {ft.text}
            </span>
            {ft.subtext && (
              <span className="text-[11px] font-bold text-[#FFF8E7] bg-[#120E1E]/80 px-1.5 rounded mt-0.5">
                {ft.subtext}
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
