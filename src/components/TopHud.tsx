import React from 'react';
import { BookOpen, Sparkles, Volume2, VolumeX, Music, Pause, Play, HeartHandshake, Flame } from 'lucide-react';
import { MoonShardIcon } from './PixelSprites';

interface TopHudProps {
  nightNumber: number;
  nightProgress: number; // 0 to 100
  shards: number;
  passiveShardsPerSec: number;
  reputation: number;
  combo: number;
  sugarRushActive: boolean;
  cozyZenMode: boolean;
  isPaused: boolean;
  soundEnabled: boolean;
  musicEnabled: boolean;
  affordableUpgradesCount: number;
  onToggleZenMode: () => void;
  onTogglePause: () => void;
  onToggleSound: () => void;
  onToggleMusic: () => void;
  onOpenGrimoire: (tab?: 'upgrades' | 'bestiary') => void;
}

export const TopHud: React.FC<TopHudProps> = ({
  nightNumber,
  nightProgress,
  shards,
  passiveShardsPerSec,
  reputation,
  combo,
  sugarRushActive,
  cozyZenMode,
  isPaused,
  soundEnabled,
  musicEnabled,
  affordableUpgradesCount,
  onToggleZenMode,
  onTogglePause,
  onToggleSound,
  onToggleMusic,
  onOpenGrimoire,
}) => {
  // Convert 0..100 progress into 22h00 -> 04h00 (6 hours = 360 mins)
  const totalMinutes = Math.floor((nightProgress / 100) * 360);
  const hour24 = (22 + Math.floor(totalMinutes / 60)) % 24;
  const mins = Math.floor((totalMinutes % 60) / 5) * 5;
  const formattedTime = `${hour24.toString().padStart(2, '0')}h${mins.toString().padStart(2, '0')}`;

  return (
    <header className="relative z-30 h-14 px-3 md:px-5 wood-panel border-t-0 border-x-0 flex items-center justify-between gap-2 select-none">
      {/* Left: Shop Brand & Lunar Clock */}
      <div className="flex items-center gap-2.5 md:gap-4">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-[#2E2344] border-2 border-[#FFB347] flex items-center justify-center shadow-[0_2px_0_#0B0814]">
            <span className="text-lg">🍬</span>
          </div>
          <div className="hidden sm:block">
            <h1 className="font-display-pixel text-base md:text-lg leading-tight text-[#FFF8E7] tracking-wide">
              Confiserie de Minuit
            </h1>
            <p className="text-[11px] text-[#C4B5D6] leading-none">
              Échoppe Sucrée des Monstres
            </p>
          </div>
        </div>

        {/* Lunar Clock Pill */}
        <div className="flex items-center gap-2 bg-[#150F24] border-2 border-[#4A3869] rounded-lg px-2.5 py-1 shadow-inner">
          <span className="text-sm" title="Phase de la Nuit">🌙</span>
          <div className="flex flex-col">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#FFB347]">
                Nuit {nightNumber}
              </span>
              <span className="font-mono-num text-xs font-bold text-[#FFF8E7]">
                {formattedTime}
              </span>
            </div>
            <div className="w-20 md:w-28 h-1.5 bg-[#2A1F3D] rounded-full overflow-hidden mt-0.5">
              <div
                className="h-full bg-gradient-to-r from-[#9D65FF] via-[#FFB347] to-[#FFD166] transition-all duration-300"
                style={{ width: `${Math.min(100, nightProgress)}%` }}
              />
            </div>
          </div>
          <button
            onClick={onTogglePause}
            title={isPaused ? 'Reprendre la nuit' : 'Mettre en pause'}
            className="ml-1 p-1 rounded hover:bg-[#2E2344] text-[#C4B5D6] hover:text-[#FFF8E7] transition-colors cursor-pointer"
          >
            {isPaused ? <Play className="w-3.5 h-3.5 text-[#4EE29A]" /> : <Pause className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Center: Currency, Combo & Reputation */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Moon Shards Counter */}
        <div
          className={`flex items-center gap-2 bg-[#150F24] border-2 ${
            sugarRushActive ? 'border-[#FFD166] shadow-[0_0_12px_rgba(255,209,102,0.45)]' : 'border-[#4A3869]'
          } rounded-lg px-3 py-1 transition-all`}
        >
          <MoonShardIcon className="w-5 h-5 shrink-0" />
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-mono-num text-sm md:text-base font-bold text-[#FFD166]">
                {Math.floor(shards).toLocaleString('fr-FR')}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-[#C4B5D6] hidden md:inline">
                Éclats
              </span>
            </div>
            {passiveShardsPerSec > 0 && (
              <div className="font-mono-num text-[10px] text-[#4EE29A] leading-none">
                +{passiveShardsPerSec}/s auto
              </div>
            )}
          </div>
        </div>

        {/* Service Combo Multiplier */}
        <div
          className={`hidden md:flex items-center gap-1.5 bg-[#150F24] border-2 ${
            combo >= 3 ? 'border-[#FFB347] text-[#FFB347]' : 'border-[#4A3869] text-[#C4B5D6]'
          } rounded-lg px-2.5 py-1`}
          title="Combo de service rapide : augmente les pourboires !"
        >
          <Flame className={`w-4 h-4 ${combo >= 2 ? 'text-[#FF9E2C] animate-pulse' : 'text-[#C4B5D6]'}`} />
          <div className="leading-tight">
            <div className="text-[10px] uppercase tracking-wider text-[#C4B5D6]">Combo</div>
            <div className="font-mono-num text-xs font-bold text-[#FFF8E7]">
              x{(1 + Math.min(combo, 10) * 0.15).toFixed(2)}
            </div>
          </div>
        </div>

        {/* Reputation / Satisfaction */}
        <div
          className="hidden lg:flex items-center gap-1.5 bg-[#150F24] border-2 border-[#4A3869] rounded-lg px-2.5 py-1"
          title="Réputation Nocturne de la boutique"
        >
          <Sparkles className="w-4 h-4 text-[#9D65FF]" />
          <div className="leading-tight">
            <div className="text-[10px] uppercase tracking-wider text-[#C4B5D6]">Réputation</div>
            <div className="font-mono-num text-xs font-bold text-[#FFF8E7]">{reputation} ★</div>
          </div>
        </div>
      </div>

      {/* Right: Cozy Zen Toggle, Audio, Bestiary & Grimoire Drawer Button */}
      <div className="flex items-center gap-1.5 md:gap-2">
        <button
          onClick={onToggleZenMode}
          title={
            cozyZenMode
              ? 'Mode Cosy Zen Actif : Les monstres sont très patients (-55% stress)'
              : 'Activer le Mode Cosy Zen pour jouer sans pression'
          }
          className={`pixel-btn px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer ${
            cozyZenMode
              ? 'bg-[#254238] border-[#4EE29A] text-[#4EE29A]'
              : 'bg-[#261C38] text-[#C4B5D6] hover:text-[#FFF8E7]'
          }`}
        >
          <HeartHandshake className="w-3.5 h-3.5" />
          <span className="hidden xl:inline">{cozyZenMode ? 'Mode Zen Actif' : 'Mode Classique'}</span>
        </button>

        <button
          onClick={onToggleMusic}
          title={musicEnabled ? 'Couper la boîte à musique nocturne' : 'Activer la boîte à musique nocturne'}
          className={`pixel-btn p-1.5 rounded-lg cursor-pointer ${
            musicEnabled ? 'bg-[#3D2963] text-[#FFB347] border-[#FFB347]' : 'bg-[#261C38] text-[#C4B5D6]'
          }`}
        >
          <Music className="w-4 h-4" />
        </button>

        <button
          onClick={onToggleSound}
          title={soundEnabled ? 'Couper les effets sonores' : 'Activer les effets sonores'}
          className="pixel-btn p-1.5 rounded-lg bg-[#261C38] text-[#C4B5D6] hover:text-[#FFF8E7] cursor-pointer"
        >
          {soundEnabled ? <Volume2 className="w-4 h-4 text-[#4EE29A]" /> : <VolumeX className="w-4 h-4 text-[#FF5263]" />}
        </button>

        <button
          onClick={() => onOpenGrimoire('bestiary')}
          title="Carnet des Clients Monstres"
          className="pixel-btn px-2.5 py-1.5 rounded-lg bg-[#261C38] text-[#FFF8E7] text-xs font-bold flex items-center gap-1.5 cursor-pointer"
        >
          <span>🎃</span>
          <span className="hidden md:inline">Clients</span>
        </button>

        <button
          onClick={() => onOpenGrimoire('upgrades')}
          className="relative pixel-btn px-3 py-1.5 rounded-lg bg-gradient-to-b from-[#7E4AE8] to-[#5B2EC2] border-[#B48CFF] text-[#FFF8E7] text-xs md:text-sm font-bold flex items-center gap-1.5 cursor-pointer"
        >
          <BookOpen className="w-4 h-4 text-[#FFD166]" />
          <span>Grimoire</span>
          {affordableUpgradesCount > 0 && (
            <span className=" -top-1.5 -right-1.5 absolute min-w-5 h-5 px-1 rounded-full bg-[#4EE29A] text-[#120E1E] font-mono-num text-[11px] font-extrabold flex items-center justify-center border-2 border-[#120E1E] animate-bounce">
              {affordableUpgradesCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
