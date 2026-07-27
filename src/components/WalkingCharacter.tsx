import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, CheckCircle2, Moon } from 'lucide-react';

interface WalkingCharacterProps {
  isWalking?: boolean;
  percentage: number;
  currentStageName: string;
}

// A partir das 22h (e até as 6h) é hora de dormir - substitui o antigo gatilho de "pausado"
const getIsNightSleepHour = () => {
  const hour = new Date().getHours();
  return hour >= 18 || hour < 6;
};

export const WalkingCharacter: React.FC<WalkingCharacterProps> = ({
  isWalking = true,
  percentage,
  currentStageName,
}) => {
  const isCompleted = percentage >= 100;

  // Verifica o horário real e reavalia a cada minuto - dorme só a partir das 22h
  const [isNightSleepHour, setIsNightSleepHour] = useState(getIsNightSleepHour());

  useEffect(() => {
    const interval = setInterval(() => {
      setIsNightSleepHour(getIsNightSleepHour());
    }, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Só dorme a partir das 22h; a conclusão da migração tem prioridade sobre o sono
  const isSleeping = isNightSleepHour && !isCompleted;

  // (turma removida - substituída pela cena da mesa de validação, ver DestinationDesk abaixo)

  return (
    <div className="relative flex flex-col items-center">
      {/* Floating Speech Bubble above character */}
      {isSleeping ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute -top-14 z-30 whitespace-nowrap bg-slate-800/95 border border-indigo-500/40 text-slate-100 px-3.5 py-1.5 rounded-xl shadow-xl backdrop-blur-md text-xs font-medium flex items-center gap-2 pointer-events-none"
        >
          <Moon className="w-3.5 h-3.5 text-indigo-300" />
          <span className="font-semibold text-indigo-200">Aguardando Validação</span>
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-800 border-r border-b border-indigo-500/40 rotate-45" />
        </motion.div>
      ) : (
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
      )}

      {/* Floating "Zzz" while sleeping */}
      {isSleeping && (
        <div className="absolute -top-6 right-0 pointer-events-none">
          <motion.span
            animate={{ opacity: [0, 1, 0], y: [0, -14], x: [0, 6] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: 'easeOut' }}
            className="absolute text-indigo-200 font-bold text-sm"
          >
            z
          </motion.span>
          <motion.span
            animate={{ opacity: [0, 1, 0], y: [4, -18], x: [4, 12] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: 'easeOut', delay: 0.5 }}
            className="absolute text-indigo-300 font-bold text-base"
          >
            Z
          </motion.span>
          <motion.span
            animate={{ opacity: [0, 1, 0], y: [8, -22], x: [8, 18] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: 'easeOut', delay: 1 }}
            className="absolute text-indigo-400 font-bold text-lg"
          >
            Z
          </motion.span>
        </div>
      )}

      {/* Floating Data Trail Particles behind character - only while walking */}
      {!isSleeping && (
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
      )}

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

      {/* Cena da turma foi removida - ver componente DestinationDesk (mesa de validação) exportado abaixo */}

      {/* Stylized Character SVG - wrapper keeps footprint stable so rotation doesn't shift layout */}
      <div
        className="relative z-20 cursor-pointer group flex items-end justify-center"
        style={{ width: 60, height: 64 }}
      >
        <motion.div
          animate={
            isSleeping
              ? { rotate: [88, 90, 88] }
              : isCompleted
              ? { y: [0, -8, 0], rotate: 0 }
              : { y: [0, -2.5, 0], rotate: 0 }
          }
          transition={{
            repeat: Infinity,
            duration: isSleeping ? 2.4 : 0.45,
            ease: 'easeInOut',
          }}
          style={{
            transformOrigin: '26px 56px',
            // Desloca o boneco deitado para "descer" até a linha do chão
            marginBottom: isSleeping ? -14 : 0,
            marginLeft: isSleeping ? -10 : 0,
          }}
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

          {/* Left Arm / Tablet */}
          <motion.g
            animate={
              isSleeping
                ? { rotate: -15 }
                : isCompleted
                ? { rotate: [-10, -40, -10] }
                : { rotate: [-20, 20, -20] }
            }
            transition={
              isSleeping
                ? { duration: 0.3 }
                : { repeat: Infinity, duration: 0.45, ease: 'easeInOut' }
            }
            style={{ transformOrigin: '24px 22px' }}
          >
            <rect x="22" y="24" width="4" height="14" rx="2" fill="#0f766e" />
            {/* Holding digital tablet with GV -> Lyceum data */}
            <rect x="23" y="32" width="7" height="9" rx="1" fill="#38bdf8" stroke="#0284c7" strokeWidth="0.5" />
          </motion.g>

          {/* Head & Hair */}
          <circle cx="28" cy="13" r="8" fill="#42220b" />
          <circle cx="28" cy="12" r="7.5" fill="#653411" />
          <path d="M 23 10 C 25 7, 32 7, 34 11 C 32 12, 26 12, 23 10 Z" fill="#ca8a04" />
          {/* Face profile facing Right */}
          <circle cx="30" cy="13" r="6" fill="#fed7aa" />

          {isSleeping ? (
            <>
              {/* Closed eye */}
              <path d="M 31.5 12 C 32.2 12.6, 33 12.6, 33.3 12" stroke="#1e293b" strokeWidth="0.8" strokeLinecap="round" fill="none" />
              {/* Neutral resting mouth */}
              <path d="M 31.5 15.3 C 32.3 15.6, 33.2 15.6, 33.5 15.3" stroke="#9a3412" strokeWidth="0.7" strokeLinecap="round" fill="none" />
            </>
          ) : (
            <>
              <circle cx="32.5" cy="12" r="1" fill="#1e293b" />
              {/* Smile */}
              <path d="M 31 15 C 32.5 16.5, 34 15, 34 15" stroke="#9a3412" strokeWidth="0.8" strokeLinecap="round" />
            </>
          )}

          {/* Torso / Shirt */}
          <rect x="18" y="20" width="16" height="20" rx="4" fill="url(#char-shirt)" />
          <circle cx="22" cy="24" r="2" fill="#2dd4bf" />

          {/* Right Arm */}
          <motion.g
            animate={
              isSleeping
                ? { rotate: 12 }
                : isCompleted
                ? { rotate: [10, 40, 10] }
                : { rotate: [20, -20, 20] }
            }
            transition={
              isSleeping
                ? { duration: 0.3 }
                : { repeat: Infinity, duration: 0.45, ease: 'easeInOut' }
            }
            style={{ transformOrigin: '30px 22px' }}
          >
            <rect x="29" y="23" width="4" height="13" rx="2" fill="#14b8a6" />
          </motion.g>

          {/* Back Leg (Left Leg) */}
          <motion.g
            animate={
              isSleeping || isCompleted
                ? { rotate: 0 }
                : { rotate: [25, -25, 25] }
            }
            transition={
              isSleeping
                ? { duration: 0.3 }
                : { repeat: Infinity, duration: 0.45, ease: 'easeInOut' }
            }
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
              isSleeping || isCompleted
                ? { rotate: 0 }
                : { rotate: [-25, 25, -25] }
            }
            transition={
              isSleeping
                ? { duration: 0.3 }
                : { repeat: Infinity, duration: 0.45, ease: 'easeInOut' }
            }
            style={{ transformOrigin: '28px 38px' }}
          >
            <rect x="26" y="38" width="5" height="18" rx="2.5" fill="#334155" />
            {/* Sneaker */}
            <path d="M 25 54 L 34 54 L 34 58 L 24 58 Z" fill="#f8fafc" />
            <path d="M 29 54 L 34 54 L 34 58 L 29 58 Z" fill="#facc15" />
          </motion.g>
        </svg>
        </motion.div>

        {/* Shadow under character - alonga quando deitado */}
        <div
          className={`absolute bottom-0 bg-slate-900/60 rounded-full blur-[1px] transition-all duration-500 ${
            isSleeping ? 'w-14 h-2' : 'w-8 h-1.5'
          }`}
        />
      </div>
    </div>
  );
};