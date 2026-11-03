import React from 'react';
import { CandyId, MonsterId } from '../types/game';

export const MoonShardIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none">
    <path
      d="M15.5 3C10.5 3 6.5 7 6.5 12C6.5 17 10.5 21 15.5 21C17.4 21 19.1 20.4 20.5 19.4C16.8 18.9 14 15.8 14 12C14 8.2 16.8 5.1 20.5 4.6C19.1 3.6 17.4 3 15.5 3Z"
      fill="#FFD166"
      stroke="#4A3869"
      strokeWidth="1.8"
    />
    <path
      d="M12.5 6.5C10.2 8 9 10 9 12.5"
      stroke="#FFF8E7"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    <circle cx="19" cy="6" r="1.5" fill="#FFF8E7" />
    <circle cx="5" cy="8" r="1" fill="#FFB347" />
  </svg>
);

export const CandySprite: React.FC<{ candyId: CandyId; className?: string }> = ({
  candyId,
  className = 'w-9 h-9',
}) => {
  switch (candyId) {
    case 'spectral_lollipop':
      return (
        <svg viewBox="0 0 32 32" className={className} style={{ shapeRendering: 'geometricPrecision' }}>
          {/* Stick */}
          <rect x="14.5" y="19" width="3" height="11" rx="1.2" fill="#FFF8E7" stroke="#36244F" strokeWidth="1.5" />
          {/* Candy disc */}
          <circle cx="16" cy="12" r="9.5" fill="#4EE29A" stroke="#231636" strokeWidth="2" />
          {/* Swirl */}
          <path
            d="M16 12C16 9.5 18.5 9.5 18.5 12C18.5 15 13 15.5 13 11.5C13 7.5 20.5 7 21 12.5C21.3 16 17.5 18.5 14 17.5"
            fill="none"
            stroke="#DCFFF0"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          {/* Shine */}
          <circle cx="11.5" cy="7.5" r="1.6" fill="#FFFFFF" />
        </svg>
      );

    case 'gummy_eyeball':
      return (
        <svg viewBox="0 0 32 32" className={className}>
          {/* Outer Gummy Aura */}
          <circle cx="16" cy="16" r="11" fill="#FFE6EE" stroke="#231636" strokeWidth="2" />
          {/* Red Gummy Veins */}
          <path d="M7 13L10 14M25 12L22 14M8 20L11 18" stroke="#FF5263" strokeWidth="1.6" strokeLinecap="round" />
          {/* Iris */}
          <circle cx="16" cy="16" r="6.2" fill="#9D65FF" stroke="#231636" strokeWidth="1.6" />
          <circle cx="16" cy="16" r="3.2" fill="#1E1333" />
          {/* Glossy highlights */}
          <circle cx="13.8" cy="13.5" r="2" fill="#FFFFFF" />
          <circle cx="18.2" cy="18" r="1" fill="#FFD1E8" />
        </svg>
      );

    case 'pumpkin_caramel':
      return (
        <svg viewBox="0 0 32 32" className={className}>
          {/* Stem */}
          <path d="M14.5 5C14.5 3.5 17 3 18 5.5L17 9H15L14.5 5Z" fill="#4EE29A" stroke="#231636" strokeWidth="1.6" />
          {/* Left & Right lobes */}
          <ellipse cx="11" cy="17.5" rx="6.5" ry="8.5" fill="#E87A1E" stroke="#231636" strokeWidth="2" />
          <ellipse cx="21" cy="17.5" rx="6.5" ry="8.5" fill="#E87A1E" stroke="#231636" strokeWidth="2" />
          {/* Center lobe */}
          <ellipse cx="16" cy="18" rx="6" ry="9" fill="#FF9E2C" stroke="#231636" strokeWidth="2" />
          {/* Caramel drip */}
          <path
            d="M10 12C12 14 14 11 16 13.5C18 11 20 14 22 12"
            fill="none"
            stroke="#FFE5A3"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <circle cx="13.5" cy="15" r="1.4" fill="#FFF8E7" />
        </svg>
      );

    case 'bone_crunch':
      return (
        <svg viewBox="0 0 32 32" className={className}>
          <g transform="rotate(-28 16 16)">
            <circle cx="7.5" cy="13" r="4" fill="#FFF8E7" stroke="#231636" strokeWidth="2" />
            <circle cx="7.5" cy="19" r="4" fill="#FFF8E7" stroke="#231636" strokeWidth="2" />
            <circle cx="24.5" cy="13" r="4" fill="#FFF8E7" stroke="#231636" strokeWidth="2" />
            <circle cx="24.5" cy="19" r="4" fill="#FFF8E7" stroke="#231636" strokeWidth="2" />
            <rect x="7.5" y="12.5" width="17" height="7" fill="#FFF8E7" />
            <line x1="8.5" y1="12.5" x2="23.5" y2="12.5" stroke="#231636" strokeWidth="2" />
            <line x1="8.5" y1="19.5" x2="23.5" y2="19.5" stroke="#231636" strokeWidth="2" />
            {/* Sugar sparkles */}
            <circle cx="13" cy="15.5" r="1.1" fill="#FFB347" />
            <circle cx="18.5" cy="16.5" r="1.1" fill="#9D65FF" />
          </g>
        </svg>
      );

    case 'bat_licorice':
      return (
        <svg viewBox="0 0 32 32" className={className}>
          {/* Wings */}
          <path
            d="M3 15C5 10 9 10 12 13L13.5 9L15 11.5H17L18.5 9L20 13C23 10 27 10 29 15C26 16 24 18 23 20C20.5 18.5 18.5 19.5 16 22C13.5 19.5 11.5 18.5 9 20C8 18 6 16 3 15Z"
            fill="#6C3CE9"
            stroke="#231636"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {/* Body */}
          <circle cx="16" cy="16" r="5" fill="#9D65FF" stroke="#231636" strokeWidth="1.6" />
          {/* Cute eyes */}
          <circle cx="14.3" cy="15.2" r="1.2" fill="#FFD166" />
          <circle cx="17.7" cy="15.2" r="1.2" fill="#FFD166" />
          {/* Little fangs */}
          <path d="M14.8 17.6L15.3 19M17.2 17.6L16.7 19" stroke="#FFF8E7" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      );

    case 'midnight_star':
      return (
        <svg viewBox="0 0 32 32" className={className}>
          <polygon
            points="16,3 19.8,10.8 28.4,12 22.2,18.1 23.6,26.6 16,22.5 8.4,26.6 9.8,18.1 3.6,12 12.2,10.8"
            fill="#FFD166"
            stroke="#231636"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <polygon
            points="16,7 18.4,12.1 23.8,12.8 19.9,16.6 20.8,22 16,19.4 11.2,22 12.1,16.6 8.2,12.8 13.6,12.1"
            fill="#FFF3B0"
          />
          <circle cx="14" cy="13" r="1.5" fill="#FFFFFF" />
        </svg>
      );
  }
};

export const ApothecaryJarSprite: React.FC<{
  candyId: CandyId;
  stock: number;
  maxStock: number;
  unlocked: boolean;
  colorPrimary: string;
}> = ({ candyId, stock, maxStock, unlocked, colorPrimary }) => {
  const fillPct = unlocked ? Math.max(0, Math.min(1, stock / Math.max(1, maxStock))) : 0;

  return (
    <div className="relative w-16 h-20 flex items-center justify-center select-none">
      {/* Glow behind jar */}
      {unlocked && stock > 0 && (
        <div
          className="absolute inset-1 rounded-full blur-md opacity-35 pointer-events-none transition-opacity"
          style={{ backgroundColor: colorPrimary }}
        />
      )}
      <svg viewBox="0 0 64 80" className="w-full h-full drop-shadow-[0_4px_0_rgba(11,8,20,0.85)]">
        {/* Cork Stopper */}
        <rect x="21" y="4" width="22" height="9" rx="2.5" fill="#C88A52" stroke="#231636" strokeWidth="2.5" />
        <line x1="25" y1="7" x2="29" y2="7" stroke="#8F5B2D" strokeWidth="2" strokeLinecap="round" />
        {/* Jar Neck */}
        <rect x="17" y="11" width="30" height="6" rx="2" fill="#3B2B54" stroke="#231636" strokeWidth="2.5" />
        {/* Jar Body */}
        <rect
          x="10"
          y="17"
          width="44"
          height="57"
          rx="10"
          fill="#1D152E"
          stroke="#4A3869"
          strokeWidth="3"
        />
        {/* Dynamic Candy Fill Level inside Jar */}
        {unlocked && fillPct > 0 && (
          <clipPath id={`jar-clip-${candyId}`}>
            <rect x="13" y="20" width="38" height="51" rx="7" />
          </clipPath>
        )}
        {unlocked && fillPct > 0 && (
          <g clipPath={`url(#jar-clip-${candyId})`}>
            <rect
              x="12"
              y={20 + 51 * (1 - fillPct)}
              width="40"
              height={52 * fillPct + 4}
              fill={colorPrimary}
              fillOpacity="0.32"
            />
            <line
              x1="12"
              y1={20 + 51 * (1 - fillPct)}
              x2="52"
              y2={20 + 51 * (1 - fillPct)}
              stroke={colorPrimary}
              strokeWidth="2"
              strokeOpacity="0.75"
            />
          </g>
        )}
        {/* Glass Highlight Reflections */}
        <path
          d="M15 24V62"
          stroke="#FFF8E7"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeOpacity="0.28"
        />
        <path
          d="M49 26V42"
          stroke="#FFF8E7"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeOpacity="0.16"
        />
      </svg>

      {/* Center Candy Emblem inside the jar */}
      <div className="absolute inset-0 flex items-center justify-center pt-3 pointer-events-none">
        {unlocked ? (
          <div className={`transition-transform duration-200 ${stock === 0 ? 'opacity-30 grayscale scale-90' : 'scale-105'}`}>
            <CandySprite candyId={candyId} className="w-9 h-9 drop-shadow" />
          </div>
        ) : (
          <span className="text-xl text-[#C4B5D6]/60 font-display-pixel">🔒</span>
        )}
      </div>
    </div>
  );
};

export const MonsterSprite: React.FC<{
  monsterId: MonsterId;
  patience: number;
  status: 'waiting' | 'happy_leaving' | 'angry_leaving';
}> = ({ monsterId, patience, status }) => {
  const isHappy = status === 'happy_leaving';
  const isFuming = patience < 30 || status === 'angry_leaving';
  const isImpatient = patience >= 30 && patience < 60;

  const renderEyes = (eyeY = 44, leftX = 33, rightX = 47, color = '#1F1830') => {
    if (isHappy) {
      return (
        <g stroke={color} strokeWidth="2.6" fill="none" strokeLinecap="round">
          <path d={`M${leftX - 3.5} ${eyeY} Q${leftX} ${eyeY - 4.5} ${leftX + 3.5} ${eyeY}`} />
          <path d={`M${rightX - 3.5} ${eyeY} Q${rightX} ${eyeY - 4.5} ${rightX + 3.5} ${eyeY}`} />
        </g>
      );
    }
    if (isFuming) {
      return (
        <g>
          <circle cx={leftX} cy={eyeY} r="2.8" fill={color} />
          <circle cx={rightX} cy={eyeY} r="2.8" fill={color} />
          <line x1={leftX - 4} y1={eyeY - 5} x2={leftX + 3} y2={eyeY - 2.5} stroke="#FF5263" strokeWidth="2.4" strokeLinecap="round" />
          <line x1={rightX + 4} y1={eyeY - 5} x2={rightX - 3} y2={eyeY - 2.5} stroke="#FF5263" strokeWidth="2.4" strokeLinecap="round" />
        </g>
      );
    }
    return (
      <g>
        <circle cx={leftX} cy={eyeY} r="3" fill={color} />
        <circle cx={rightX} cy={eyeY} r="3" fill={color} />
        <circle cx={leftX - 1} cy={eyeY - 1} r="1.1" fill="#FFFFFF" />
        <circle cx={rightX - 1} cy={eyeY - 1} r="1.1" fill="#FFFFFF" />
        {isImpatient && (
          <>
            <line x1={leftX - 3.5} y1={eyeY - 4.5} x2={leftX + 3} y2={eyeY - 4} stroke={color} strokeWidth="1.8" strokeLinecap="round" />
            <line x1={rightX - 3} y1={eyeY - 4} x2={rightX + 3.5} y2={eyeY - 4.5} stroke={color} strokeWidth="1.8" strokeLinecap="round" />
          </>
        )}
      </g>
    );
  };

  return (
    <div
      className={`relative w-28 h-28 md:w-32 md:h-32 flex items-end justify-center select-none ${
        isHappy
          ? 'animate-monster-happy'
          : isFuming
          ? 'animate-monster-impatient'
          : monsterId === 'ghost'
          ? 'animate-ghost-float'
          : 'animate-monster-idle'
      }`}
    >
      {/* Happy Sparkles / Hearts */}
      {isHappy && (
        <div className="absolute -top-3 inset-x-0 flex justify-center gap-3 pointer-events-none z-20">
          <span className="text-lg animate-bounce">💖</span>
          <span className="text-lg animate-pulse">✨</span>
        </div>
      )}

      {/* Fuming Steam Puff */}
      {isFuming && !isHappy && (
        <div className="absolute -top-2 right-2 text-base animate-bounce pointer-events-none z-20">
          💢
        </div>
      )}

      {monsterId === 'witch' && (
        <svg viewBox="0 0 80 84" className="w-full h-full drop-shadow-[0_6px_0_rgba(11,8,20,0.8)]">
          {/* Cloak */}
          <path d="M20 82L26 56H54L60 82H20Z" fill="#432874" stroke="#1B112C" strokeWidth="3" />
          {/* Hair */}
          <path d="M21 40C17 48 18 58 24 62M59 40C63 48 62 58 56 62" stroke="#FF9E2C" strokeWidth="6" strokeLinecap="round" />
          {/* Head */}
          <rect x="25" y="31" width="30" height="26" rx="11" fill="#FDE2C8" stroke="#1B112C" strokeWidth="2.8" />
          {/* Blush */}
          <ellipse cx="30" cy="48" rx="3" ry="1.8" fill="#FF758F" opacity="0.65" />
          <ellipse cx="50" cy="48" rx="3" ry="1.8" fill="#FF758F" opacity="0.65" />
          {renderEyes(44, 33, 47)}
          {/* Round Glasses */}
          <circle cx="33" cy="44" r="5.5" fill="none" stroke="#FFD166" strokeWidth="1.8" />
          <circle cx="47" cy="44" r="5.5" fill="none" stroke="#FFD166" strokeWidth="1.8" />
          <line x1="38.5" y1="44" x2="41.5" y2="44" stroke="#FFD166" strokeWidth="1.8" />
          {/* Mouth */}
          {isHappy ? (
            <path d="M36 51Q40 55 44 51" fill="none" stroke="#1B112C" strokeWidth="2.2" strokeLinecap="round" />
          ) : isFuming ? (
            <path d="M36 53Q40 50 44 53" fill="none" stroke="#1B112C" strokeWidth="2.2" strokeLinecap="round" />
          ) : (
            <path d="M37 51.5Q40 53.5 43 51.5" fill="none" stroke="#1B112C" strokeWidth="2" strokeLinecap="round" />
          )}
          {/* Witch Hat */}
          <path d="M10 33Q40 27 70 33L56 26L46 4L35 12L25 26L10 33Z" fill="#2E1C4E" stroke="#1B112C" strokeWidth="2.8" strokeLinejoin="round" />
          {/* Hat Ribbon & Buckle */}
          <path d="M24 27Q40 24 56 27" stroke="#9D65FF" strokeWidth="4" strokeLinecap="round" />
          <rect x="37" y="23" width="6" height="6" rx="1" fill="#FFD166" stroke="#1B112C" strokeWidth="1.5" />
        </svg>
      )}

      {monsterId === 'skeleton' && (
        <svg viewBox="0 0 80 84" className="w-full h-full drop-shadow-[0_6px_0_rgba(11,8,20,0.8)]">
          {/* Suit Shoulders */}
          <path d="M22 82L27 58H53L58 82H22Z" fill="#261C38" stroke="#150E22" strokeWidth="3" />
          {/* Red Bowtie */}
          <polygon points="33,57 40,60 33,63" fill="#FF5263" stroke="#150E22" strokeWidth="1.5" />
          <polygon points="47,57 40,60 47,63" fill="#FF5263" stroke="#150E22" strokeWidth="1.5" />
          <circle cx="40" cy="60" r="2.2" fill="#FFD166" />
          {/* Skull */}
          <rect x="24" y="26" width="32" height="27" rx="12" fill="#FFF8E7" stroke="#1B112C" strokeWidth="2.8" />
          <rect x="31" y="48" width="18" height="9" rx="3" fill="#FFF8E7" stroke="#1B112C" strokeWidth="2.5" />
          {/* Eye Sockets */}
          <circle cx="33" cy="40" r="5" fill="#1F1830" />
          <circle cx="47" cy="40" r="5" fill="#1F1830" />
          {/* Glowing pupils */}
          <circle cx="33" cy="40" r={isHappy ? '2.5' : '1.8'} fill={isFuming ? '#FF5263' : '#4EE29A'} />
          <circle cx="47" cy="40" r={isHappy ? '2.5' : '1.8'} fill={isFuming ? '#FF5263' : '#4EE29A'} />
          {/* Nose */}
          <polygon points="40,43 38,47 42,47" fill="#1F1830" />
          {/* Teeth lines */}
          <line x1="35" y1="50" x2="35" y2="55" stroke="#1F1830" strokeWidth="2" />
          <line x1="40" y1="50" x2="40" y2="55" stroke="#1F1830" strokeWidth="2" />
          <line x1="45" y1="50" x2="45" y2="55" stroke="#1F1830" strokeWidth="2" />
          {/* Dandy Top Hat */}
          <rect x="19" y="24" width="42" height="5" rx="2.5" fill="#32234A" stroke="#150E22" strokeWidth="2.5" />
          <rect x="27" y="8" width="26" height="17" rx="2" fill="#32234A" stroke="#150E22" strokeWidth="2.5" />
          <rect x="27" y="20" width="26" height="4" fill="#FFB347" />
        </svg>
      )}

      {monsterId === 'ghost' && (
        <svg viewBox="0 0 80 84" className="w-full h-full drop-shadow-[0_6px_0_rgba(11,8,20,0.8)]">
          {/* Ghost Sheet Body */}
          <path
            d="M22 40C22 24 58 24 58 40V74C54 70 50 76 46 73C42 70 38 76 34 73C30 70 26 76 22 74V40Z"
            fill="#E2FBF7"
            stroke="#24193B"
            strokeWidth="2.8"
            strokeLinejoin="round"
          />
          {/* Inner Cyan Glow */}
          <ellipse cx="40" cy="42" rx="13" ry="15" fill="#72EFDD" opacity="0.28" />
          {/* Cute Blush */}
          <ellipse cx="29" cy="47" rx="3.5" ry="2" fill="#FF758F" opacity="0.7" />
          <ellipse cx="51" cy="47" rx="3.5" ry="2" fill="#FF758F" opacity="0.7" />
          {renderEyes(43, 33, 47)}
          {/* Mouth */}
          {isHappy ? (
            <path d="M36 49Q40 54 44 49" fill="none" stroke="#1F1830" strokeWidth="2.2" strokeLinecap="round" />
          ) : (
            <circle cx="40" cy="50" r="2.6" fill="#1F1830" />
          )}
          {/* Little floating lantern accessory on head */}
          <circle cx="40" cy="18" r="3.5" fill="#4EE29A" opacity="0.85" />
        </svg>
      )}

      {monsterId === 'pumpkin_spirit' && (
        <svg viewBox="0 0 80 84" className="w-full h-full drop-shadow-[0_6px_0_rgba(11,8,20,0.8)]">
          {/* Leafy Collar */}
          <path d="M22 82L28 60H52L58 82H22Z" fill="#2D6A4F" stroke="#150E22" strokeWidth="2.8" />
          {/* Pumpkin Head */}
          <ellipse cx="29" cy="45" rx="12" ry="16" fill="#E06D14" stroke="#1B112C" strokeWidth="2.8" />
          <ellipse cx="51" cy="45" rx="12" ry="16" fill="#E06D14" stroke="#1B112C" strokeWidth="2.8" />
          <ellipse cx="40" cy="45" rx="13" ry="17" fill="#FF9E2C" stroke="#1B112C" strokeWidth="2.8" />
          {/* Curly Stem */}
          <path d="M38 28C37 20 44 16 47 21" fill="none" stroke="#4EE29A" strokeWidth="4.5" strokeLinecap="round" />
          {/* Glowing Carved Eyes */}
          <polygon points="32,37 28,44 36,44" fill={isFuming ? '#FF5263' : '#FFF3B0'} stroke="#1B112C" strokeWidth="1.6" />
          <polygon points="48,37 44,44 52,44" fill={isFuming ? '#FF5263' : '#FFF3B0'} stroke="#1B112C" strokeWidth="1.6" />
          {/* Carved Smile */}
          <path
            d={isFuming ? 'M30 54L35 50L40 53L45 50L50 54' : 'M30 49L35 54L40 51L45 54L50 49'}
            fill="none"
            stroke="#FFF3B0"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}

      {monsterId === 'werewolf' && (
        <svg viewBox="0 0 80 84" className="w-full h-full drop-shadow-[0_6px_0_rgba(11,8,20,0.8)]">
          {/* Ears */}
          <polygon points="22,34 25,14 36,28" fill="#7F5539" stroke="#1B112C" strokeWidth="2.8" strokeLinejoin="round" />
          <polygon points="58,34 55,14 44,28" fill="#7F5539" stroke="#1B112C" strokeWidth="2.8" strokeLinejoin="round" />
          <polygon points="25,31 27,19 33,28" fill="#DDA15E" />
          <polygon points="55,31 53,19 47,28" fill="#DDA15E" />
          {/* Cozy Knit Scarf & Coat */}
          <path d="M20 82L25 56H55L60 82H20Z" fill="#582F0E" stroke="#1B112C" strokeWidth="2.8" />
          {/* Head */}
          <rect x="23" y="26" width="34" height="30" rx="12" fill="#9C6644" stroke="#1B112C" strokeWidth="2.8" />
          {/* Snout */}
          <ellipse cx="40" cy="48" rx="10" ry="7" fill="#E6CCB2" stroke="#1B112C" strokeWidth="2" />
          <ellipse cx="40" cy="45" rx="4" ry="2.6" fill="#231636" />
          {renderEyes(38, 31, 49, '#FFD166')}
          {/* Knit Scarf */}
          <rect x="22" y="54" width="36" height="9" rx="4" fill="#E63946" stroke="#1B112C" strokeWidth="2.5" />
          <rect x="44" y="58" width="8" height="16" rx="3" fill="#E63946" stroke="#1B112C" strokeWidth="2.2" />
        </svg>
      )}

      {monsterId === 'vampire' && (
        <svg viewBox="0 0 80 84" className="w-full h-full drop-shadow-[0_6px_0_rgba(11,8,20,0.8)]">
          {/* High Velvet Cape Collar */}
          <polygon points="15,56 26,30 54,30 65,56 58,82 22,82" fill="#9B1B30" stroke="#1B112C" strokeWidth="2.8" strokeLinejoin="round" />
          <path d="M24 82L28 56H52L56 82H24Z" fill="#1F1830" stroke="#1B112C" strokeWidth="2.8" />
          {/* Face */}
          <rect x="25" y="27" width="30" height="28" rx="12" fill="#EDE0F5" stroke="#1B112C" strokeWidth="2.8" />
          {/* Widow's Peak Hair */}
          <path d="M25 36C25 22 55 22 55 36C48 30 43 31 40 35C37 31 32 30 25 36Z" fill="#191229" stroke="#1B112C" strokeWidth="2" />
          {renderEyes(42, 33, 47, '#D90429')}
          {/* Monocle */}
          <circle cx="47" cy="42" r="5.5" fill="none" stroke="#FFD166" strokeWidth="1.8" />
          {/* Cute Fangs */}
          <line x1="35" y1="50" x2="45" y2="50" stroke="#1B112C" strokeWidth="2" strokeLinecap="round" />
          <polygon points="36,50 37.5,54 39,50" fill="#FFFFFF" />
          <polygon points="41,50 42.5,54 44,50" fill="#FFFFFF" />
        </svg>
      )}
    </div>
  );
};

export const BlackCatSprite: React.FC<{ activePurr?: boolean; onClick?: () => void }> = ({
  activePurr,
  onClick,
}) => (
  <button
    onClick={onClick}
    title="Caresser Réglisse le chat familier (Apaise les clients !)"
    className="group relative flex items-center justify-center cursor-pointer focus:outline-none transition-transform hover:scale-105 active:scale-95"
  >
    {activePurr && (
      <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-xs font-bold text-[#FFB347] animate-bounce whitespace-nowrap">
        Ronron~ ♪
      </span>
    )}
    <svg viewBox="0 0 64 56" className="w-14 h-12 drop-shadow-[0_3px_0_#0B0814]">
      {/* Tail */}
      <path
        d="M48 44C56 44 59 34 54 28"
        fill="none"
        stroke="#191326"
        strokeWidth="5"
        strokeLinecap="round"
      />
      {/* Body */}
      <ellipse cx="34" cy="40" rx="14" ry="11" fill="#191326" stroke="#4A3869" strokeWidth="2" />
      {/* Head */}
      <circle cx="26" cy="26" r="11" fill="#191326" stroke="#4A3869" strokeWidth="2" />
      {/* Ears */}
      <polygon points="16,21 17,10 24,17" fill="#191326" stroke="#4A3869" strokeWidth="2" />
      <polygon points="36,21 35,10 28,17" fill="#191326" stroke="#4A3869" strokeWidth="2" />
      {/* Eyes */}
      <circle cx="22" cy="26" r="2.4" fill="#4EE29A" />
      <circle cx="30" cy="26" r="2.4" fill="#4EE29A" />
      {/* Collar & Bell */}
      <path d="M18 34Q26 37 34 34" fill="none" stroke="#FF5263" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="26" cy="36" r="2.5" fill="#FFD166" />
    </svg>
  </button>
);
