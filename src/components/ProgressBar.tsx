import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { GVCollegeLogo } from './GVCollegeLogo';
import { LyceumLogo } from './LyceumLogo';
import { WalkingCharacter } from './WalkingCharacter';
import {
  Check,
  Database,
  GraduationCap,
  FileSpreadsheet,
  Wallet,
  ShieldCheck,
  Flag,
} from 'lucide-react';

interface Milestone {
  percentage: number;
  label: string;
  shortLabel: string;
  icon: React.ReactNode;
}

const MILESTONES: Milestone[] = [
{
  percentage: 7,
  label: 'Início & Mapeamento',
  shortLabel: 'Retirada acessos',
  icon: <Database className="w-3.5 h-3.5" />,
},
{
  percentage: 14,
  label: 'Backup base GV',
  shortLabel: 'Backup GV',
  icon: <GraduationCap className="w-3.5 h-3.5" />,
},
{
  percentage: 21,
  label: 'Restauração de dados',
  shortLabel: 'Restore GV',
  icon: <GraduationCap className="w-3.5 h-3.5" />,
},
{
  percentage: 29,
  label: 'Cria Objetos Migração',
  shortLabel: 'Objetos Migração',
  icon: <FileSpreadsheet className="w-3.5 h-3.5" />,
},
{
  percentage: 36,
  label: 'Prepara Base Migração',
  shortLabel: 'Prepara Base',
  icon: <Wallet className="w-3.5 h-3.5" />,
},
{
  percentage: 43,
  label: 'Backup Base Migração',
  shortLabel: 'Backup Migração',
  icon: <ShieldCheck className="w-3.5 h-3.5" />,
},
{
  percentage: 50,
  label: 'Restore Base Migração',
  shortLabel: 'Restore Migração',
  icon: <Flag className="w-3.5 h-3.5" />,
},
{
  percentage: 57,
  label: 'Cópia Migração -> Lyceum',
  shortLabel: 'Cópia -> Lyceum',
  icon: <Flag className="w-3.5 h-3.5" />,
},
{
  percentage: 64,
  label: 'Executa Migração',
  shortLabel: 'Executa Migração',
  icon: <Flag className="w-3.5 h-3.5" />,
},
{
  percentage: 71,
  label: 'Valida Migração TI',
  shortLabel: 'Valida TI',
  icon: <Flag className="w-3.5 h-3.5" />,
},
{
  percentage: 79,
  label: 'Libera ambiente CN',
  shortLabel: 'Libera CN',
  icon: <Flag className="w-3.5 h-3.5" />,
},
{
  percentage: 86,
  label: 'Executa Scripts Pós Migração',
  shortLabel: 'Scripts Pós',
  icon: <Flag className="w-3.5 h-3.5" />,
},
{
  percentage: 93,
  label: 'Validação Negócio',
  shortLabel: 'Validação Negócio',
  icon: <Flag className="w-3.5 h-3.5" />,
},
{
  percentage: 100,
  label: 'Liberação do ambiente Rosário e São Pedro',
  shortLabel: 'Rosário / São Pedro',
  icon: <Flag className="w-3.5 h-3.5" />,
},
];

interface ProgressBarProps {
  percentage: number;
  isWalking: boolean;
  currentStageName: string;
  onSelectMilestone?: (pct: number) => void;
}

// Gera posições fixas para as estrelas (evita "pular" a cada render)
const STARS = Array.from({ length: 60 }).map((_, i) => ({
  id: i,
  top: Math.random() * 100,
  left: Math.random() * 100,
  size: Math.random() * 1.6 + 0.6,
  delay: Math.random() * 4,
  duration: Math.random() * 3 + 2,
}));

export const ProgressBar: React.FC<ProgressBarProps> = ({
  percentage,
  isWalking,
  currentStageName,
  onSelectMilestone,
}) => {

  // Detecta se é "noite" (a partir das 19h até as 6h)
  const getIsNight = () => {
    const hour = new Date().getHours();
    return hour >= 19 || hour < 6;
  };

  const [isNight, setIsNight] = useState(getIsNight());

  useEffect(() => {
    // Reavalia a cada minuto, para a transição acontecer sozinha às 19h
    const interval = setInterval(() => {
      setIsNight(getIsNight());
    }, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Mantém o personagem dentro dos limites visuais
  const characterPos = Math.min(Math.max(percentage, 3), 95);
    return (
    <div
      className={`w-full border backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden transition-colors duration-1000 ${
        isNight
          ? 'bg-slate-950/90 border-slate-800/80'
          : 'bg-slate-900/80 border-slate-800/80'
      }`}
    >

      {/* Background ambient lighting (dia) */}
      {!isNight && (
        <>
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        </>
      )}

      {/* Céu noturno com estrelas */}
      {isNight && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Gradiente de céu noturno */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-indigo-950/40 to-slate-950" />

          {/* Lua */}
          <div className="absolute top-46 right-10 w-10 h-10 rounded-full bg-slate-200/90 shadow-[0_0_25px_rgba(226,232,240,0.6)]" />

          {/* Estrelas */}
          {STARS.map((star) => (
            <div
              key={star.id}
              className="absolute rounded-full bg-white animate-pulse"
              style={{
                top: `${star.top}%`,
                left: `${star.left}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                opacity: 0.8,
                animationDelay: `${star.delay}s`,
                animationDuration: `${star.duration}s`,
              }}
            />
          ))}
        </div>
      )}


      {/* Header Logos */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10 pb-6 border-b border-slate-800/60 relative z-10">

        {/* GV */}
        <div className="flex flex-col items-center md:items-start group">
          <span className="text-[11px] uppercase tracking-wider font-semibold text-teal-400/90 mb-2 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            Origem do Sistema
          </span>

          <div className="p-3 bg-slate-800/80 border border-teal-500/20 rounded-2xl shadow-lg transition-all group-hover:border-teal-500/50">
            <GVCollegeLogo size="md" />
          </div>

          <span className="text-xs text-slate-400 mt-2 font-mono">
            Base de Dados: GV_COLLEGE
          </span>
        </div>


        {/* Status */}
        <div className="flex flex-col items-center justify-center text-slate-500">
          <div className="flex items-center gap-2 text-teal-400 font-mono text-xs font-semibold bg-slate-800/90 px-3 py-1.5 rounded-full border border-teal-500/30 shadow-inner">
            MIGRAÇÃO DE DADOS ATIVA
          </div>
        </div>


        {/* Lyceum */}
        <div className="flex flex-col items-center md:items-end group">

          <span className="text-[11px] uppercase tracking-wider font-semibold text-amber-400/90 mb-2 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            Destino da Migração
          </span>

          <div className="p-1 bg-slate-800/80 border border-amber-500/30 rounded-2xl shadow-lg transition-all group-hover:border-amber-400/60">
            <LyceumLogo size="md" showBackground />
          </div>

          <span className="text-xs text-slate-400 mt-2 font-mono">
            Ambiente: LYCEUM
          </span>

        </div>

      </div>


      {/* Timeline */}
      <div className="relative pt-20 pb-20 px-6 md:px-10 z-10">


        {/* Character */}
        <div
          className="absolute top-1 z-30 transition-all duration-300 ease-out"
          style={{
            left: `${characterPos}%`,
            transform: 'translateX(-50%)',
          }}
        >
          <WalkingCharacter
            isWalking={isWalking}
            percentage={percentage}
            currentStageName={currentStageName}
          />
        </div>


        {/* Track */}
        <div className="relative w-full h-5 bg-slate-800/90 rounded-full border border-slate-700/80 overflow-hidden shadow-inner p-0.5">

          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage:
                'radial-gradient(circle, #94a3b8 1px, transparent 1px)',
              backgroundSize: '8px 8px',
            }}
          />


          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-teal-500 via-emerald-400 via-amber-400 to-sky-400 relative shadow-[0_0_15px_rgba(45,212,191,0.5)]"
            animate={{
              width: `${percentage}%`,
            }}
            transition={{
              duration: 0.3,
              ease: 'easeOut',
            }}
          >

            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shimmer_2s_infinite]" />

          </motion.div>

        </div>



        {/* Milestones */}
        <div className="relative w-full mt-4 h-28">


          {MILESTONES.map((ms) => {

            const isReached = percentage >= ms.percentage;

            const isCurrent =
              percentage >= ms.percentage &&
              percentage <
              (
                MILESTONES.find(
                  (m) => m.percentage > ms.percentage
                )?.percentage || 101
              );


            return (

              <button
                key={ms.percentage}
                onClick={() =>
                  onSelectMilestone &&
                  onSelectMilestone(ms.percentage)
                }

                className="group absolute flex flex-col items-center focus:outline-none cursor-pointer"

                style={{

                  left: `${ms.percentage}%`,

                  // Correção principal do final da barra
                  transform:
                    ms.percentage >= 95
                      ? 'translateX(-90%)'
                      : 'translateX(-50%)',

                }}

              >


                {/* Node */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 border-2 shadow-lg ${
                    isReached
                      ? 'bg-gradient-to-br from-teal-500 to-emerald-600 text-white border-teal-300 scale-110 shadow-teal-500/30'
                      : 'bg-slate-800 text-slate-400 border-slate-700 group-hover:border-slate-500'
                  }
                  ${
                    isCurrent
                      ? 'ring-4 ring-teal-400/30 animate-pulse'
                      : ''
                  }`}
                >

                  {
                    isReached
                      ? <Check className="w-4 h-4 stroke-[3]" />
                      : ms.icon
                  }

                </div>



                {/* Percent */}
                <span
                  className={`text-[10px] font-semibold font-mono mt-1 ${
                    isReached
                      ? 'text-teal-300'
                      : 'text-slate-500'
                  }`}
                >
                 
                </span>



                {/* Label ajustado - agora sempre visível abaixo de todos os itens */}
                <span
                  className={`block text-[8px] md:text-[9px] font-medium mt-1 text-center leading-tight transition-colors ${
                    ms.percentage >= 95
                      ? 'max-w-[70px] md:max-w-[75px]'
                      : 'max-w-[60px] md:max-w-[70px]'
                  }
                  ${
                    isReached
                      ? 'text-slate-200 font-semibold'
                      : 'text-slate-500 group-hover:text-slate-400'
                  }`}
                >
                  {ms.shortLabel}
                </span>



                {/* Tooltip */}
                <div
                  className="
                    opacity-0
                    group-hover:opacity-100
                    transition-opacity
                    absolute
                    top-14
                    z-40
                    bg-slate-800
                    text-slate-100
                    text-xs
                    py-1.5
                    px-3
                    rounded-lg
                    shadow-xl
                    border
                    border-slate-700
                    whitespace-nowrap
                    pointer-events-none
                  "
                >
                  {ms.label} ({ms.percentage}%)
                </div>


              </button>

            );

          })}


        </div>


      </div>


    </div>
  );
};
