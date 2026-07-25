import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, CheckCircle2 } from 'lucide-react';

interface WalkingCharacterProps {
  isWalking?: boolean;
  percentage: number;
  currentStageName: string;
}

// Paletas de tom de pele/cabelo disponíveis para sorteio aleatório
const SKIN_PALETTES = {
  negro: {
    headShadow: '#4a2c1a',
    hairBase: '#1c1917',
    hairTop: '#0c0a09',
    face: '#8d5524',
    mouth: '#5c3a1e',
  },
  branco: {
    headShadow: '#f87171',
    hairBase: '#fde047',
    hairTop: '#ca8a04',
    face: '#fed7aa',
    mouth: '#9a3412',
  },
};

// Sorteia uma paleta aleatoriamente (executado apenas uma vez, na inicialização do estado)
const getRandomPalette = () => {
  const keys = Object.keys(SKIN_PALETTES) as (keyof typeof SKIN_PALETTES)[];
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  return SKIN_PALETTES[randomKey];
};

export const WalkingCharacter: React.FC<WalkingCharacterProps> = ({
  percentage,
  currentStageName,
}) => {
  const isCompleted = percentage >= 100;

  // useState com função de inicialização: o sorteio roda 1x ao montar o componente
  const [palette] = useState(getRandomPalette);

  return (
    <div className="relative flex flex-col items-center">
      {/* Floating Speech Bubble above character */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        key={currentStageName}
        transition={{ duration: 0.3 }}
        className="absolute -top-16 z-30 whitespace-nowrap bg-slate-800/95 border border-teal-500/40 text-slate-100 px-3.5 py-1.5 rounded-xl shadow-xl backdrop-blur-md text-xs font-medium flex items-center gap-2 pointer-events-none"
      >
        <span className="relative flex h-2 w-2">
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full ${
              isCompleted ? 'bg-emerald-400' : 'bg-teal-400'
            } opacity-75`}
          ></span>
          <span
            className={`relative inline-flex rounded-full h-2 w-2 ${
              isCompleted ? 'bg-emerald-500' : 'bg-teal-500'
            }`}
          ></span>
        </span>

        {isCompleted ? (
          <span className="text-emerald-300 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            Cheguei ao Lyceum! Migração 100%!
          </span>
        ) : (
          <span className="font-semibold text-teal-200">{currentStageName}</span>
        )}

        {/* Speech Bubble Tail */}
        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-800 border-r border-b border-teal-500/40 rotate-45" />
      </motion.div>

      {/* Floating Data Trail Particles behind character - Continuous walking animation */}
      <div className="absolute -left-8 top-4 pointer-events-none flex gap-1">
        <motion.div
          animate={{ opacity: [0, 1, 0], x: [-5, -20], y: [-2, 8] }}
          transition={{ repeat: Infinity, duration: 0.8, ease: 'easeOut' }}
          className="w-1.5 h-1.5 rounded-full bg-teal-400 shadow-[0_0_8px_#2dd4bf]"
        />
        <motion.div
          animate={{ opacity: [0, 0.8, 0], x: [-2, -28], y: [4, -6] }}
          transition={{ repeat: Infinity, duration: 1.1, ease: 'easeOut', delay: 0.2 }}
          className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#facc15]"
        />
        <motion.div
          animate={{ opacity: [0, 0.9, 0], x: [0, -22], y: [0, 0] }}
          transition={{ repeat: Infinity, duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          className="w-1 h-1 rounded-full bg-cyan-300 shadow-[0_0_6px_#67e8f9]"
        />
      </div>

      {/* Celebratory Sparkles on 100% */}
      {isCompleted && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          className="absolute -top-10 text-amber-300 flex gap-2 pointer-events-none"
        >
          <Sparkles className="w-5 h-5 animate-bounce text-amber-400" />
          <Sparkles className="w-4 h-4 animate-pulse text-teal-300" />
        </motion.div>
      )}

      {/* Stylized Walking Character SVG with CONTINUOUS WALKING ANIMATION */}
      <motion.div
        animate={
          isCompleted
            ? { y: [0, -8, 0] }
            : { y: [0, -2.5, 0] }
        }
        transition={{ repeat: Infinity, duration: 0.45, ease: 'easeInOut' }}
        className="relative z-20 cursor-pointer group"
      >
        <svg
          width="52"
          height="64"
          viewBox="0 0 52 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_4px_12px_rgba(45,212,191,0.3)]"
        >
          <defs>
            <linearGradient id="char-shirt" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0d9488" />
              <stop offset="100%" stopColor="#0f766e" />
            </linearGradient>
            <linearGradient id="char-pants" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
            <linearGradient id="backpack-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
          </defs>

          {/* Backpack (Data Vault) on Back */}
          <rect
            x="11"
            y="22"
            width="8"
            height="18"
            rx="3"
            fill="url(#backpack-grad)"
            className="shadow-md"
          />
          <rect x="13" y="26" width="4" height="4" rx="1" fill="#78350f" />

          {/* Left Arm / Tablet - Continuous Swing */}
          <motion.g
            animate={
              isCompleted
                ? { rotate: [-10, -40, -10] }
                : { rotate: [-20, 20, -20] }
            }
            transition={{ repeat: Infinity, duration: 0.45, ease: 'easeInOut' }}
            style={{ transformOrigin: '24px 22px' }}
          >
            <rect x="22" y="24" width="4" height="14" rx="2" fill="#0f766e" />
            {/* Holding digital tablet with GV -> Lyceum data */}
            <rect x="23" y="32" width="7" height="9" rx="1" fill="#38bdf8" stroke="#0284c7" strokeWidth="0.5" />
          </motion.g>

          {/* Head & Hair - cores sorteadas aleatoriamente (negro ou branco) */}
          <circle cx="28" cy="13" r="8" fill={palette.headShadow} />
          <circle cx="28" cy="12" r="7.5" fill={palette.hairBase} />
          <path d="M 23 10 C 25 7, 32 7, 34 11 C 32 12, 26 12, 23 10 Z" fill={palette.hairTop} />
          {/* Face profile facing Right */}
          <circle cx="30" cy="13" r="6" fill={palette.face} />
          <circle cx="32.5" cy="12" r="1" fill="#1e293b" />
          {/* Smile */}
          <path d="M 31 15 C 32.5 16.5, 34 15, 34 15" stroke={palette.mouth} strokeWidth="0.8" strokeLinecap="round" />

          {/* Torso / Shirt */}
          <rect x="18" y="20" width="16" height="20" rx="4" fill="url(#char-shirt)" />
          <circle cx="22" cy="24" r="2" fill="#2dd4bf" />

          {/* Right Arm - Continuous Swing */}
          <motion.g
            animate={
              isCompleted
                ? { rotate: [10, 40, 10] }
                : { rotate: [20, -20, 20] }
            }
            transition={{ repeat: Infinity, duration: 0.45, ease: 'easeInOut' }}
            style={{ transformOrigin: '30px 22px' }}
          >
            <rect x="29" y="23" width="4" height="13" rx="2" fill="#14b8a6" />
          </motion.g>

          {/* Legs Walking Animation - Continuous Swing */}
          {/* Back Leg (Left Leg) */}
          <motion.g
            animate={
              isCompleted
                ? { rotate: [0, 0, 0] }
                : { rotate: [25, -25, 25] }
            }
            transition={{ repeat: Infinity, duration: 0.45, ease: 'easeInOut' }}
            style={{ transformOrigin: '22px 38px' }}
          >
            <rect x="20" y="38" width="5" height="18" rx="2.5" fill="url(#char-pants)" />
            {/* Sneaker */}
            <path d="M 19 54 L 27 54 L 27 58 L 18 58 Z" fill="#f8fafc" />
            <path d="M 23 54 L 27 54 L 27 58 L 23 58 Z" fill="#2dd4bf" />
          </motion.g>

          {/* Front Leg (Right Leg) */}
          <motion.g
            animate={
              isCompleted
                ? { rotate: [0, 0, 0] }
                : { rotate: [-25, 25, -25] }
            }
            transition={{ repeat: Infinity, duration: 0.45, ease: 'easeInOut' }}
            style={{ transformOrigin: '28px 38px' }}
          >
            <rect x="26" y="38" width="5" height="18" rx="2.5" fill="#334155" />
            {/* Sneaker */}
            <path d="M 25 54 L 34 54 L 34 58 L 24 58 Z" fill="#f8fafc" />
            <path d="M 29 54 L 34 54 L 34 58 L 29 58 Z" fill="#facc15" />
          </motion.g>
        </svg>

        {/* Shadow under character */}
        <div className="w-8 h-1.5 bg-slate-900/60 rounded-full mx-auto blur-[1px] mt-0.5" />
      </motion.div>
    </div>
  );
};