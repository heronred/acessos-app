import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LyceumLogo } from './LyceumLogo';
import { GVCollegeLogo } from './GVCollegeLogo';
import { CheckCircle2, Sparkles, ArrowRight, RotateCcw, ShieldCheck, Database, Award } from 'lucide-react';

interface CompletionModalProps {
  isOpen: boolean;
  onRestart: () => void;
}

export const CompletionModal: React.FC<CompletionModalProps> = ({ isOpen, onRestart }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-xl bg-slate-900 border border-teal-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden"
        >
          {/* Top glowing ambient effect */}
          <div className="absolute -top-20 -left-20 w-60 h-60 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

          {/* Header Icon */}
          <div className="flex flex-col items-center text-center relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 shadow-xl shadow-emerald-500/30 mb-4 animate-bounce">
              <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-10 h-10" />
              </div>
            </div>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Migração 100% Finalizada
            </span>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight mb-2">
              Bem-vindo ao Lyceum!
            </h2>

            <p className="text-sm text-slate-300 max-w-md leading-relaxed mb-6">
              Todos os registros, históricos e dados acadêmicos do <strong className="text-teal-300">GV College</strong> foram migrados e sincronizados com sucesso no sistema <strong className="text-amber-300">Lyceum</strong>.
            </p>

            {/* Migration Summary Cards */}
            <div className="grid grid-cols-2 gap-3 w-full mb-6 text-left">
              <div className="p-3.5 bg-slate-800/80 rounded-2xl border border-slate-700/60">
                <div className="text-xs text-slate-400 font-medium flex items-center gap-1 mb-1">
                  <Database className="w-3.5 h-3.5 text-teal-400" />
                  Alunos & Registros
                </div>
                <div className="text-lg font-bold font-mono text-slate-100">12.400 / 12.400</div>
                <div className="text-[11px] text-emerald-400">100% Transferidos</div>
              </div>

              <div className="p-3.5 bg-slate-800/80 rounded-2xl border border-slate-700/60">
                <div className="text-xs text-slate-400 font-medium flex items-center gap-1 mb-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  Auditoria de Dados
                </div>
                <div className="text-lg font-bold font-mono text-slate-100">0 Inconsistências</div>
                <div className="text-[11px] text-emerald-400">Validação Aprovada</div>
              </div>
            </div>

            {/* Destination Brand Display */}
            <div className="p-3 bg-slate-800/90 border border-amber-500/30 rounded-2xl w-full flex items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <Award className="w-8 h-8 text-amber-400 shrink-0" />
                <div className="text-left">
                  <div className="text-xs font-bold text-amber-300">SISTEMA ATIVO E ONLINE</div>
                  <div className="text-xs text-slate-300">Plataforma Lyceum Pronta</div>
                </div>
              </div>
              <LyceumLogo size="sm" showBackground={true} />
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
              <button
                onClick={onRestart}
                className="w-full sm:w-1/2 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-300 border border-teal-500/30 font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                Testar Novamente (10%)
              </button>

              <button
                onClick={onRestart}
                className="w-full sm:w-1/2 py-3 px-4 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-teal-500/25 transition-all cursor-pointer"
              >
                <span>Acessar o Lyceum</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
