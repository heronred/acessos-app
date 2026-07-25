import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, CheckCircle2, Loader2, ArrowRight, Server, ShieldCheck, FileCheck } from 'lucide-react';

interface Stage {
  minPct: number;
  maxPct: number;
  name: string;
  category: string;
  description: string;
  logs: string[];
}

export const STAGES: Stage[] = [
  {
    minPct: 0,
    maxPct: 15,
    name: 'Mapeamento e Extração da Base GV College',
    category: 'Conexão e Schema',
    description: 'Validação de credenciais, conexão segura via SSL/TLS com o banco de dados de origem GV_COLLEGE_PRD e mapeamento das tabelas relacionais.',
    logs: [
      '[OK] Conexão com GV_COLLEGE_PRD estabelecida via TLS 1.3',
      '[OK] Mapeamento de esquemas relacionais executado (142 tabelas)',
      '[INFO] Calculando checksum de integridade inicial...',
      '[RUNNING] Extraindo metadados de usuários e estruturas pedagógicas...',
    ],
  },
  {
    minPct: 15,
    maxPct: 35,
    name: 'Migração do Cadastro de Alunos e Docentes',
    category: 'Módulo de Pessoas',
    description: 'Conversão dos registros biométricos, dados cadastrais, documentos pessoais e credenciais de acesso dos estudantes para o formato padrão do Lyceum.',
    logs: [
      '[OK] Lote de 3.500 alunos processado sem inconsistências',
      '[OK] Normalização de CPF, e-mails institucionais e telefones',
      '[INFO] Mapeando vínculos de corpo docente e departamentos...',
      '[RUNNING] Vinculando foto de perfil e documentos em nuvem...',
    ],
  },
  {
    minPct: 35,
    maxPct: 60,
    name: 'Transferência de Histórico Escolar e Matrículas',
    category: 'Módulo Acadêmico',
    description: 'Migração crítica de notas, frequências, equivalências curriculares, disciplinas concluídas e matrizes pedagógicas históricas.',
    logs: [
      '[OK] Migração de 48.000 notas históricas finalizada',
      '[OK] Equivalência de disciplinas mapeada com sucesso no Lyceum',
      '[INFO] Sincronizando ementas e horários de aulas...',
      '[RUNNING] Transferindo diários de classe digitais...',
    ],
  },
  {
    minPct: 60,
    maxPct: 85,
    name: 'Sincronização Financeira e Mensalidades',
    category: 'Módulo Financeiro',
    description: 'Migração de planos de pagamento, histórico de boletos, contratos ativos, bolsas de estudo e convênios cadastrados.',
    logs: [
      '[OK] Contratos e planos de pagamento convertidos para Lyceum Pay',
      '[OK] Registros de bolsas e descontos validados',
      '[INFO] Verificando conciliação bancária de mensalidades...',
      '[RUNNING] Transferindo carteira de cobranças pendentes...',
    ],
  },
  {
    minPct: 85,
    maxPct: 99,
    name: 'Validação de Integridade e Reindexação',
    category: 'Checagem Final',
    description: 'Execução de testes automatizados de consistência referencial, reconstrução de índices de busca no Lyceum e auditoria de segurança.',
    logs: [
      '[OK] Teste de consistência referencial: 100% aprovado',
      '[OK] Reindexação de dados para busca rápida no Lyceum executada',
      '[INFO] Gerando log auditável de transações de migração...',
      '[RUNNING] Aplicando chaves finais de criptografia e permissões...',
    ],
  },
  {
    minPct: 100,
    maxPct: 100,
    name: 'Migração Concluída com Sucesso!',
    category: 'Sistema Lyceum Pronto',
    description: 'Todos os dados do GV College foram migrados integralmente e validados no sistema Lyceum. O ambiente está pronto para operação imediata.',
    logs: [
      '[SUCCESS] Migração concluída com 0 erros e 0 alertas!',
      '[SUCCESS] Banco de dados Lyceum sincronizado e online',
      '[SUCCESS] Notificação de migração enviada aos administradores',
      '[SUCCESS] Sistema pronto para acesso dos alunos e docentes!',
    ],
  },
];

interface StageDetailsProps {
  percentage: number;
}

export const StageDetails: React.FC<StageDetailsProps> = ({ percentage }) => {
  const currentStage =
    STAGES.find((s) => percentage >= s.minPct && percentage <= s.maxPct) || STAGES[0];

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Current Stage Description Box */}
      <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl backdrop-blur-md flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono font-bold text-teal-400 bg-teal-500/10 border border-teal-500/20 px-2.5 py-1 rounded-lg">
              {currentStage.category}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Fase {STAGES.indexOf(currentStage) + 1} de {STAGES.length - 1}
            </span>
          </div>

          <h3 className="text-lg font-bold text-slate-100 mb-2 flex items-center gap-2">
            {percentage >= 100 ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            ) : (
              <Loader2 className="w-5 h-5 text-teal-400 animate-spin" />
            )}
            {currentStage.name}
          </h3>

          <p className="text-sm text-slate-300 leading-relaxed mb-4">
            {currentStage.description}
          </p>
        </div>

        {/* Checkpoints summary list */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-3 border-t border-slate-800/80">
          {STAGES.slice(0, 5).map((stg, idx) => {
            const isDone = percentage >= stg.maxPct;
            const isCurrent = percentage >= stg.minPct && percentage < stg.maxPct;

            return (
              <div
                key={idx}
                className={`flex items-center gap-2 p-2 rounded-xl text-xs font-medium border ${
                  isDone
                    ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300'
                    : isCurrent
                    ? 'bg-teal-500/15 border-teal-500/40 text-teal-200 animate-pulse'
                    : 'bg-slate-800/50 border-slate-800 text-slate-500'
                }`}
              >
                {isDone ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                ) : (
                  <div className="w-3.5 h-3.5 rounded-full border border-slate-600 shrink-0 flex items-center justify-center text-[9px]">
                    {idx + 1}
                  </div>
                )}
                <span className="truncate">{stg.category}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Terminal Live Console Output */}
      <div className="lg:col-span-5 bg-slate-950 border border-slate-800/90 rounded-2xl p-4 shadow-2xl font-mono text-xs text-slate-300 flex flex-col justify-between relative overflow-hidden">
        {/* Terminal Header */}
        <div className="flex items-center justify-between pb-3  border-slate-800/80 text-slate-400 text-[11px]">
          <span className="flex items-center gap-1.5 font-bold text-teal-400">
            <Terminal className="w-3.5 h-3.5" />
            Console de Migração ao Vivo
          </span>
          <span className="flex items-center gap-1 text-[10px] text-slate-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            ONLINE
          </span>
        </div>

        {/* Live Logs */}
        <div className="my-3 space-y-2 min-h-[120px] max-h-[160px] overflow-y-auto pr-1 text-slate-300 font-mono">
          <AnimatePresence mode="popLayout">
            {currentStage.logs.map((log, index) => (
              <motion.div
                key={`${currentStage.name}-${index}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, delay: index * 0.08 }}
                className={`flex items-start gap-1.5 leading-snug ${
                  log.startsWith('[SUCCESS]')
                    ? 'text-emerald-400 font-semibold'
                    : log.startsWith('[OK]')
                    ? 'text-teal-300'
                    : log.startsWith('[INFO]')
                    ? 'text-sky-300'
                    : 'text-amber-300'
                }`}
              >
                <span className="text-slate-600 select-none">&gt;</span>
                <span>{log}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Footer command prompt indicator */}
        <div className="pt-2 border-t border-slate-900 flex items-center justify-between text-[11px] text-slate-500">
          <span className="flex items-center gap-1">
            <span className="text-teal-500 font-bold">$</span> lyceum-migrate --sync
          </span>
          <span className="text-teal-400 font-bold">{percentage.toFixed(0)}%</span>
        </div>
      </div>
    </div>
  );
};
