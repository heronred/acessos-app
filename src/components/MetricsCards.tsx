import React from 'react';
import { motion } from 'framer-motion';
import { Database, Activity, Clock, ShieldCheck, Cpu, HardDriveDownload } from 'lucide-react';

interface MetricsCardsProps {
  percentage: number;
  speedMBps: number;
  totalRecords?: number;
  isSimulating: boolean;
  currentStageName: string;
}

export const MetricsCards: React.FC<MetricsCardsProps> = ({
  percentage,
  speedMBps,
  totalRecords = 12400,
  isSimulating,
  currentStageName,
}) => {
  const processedRecords = Math.round((percentage / 100) * totalRecords);
  
  // Calculate ETA based on speed and remaining percentage
  const remainingPercent = 100 - percentage;
  const etaSeconds = isSimulating && speedMBps > 0 
    ? Math.max(0, Math.round((remainingPercent * 1.5) / (speedMBps / 30)))
    : percentage >= 100 ? 0 : 120;

  const formatEta = (seconds: number) => {
    if (seconds <= 0) return 'Concluído';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}m ${secs.toString().padStart(2, '0')}s`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {/* Card 1: Registros Processados */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-xl backdrop-blur-md flex items-center justify-between relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-teal-500/5 rounded-full blur-2xl group-hover:bg-teal-500/10 transition-colors" />
        <div>
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Database className="w-3.5 h-3.5 text-teal-400" />
            Registros Migrados
          </span>
          <div className="text-2xl font-bold font-mono text-slate-100 mt-1">
            {processedRecords.toLocaleString('pt-BR')}
            <span className="text-xs text-slate-500 font-normal ml-1">
              / {totalRecords.toLocaleString('pt-BR')}
            </span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-1.5 mt-2.5 overflow-hidden">
            <div
              className="bg-teal-400 h-full rounded-full transition-all duration-300"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
        <div className="p-3 bg-teal-500/10 border border-teal-500/20 rounded-xl text-teal-400">
          <HardDriveDownload className="w-6 h-6" />
        </div>
      </div>

      {/* Card 2: Taxa de Transferência */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-xl backdrop-blur-md flex items-center justify-between relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-colors" />
        <div>
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            Taxa em Tempo Real
          </span>
          <div className="text-2xl font-bold font-mono text-emerald-400 mt-1 flex items-baseline gap-1">
            {percentage >= 100 ? '0.0' : speedMBps.toFixed(1)}
            <span className="text-xs text-slate-400 font-normal">MB/s</span>
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">
            {isSimulating ? 'Sincronização em alta velocidade' : 'Pausado para inspeção'}
          </span>
        </div>
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400">
          <Cpu className="w-6 h-6" />
        </div>
      </div>

      {/* Card 3: Tempo Estimado */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-xl backdrop-blur-md flex items-center justify-between relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 transition-colors" />
        <div>
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            Tempo Restante (ETA)
          </span>
          <div className="text-2xl font-bold font-mono text-amber-300 mt-1">
            {formatEta(etaSeconds)}
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">
            {percentage >= 100 ? 'Processo Finalizado' : 'Estimativa inteligente'}
          </span>
        </div>
        <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-400">
          <Clock className="w-6 h-6" />
        </div>
      </div>

      {/* Card 4: Segurança & Integridade */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-xl backdrop-blur-md flex items-center justify-between relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/5 rounded-full blur-2xl group-hover:bg-sky-500/10 transition-colors" />
        <div>
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
            Integridade
          </span>
          <div className="text-lg font-bold font-mono text-slate-100 mt-1">
            Zero Perdas
          </div>
          <span className="text-[11px] text-teal-400/90 mt-1 flex items-center gap-1 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Criptografia TLS 1.3
          </span>
        </div>
        <div className="p-3 bg-sky-500/10 border border-sky-500/20 rounded-xl text-sky-400">
          <ShieldCheck className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};
