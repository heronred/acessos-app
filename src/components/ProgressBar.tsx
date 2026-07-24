import React from 'react';
import { motion } from 'framer-motion';
import { GVCollegeLogo } from './GVCollegeLogo';
import { LyceumLogo } from './LyceumLogo';
import { WalkingCharacter } from './WalkingCharacter';
import { Check, Database, GraduationCap, FileSpreadsheet, Wallet, ShieldCheck, Flag } from 'lucide-react';

interface Milestone {
  percentage: number;
  label: string;
  shortLabel: string;
  icon: React.ReactNode;
}

const MILESTONES: Milestone[] = [
  { percentage: 10, label: 'Início & Mapeamento', shortLabel: 'Início', icon: <Database className="w-3.5 h-3.5" /> },
  { percentage: 25, label: 'Estrutura de Alunos', shortLabel: 'Alunos', icon: <GraduationCap className="w-3.5 h-3.5" /> },
  { percentage: 50, label: 'Histórico Acadêmico', shortLabel: 'Históricos', icon: <FileSpreadsheet className="w-3.5 h-3.5" /> },
  { percentage: 75, label: 'Dados Financeiros', shortLabel: 'Financeiro', icon: <Wallet className="w-3.5 h-3.5" /> },
  { percentage: 90, label: 'Validação e Índices', shortLabel: 'Validação', icon: <ShieldCheck className="w-3.5 h-3.5" /> },
  { percentage: 100, label: 'Concluído no Lyceum', shortLabel: 'Concluído', icon: <Flag className="w-3.5 h-3.5" /> },
];

interface ProgressBarProps {
  percentage: number;
  isWalking: boolean;
  currentStageName: string;
  onSelectMilestone?: (pct: number) => void;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  percentage,
  isWalking,
  currentStageName,
  onSelectMilestone,
}) => {
  // Clamp character position visually within 4% and 94% so sprite doesn't clip off borders
  const characterPos = Math.min(Math.max(percentage, 3), 95);

  return (
    <div className="w-full bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header: Origin -> Destination Logos */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10 pb-6 border-b border-slate-800/60 relative z-10">
        {/* Origin: GV College */}
        <div className="flex flex-col items-center md:items-start group">
          <span className="text-[11px] uppercase tracking-wider font-semibold text-teal-400/90 mb-2 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            Origem do Sistema
          </span>
          <div className="p-3 bg-slate-800/80 border border-teal-500/20 rounded-2xl shadow-lg transition-all group-hover:border-teal-500/50">
            <GVCollegeLogo size="md" />
          </div>
          <span className="text-xs text-slate-400 mt-2 font-mono">Base de Dados: GV_COLLEGE</span>
        </div>

        {/* Transfer Arrow Indicator */}
        <div className="flex flex-col items-center justify-center text-slate-500">
          <div className="flex items-center gap-2 text-teal-400 font-mono text-xs font-semibold bg-slate-800/90 px-3 py-1.5 rounded-full border border-teal-500/30 shadow-inner">
            <span>MIGRAÇÃO DE DADOS ATIVA</span>
          </div>
        </div>

        {/* Destination: Lyceum */}
        <div className="flex flex-col items-center md:items-end group">
          <span className="text-[11px] uppercase tracking-wider font-semibold text-amber-400/90 mb-2 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            Destino da Migração
          </span>
          <div className="p-1 bg-slate-800/80 border border-amber-500/30 rounded-2xl shadow-lg transition-all group-hover:border-amber-400/60">
            <LyceumLogo size="md" showBackground={true} />
          </div>
          <span className="text-xs text-slate-400 mt-2 font-mono">Ambiente: LYCEUM</span>
        </div>
      </div>

      {/* Main Track & Walking Character Container */}
      <div className="relative pt-20 pb-16 px-4 md:px-8">
        {/* Walking Character Positioned Horizontally */}
        <div
          className="absolute top-1 z-30 transition-all duration-300 ease-out"
          style={{ left: `${characterPos}%`, transform: 'translateX(-50%)' }}
        >
          <WalkingCharacter
            isWalking={isWalking}
            percentage={percentage}
            currentStageName={currentStageName}
          />
        </div>

        {/* The Track Line Background */}
        <div className="relative w-full h-5 bg-slate-800/90 rounded-full border border-slate-700/80 overflow-hidden shadow-inner p-0.5">
          {/* Grid lines inside track */}
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage: 'radial-gradient(circle, #94a3b8 1px, transparent 1px)',
              backgroundSize: '8px 8px',
            }}
          />

          {/* Active Gradient Filled Progress Bar */}
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-teal-500 via-emerald-400 via-amber-400 to-sky-400 relative shadow-[0_0_15px_rgba(45,212,191,0.5)]"
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {/* Animated Shimmer Ray along active bar */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shimmer_2s_infinite]" />
          </motion.div>
        </div>

        {/* Milestone Node Dots & Cards */}
        <div className="relative w-full mt-4 flex justify-between items-start">
          {MILESTONES.map((ms) => {
            const isReached = percentage >= ms.percentage;
            const isCurrent =
              percentage >= ms.percentage &&
              (percentage < (MILESTONES.find((m) => m.percentage > ms.percentage)?.percentage || 101));

            return (
              <button
                key={ms.percentage}
                onClick={() => onSelectMilestone && onSelectMilestone(ms.percentage)}
                className="group relative flex flex-col items-center focus:outline-none cursor-pointer"
                style={{
                  position: 'absolute',
                  left: `${ms.percentage}%`,
                  transform: 'translateX(-50%)',
                }}
              >
                {/* Node Icon Circle */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 border-2 shadow-lg ${
                    isReached
                      ? 'bg-gradient-to-br from-teal-500 to-emerald-600 text-white border-teal-300 scale-110 shadow-teal-500/30'
                      : 'bg-slate-800 text-slate-400 border-slate-700 group-hover:border-slate-500'
                  } ${isCurrent ? 'ring-4 ring-teal-400/30 animate-pulse' : ''}`}
                >
                  {isReached ? <Check className="w-4 h-4 stroke-[3]" /> : ms.icon}
                </div>

                {/* Milestone Percentage Label */}
                <span
                  className={`text-xs font-bold font-mono mt-1.5 ${
                    isReached ? 'text-teal-300' : 'text-slate-500'
                  }`}
                >
                  {ms.percentage}%
                </span>

                {/* Milestone Name */}
                <span
                  className={`hidden md:block text-[11px] font-medium mt-0.5 text-center max-w-[80px] leading-tight transition-colors ${
                    isReached ? 'text-slate-200 font-semibold' : 'text-slate-500 group-hover:text-slate-400'
                  }`}
                >
                  {ms.shortLabel}
                </span>

                {/* Hover Tooltip showing full description */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute top-14 z-40 bg-slate-800 text-slate-100 text-xs py-1.5 px-3 rounded-lg shadow-xl border border-slate-700 whitespace-nowrap pointer-events-none">
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
