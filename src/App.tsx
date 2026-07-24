import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ProgressBar } from './components/ProgressBar';

/**
 * =========================================================================================
 * ⚙️ CONFIGURAÇÃO DA ETAPA DE MIGRAÇÃO (ALTERE OS PARÂMETROS E TEXTOS AQUI NO CÓDIGO)
 * =========================================================================================
 * 
 * Altere as propriedades do objeto abaixo conforme sua necessidade:
 * 
 * Exemplo definido:
 * - Estamos em 10%
 * - Iremos terminar esse passo em 20%
 * - Nome do passo: "Extração de dados"
 */
export const CONFIG_ETAPA = {
  // 1. Porcentagem atual / inicial em que a etapa se encontra (Ex: 10)
  porcentagemInicial: 20,

  // 2. Porcentagem em que esta etapa será concluída (Ex: 20)
  porcentagemFinal: 30,

  // 3. Nome ou descrição da etapa exibido no balão e no painel (Ex: 'Extração de dados')
  nomeDaEtapa: 'Bloqueio do GV College - Execução Backup ',

  // 4. Se 'true', o progresso avança suavemente de porcentagemInicial até porcentagemFinal.
  //    Se 'false', a porcentagem permanece fixa na porcentagemInicial (com o boneco caminhando continuamente no lugar).
  animarAvanço: true,

  // 5. Velocidade do avanço em milissegundos por atualização (padrão: 200ms)
  velocidadeMs: 200,

  // 6. Valor do incremento percentual a cada intervalo (padrão: 0.2%)
  incrementoPercentual: 0.2,
};

export default function App() {
  // Estado do progresso atual
  const [percentage, setPercentage] = useState<number>(CONFIG_ETAPA.porcentagemInicial);
  const [isSimulating, setIsSimulating] = useState<boolean>(CONFIG_ETAPA.animarAvanço);

  // Efeito para avançar suavemente da % inicial para a % final
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isSimulating && percentage < CONFIG_ETAPA.porcentagemFinal) {
      interval = setInterval(() => {
        setPercentage((prev) => {
          const next = prev + CONFIG_ETAPA.incrementoPercentual;

          if (next >= CONFIG_ETAPA.porcentagemFinal) {
            setIsSimulating(false);
            return CONFIG_ETAPA.porcentagemFinal;
          }
          return next;
        });
      }, CONFIG_ETAPA.velocidadeMs);
    }

    return () => clearInterval(interval);
  }, [isSimulating, percentage]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-teal-500 selection:text-slate-950 relative overflow-hidden flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
      {/* Luzes de ambiente ao fundo */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-teal-500/10 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="fixed top-1/3 left-1/3 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Grid Pattern suave */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03] -z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* HOLDER / CONTAINER CENTRALIZADO VERTICALMENTE */}
      <div className="w-full max-w-5xl my-auto space-y-6">
        
        {/* Cabeçalho do Loader */}
        <div className="text-center space-y-2">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-teal-500/30 shadow-lg text-teal-300 text-xs font-semibold uppercase tracking-widest"
          >
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
            SISTEMA DE MIGRAÇÃO DE DADOS EM TEMPO REAL
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-100 tracking-tight"
          >
            Migrando de <span className="text-teal-400 underline decoration-teal-500/40 decoration-4 underline-offset-8">GV College</span> para <span className="text-amber-400 underline decoration-amber-500/40 decoration-4 underline-offset-8">Lyceum</span>
          </motion.h1>
        </div>

        {/* Mostrador de Porcentagem & Etapa Atual */}
        <div className="flex flex-col items-center justify-center my-1">
          <div className="relative inline-flex items-baseline font-mono font-black tracking-tighter text-6xl sm:text-7xl bg-gradient-to-r from-teal-400 via-emerald-300 to-amber-300 bg-clip-text text-transparent drop-shadow-2xl">
            {percentage.toFixed(1)}
            <span className="text-3xl font-bold text-teal-400 ml-1">%</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 mt-1">
            <span className="text-xs sm:text-sm font-semibold font-mono text-slate-300 flex items-center gap-2 bg-slate-900/90 px-4 py-1.5 rounded-full border border-teal-500/40 shadow-inner">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Etapa Atual: <strong className="text-teal-300">{CONFIG_ETAPA.nomeDaEtapa}</strong> ({CONFIG_ETAPA.porcentagemInicial}% &rarr; {CONFIG_ETAPA.porcentagemFinal}%)
            </span>
          </div>
        </div>

        {/* O COMPONENTE LOADER COM BONECO ANDANDO CONTINUAMENTE */}
        <ProgressBar
          percentage={percentage}
          isWalking={true} // Boneco mantido em animação contínua mesmo parado
          currentStageName={CONFIG_ETAPA.nomeDaEtapa}
        />

      </div>
    </div>
  );
}
