import React from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  UserCheck,
  School,
  Percent,
  BarChart3,
  ShieldCheck,
  User,
  Globe,
  Building2,
  Clock,
} from 'lucide-react';

export type TipoAcesso = 'ALUNO' | 'RESPONSAVEL' | 'PORTAL CONECTADO';

export interface AccessDataRow {
  unidade: string;
  tipo: TipoAcesso;
  total: number;
  acessos: number;
  porcentagem: number;
  atualizado?: string;
}

/**
 * =========================================================================================
 * 📊 DADOS DE ACESSO - ATUALIZE AQUI (a estrutura/visual não precisa ser mexida)
 * =========================================================================================
 */
export const RAW_DATA = [
{ unidade: 'São Pedro', tipo: 'ALUNO', total: 406, acessos: 109, porcentagem: 26.85, atualizado: '11/08/2026 às 13:52' },
{ unidade: 'São Pedro', tipo: 'PORTAL CONECTADO', total: 712, acessos: 377, porcentagem: 52.95, atualizado: '11/08/2026 às 13:52' },
{ unidade: 'São Pedro', tipo: 'RESPONSAVEL', total: 575, acessos: 33, porcentagem: 5.74, atualizado: '11/08/2026 às 13:52' },
{ unidade: 'São Pedro', tipo: 'RESPONSAVEL_FINAN', total: 715, acessos: 325, porcentagem: 45.45, atualizado: '11/08/2026 às 13:52' },
{ unidade: 'Rosário', tipo: 'ALUNO', total: 1818, acessos: 667, porcentagem: 36.69, atualizado: '11/08/2026 às 13:52' },
{ unidade: 'Rosário', tipo: 'PORTAL CONECTADO', total: 2788, acessos: 1966, porcentagem: 70.52, atualizado: '11/08/2026 às 13:52' },
{ unidade: 'Rosário', tipo: 'RESPONSAVEL', total: 2659, acessos: 439, porcentagem: 16.51, atualizado: '11/08/2026 às 13:52' },
{ unidade: 'Rosário', tipo: 'RESPONSAVEL_FINAN', total: 2815, acessos: 1712, porcentagem: 60.82, atualizado: '11/08/2026 às 13:52' },
{ unidade: 'João Paulo II', tipo: 'ALUNO', total: 743, acessos: 348, porcentagem: 46.84, atualizado: '11/08/2026 às 13:52' },
{ unidade: 'João Paulo II', tipo: 'PORTAL CONECTADO', total: 1561, acessos: 1328, porcentagem: 85.07, atualizado: '11/08/2026 às 13:52' },
{ unidade: 'João Paulo II', tipo: 'RESPONSAVEL', total: 1498, acessos: 425, porcentagem: 28.37, atualizado: '11/08/2026 às 13:52' },
{ unidade: 'João Paulo II', tipo: 'RESPONSAVEL_FINAN', total: 1603, acessos: 1421, porcentagem: 88.65, atualizado: '11/08/2026 às 13:52' },
];

export const ACCESS_DATA: AccessDataRow[] = RAW_DATA.map((row) => ({
  ...row,
  porcentagem: row.porcentagem ?? ((row.acessos / row.total) * 100),
}));

const getTypeStyle = (tipo: TipoAcesso) => {
  switch (tipo) {
    case 'ALUNO':
      return {
        badge: 'bg-sky-500/10 text-sky-300 border-sky-500/30',
        badgeTable: 'bg-sky-500/10 text-sky-300 border-sky-500/20',
        bar: 'from-sky-500 via-sky-400 to-cyan-300',
        glow: 'shadow-sky-500/20',
        text: 'text-sky-400',
        icon: <User className="w-3.5 h-3.5" />,
      };
    case 'PORTAL CONECTADO':
      return {
        badge: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
        badgeTable: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
        bar: 'from-emerald-500 via-teal-400 to-emerald-300',
        glow: 'shadow-emerald-500/20',
        text: 'text-emerald-400',
        icon: <Globe className="w-3.5 h-3.5" />,
      };

case 'RESPONSAVEL_FINAN':
  return {
        badge: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
        badgeTable: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
        bar: 'from-amber-500 via-amber-400 to-yellow-300',
        glow: 'shadow-amber-500/20',
        text: 'text-amber-400',
    icon: <ShieldCheck className="w-3.5 h-3.5" />,
  };
    case 'RESPONSAVEL':
    default:
      return {

      badge: 'bg-zinc-500/10 text-zinc-300 border-zinc-500/30',
      badgeTable: 'bg-zinc-500/10 text-zinc-300 border-zinc-500/20',
      bar: 'from-zinc-500 via-slate-400 to-gray-300',
      glow: 'shadow-zinc-500/20',
      text: 'text-zinc-300',

        icon: <ShieldCheck className="w-3.5 h-3.5" />,
      };

      
  }
};

// Barra de progresso com o mesmo efeito "shimmer" usado no gráfico de migração
const ProgressBarShimmer: React.FC<{ pct: number; gradientClass: string }> = ({ pct, gradientClass }) => (
  <div className="w-full bg-slate-800/80 rounded-full h-2.5 overflow-hidden relative">
    <motion.div
      className={`h-full rounded-full bg-gradient-to-r relative ${gradientClass}`}
      initial={{ width: 0 }}
      animate={{ width: `${Math.min(100, Math.max(1, pct))}%` }}
      transition={{ duration: 0.9, ease: 'easeOut' }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shimmer_2s_infinite]" />
    </motion.div>
  </div>
);

interface AccessMetricsTableProps {
  unidade?: string | null;
}

export const AccessMetricsTable: React.FC<AccessMetricsTableProps> = ({
  unidade,
}) => {

    const dadosFiltrados =
    unidade === 'sao-pedro'
      ? ACCESS_DATA.filter((r) => r.unidade === 'São Pedro')
      : unidade === 'rosario'
      ? ACCESS_DATA.filter((r) => r.unidade === 'Rosário')
      : unidade === 'jp-ii'
      ? ACCESS_DATA.filter((r) => r.unidade === 'João Paulo II')
      : ACCESS_DATA.filter((r) => r.unidade !== 'João Paulo II');

const accountRows = dadosFiltrados.filter(
  (r) => r.tipo !== 'PORTAL CONECTADO'
);
  const totalUsuarios = accountRows.reduce((acc, row) => acc + row.total, 0);
  const totalAcessos = accountRows.reduce((acc, row) => acc + row.acessos, 0);
  const mediaPorcentagemGeral = totalUsuarios > 0 ? (totalAcessos / totalUsuarios) * 100 : 0;

  
  const alunosRows = dadosFiltrados.filter((r) => r.tipo === 'ALUNO');
  const portalRows = dadosFiltrados.filter(
  (r) => r.tipo === 'PORTAL CONECTADO'
  );
  const respRows = dadosFiltrados.filter(
  (r) => r.tipo === 'RESPONSAVEL_FINAN'
  );

  const acessosAlunos = alunosRows.reduce((acc, r) => acc + r.acessos, 0);
  const acessosPortal = portalRows.reduce((acc, r) => acc + r.acessos, 0);
  const acessosResp = respRows.reduce((acc, r) => acc + r.acessos, 0);

  const saoPedroRows = ACCESS_DATA.filter((r) => r.unidade === 'São Pedro');
  const rosarioRows = ACCESS_DATA.filter((r) => r.unidade === 'Rosário');
  const joaoPauloRows = ACCESS_DATA.filter((r) => r.unidade === 'João Paulo II');

  const saoPedroAdesaoRows = saoPedroRows.filter((r) => r.tipo !== 'PORTAL CONECTADO');
  const totalUsuariosSP = saoPedroAdesaoRows.reduce((acc, r) => acc + r.total, 0);
  const totalAcessosSP = saoPedroAdesaoRows.reduce((acc, r) => acc + r.acessos, 0);
  const pctSP = totalUsuariosSP > 0 ? (totalAcessosSP / totalUsuariosSP) * 100 : 0;

  const rosarioAdesaoRows = rosarioRows.filter((r) => r.tipo !== 'PORTAL CONECTADO');
  const totalUsuariosRos = rosarioAdesaoRows.reduce((acc, r) => acc + r.total, 0);
  const totalAcessosRos = rosarioAdesaoRows.reduce((acc, r) => acc + r.acessos, 0);
  const pctRos = totalUsuariosRos > 0 ? (totalAcessosRos / totalUsuariosRos) * 100 : 0;

  const joaoPauloAdesaoRows = joaoPauloRows.filter((r) => r.tipo !== 'PORTAL CONECTADO');
  const totalUsuariosJP = joaoPauloAdesaoRows.reduce((acc, r) => acc + r.total, 0);
  const totalAcessosJP = joaoPauloAdesaoRows.reduce((acc, r) => acc + r.acessos, 0);
  const pctJP = totalUsuariosJP > 0 ? (totalAcessosJP / totalUsuariosJP) * 100 : 0;

  const ultimaAtualizacao = dadosFiltrados.find(
  (r) => r.atualizado
)?.atualizado;

  const renderUnitColumn = (
    unitTitle: string,
    unitRows: AccessDataRow[],
    totalBase: number,
    totalAcc: number,
    overallPct: number,
    borderColor: string,
    glowColor: string,
    accentBadge: string,
    delay: number
  ) => (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={`bg-slate-950/80 border ${borderColor} rounded-3xl p-5 space-y-4 relative overflow-hidden flex flex-col justify-between`}
    >
      <motion.div
        animate={{ opacity: [0.5, 0.9, 0.5] }}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
        className={`absolute -top-6 -right-6 w-32 h-32 ${glowColor} rounded-full blur-2xl pointer-events-none`}
      />

      <div className="space-y-4 relative z-10">
        {/* Header da Unidade */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className={`p-2 rounded-xl bg-slate-900 border border-slate-700 ${accentBadge}`}>
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-100">
                Unidade {unitTitle}
              </h3>
              <p className="text-[11px] text-slate-400 font-mono">
                {totalAcc.toLocaleString('pt-BR')} acessos de {totalBase.toLocaleString('pt-BR')} usuários
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-slate-400 uppercase font-mono block">
              Adesão Unidade
            </span>
            <span className={`text-lg font-black font-mono ${accentBadge}`}>
              {overallPct.toFixed(2)}%
            </span>
          </div>
        </div>

        {/* Lista de Cards dos Tipos dentro da Unidade */}
        <div className="space-y-3">
          {[...unitRows]
            .sort((a, b) => (a.tipo === 'PORTAL CONECTADO' ? -1 : b.tipo === 'PORTAL CONECTADO' ? 1 : 0))
            .map((item, idx) => {
              const style = getTypeStyle(item.tipo);
              const isPortal = item.tipo === 'PORTAL CONECTADO';

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: delay + 0.1 * (idx + 1) }}
                  whileHover={{ scale: 1.015 }}
                  className={`bg-slate-900/90 border transition-all space-y-3 rounded-2xl p-4 ${
                    isPortal
                      ? 'border-emerald-500/40 bg-slate-900/95 shadow-md shadow-emerald-500/10'
                      : `border-slate-800 hover:border-slate-700 hover:${style.glow} hover:shadow-lg`
                  }`}
                >
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full font-mono uppercase tracking-wider flex items-center gap-1.5 ${style.badge}`}
                    >
                      {style.icon}
                      {item.tipo}
                    </span>
                    {item.atualizado && (
                      <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-600" />
                        {item.atualizado}
                      </span>
                    )}
                  </div>

                  <div className="flex items-baseline justify-between pt-1">
                    <div>
                      <span className="text-[10px] text-slate-500 block uppercase font-medium">
                        {isPortal ? 'ACESSOS' : 'Acessos / Total'}
                      </span>
                      <span
                        className={`font-mono ${
                          isPortal
                            ? 'text-3xl font-black bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent'
                            : 'text-xl font-black text-teal-300'
                        }`}
                      >
                        {item.acessos.toLocaleString('pt-BR')}
                        {!isPortal && (
                          <span className="text-xs font-normal text-slate-400 ml-1">
                            / {item.total.toLocaleString('pt-BR')}
                          </span>
                        )}
                      </span>
                    </div>
                    {!isPortal && (
                      <div className="text-right">
                        <span className="text-[10px] text-slate-500 block uppercase font-medium">
                          Porcentagem
                        </span>
                        <span className={`text-lg font-black font-mono ${style.text}`}>
                          {item.porcentagem.toFixed(2)}%
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Barra de Progresso com shimmer, só para ALUNO e RESPONSÁVEL */}
                  {!isPortal && (
                    <div className="space-y-1">
                      <ProgressBarShimmer pct={(item.acessos / item.total) * 100} gradientClass={style.bar} />
                      <div className="flex justify-between text-[10px] font-mono text-slate-500">
                        <span>0%</span>
                        <span className="text-slate-300 font-semibold">
                          {item.porcentagem.toFixed(2)}%
                        </span>
                        <span>100%</span>
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
        </div>
      </div>
    </motion.div>
  );
const exibirTodasUnidades = !unidade;
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="w-full border border-slate-800/80 bg-slate-900/80 backdrop-blur-xl rounded-3xl p-5 sm:p-6 md:p-7 shadow-2xl relative overflow-hidden space-y-6"
    >
      {/* Luzes de ambiente ao fundo - mesmo efeito do gráfico de migração */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Grid Pattern suave de fundo */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-800 relative z-10">
        <div>
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-teal-500/30 shadow-lg text-teal-300 text-[10px] font-semibold uppercase tracking-widest mb-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-ping" />
            MONITORAMENTO DE ACESSOS
          </motion.div>
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-teal-400" />
            Relatório de Acessos por Unidade e Tipo
          </h2>

        </div>

        {/* Total Summary Badges */}
        <div className="flex flex-wrap items-center gap-2">

          <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs font-semibold flex items-center gap-1.5 shadow-inner">
            <UserCheck className="w-3.5 h-3.5" />
            Total Acessos APP: <strong>{totalAcessos.toLocaleString('pt-BR')}</strong>
          </span>
          <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono text-xs font-semibold flex items-center gap-1.5 shadow-inner">
            <Percent className="w-3.5 h-3.5" />
            Média Geral APP: <strong>{mediaPorcentagemGeral.toFixed(2)}%</strong>
          </span>
        </div>
      </div>

      {/* Comparison Summaries (3 Tipos de Acesso) - números com gradiente */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="bg-slate-950/80 border border-sky-500/30 rounded-2xl p-4 flex items-center justify-between hover:border-sky-500/50 transition-colors"
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sky-400 font-bold text-xs uppercase tracking-wider">
              <User className="w-4 h-4" />
              Resumo Perfil Aluno
            </div>
            <div className="text-3xl font-black font-mono bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">
              {acessosAlunos.toLocaleString('pt-BR')}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.12 }}
          className="bg-slate-950/80 border border-emerald-500/30 rounded-2xl p-4 flex items-center justify-between hover:border-emerald-500/50 transition-colors"
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
              <Globe className="w-4 h-4" />
              Resumo Portal Conectado
            </div>
            <div className="text-3xl font-black font-mono bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
              {acessosPortal.toLocaleString('pt-BR')}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.19 }}
          className="bg-slate-950/80 border border-amber-500/30 rounded-2xl p-4 flex items-center justify-between hover:border-amber-500/50 transition-colors"
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              Resumo Perfil Responsável
            </div>
            <div className="text-3xl font-black font-mono bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">
              {acessosResp.toLocaleString('pt-BR')}
            </div>
          </div>
        </motion.div>
      </div>

      {/* DISSOCIAÇÃO EM DUAS COLUNAS: UMA PARA CADA UNIDADE (São Pedro x Rosário) */}
      <div className="space-y-3 relative z-10">
        <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
          <School className="w-4 h-4 text-teal-400" />
          Acompanhamento por Unidade
        </h3>

<div
  className={`grid gap-6 ${
    exibirTodasUnidades
      ? 'grid-cols-1 lg:grid-cols-2'
      : 'grid-cols-1'
  }`}
>
  {exibirTodasUnidades && (
    <>
      {renderUnitColumn(
        'São Pedro',
        saoPedroRows,
        totalUsuariosSP,
        totalAcessosSP,
        pctSP,
        'border-teal-500/30',
        'bg-teal-500/10',
        'text-teal-300',
        0.15
      )}

      {renderUnitColumn(
        'Rosário',
        rosarioRows,
        totalUsuariosRos,
        totalAcessosRos,
        pctRos,
        'border-amber-500/30',
        'bg-amber-500/10',
        'text-amber-300',
        0.25
      )}
    </>
  )}

  {unidade === 'sao-pedro' &&
    renderUnitColumn(
      'São Pedro',
      saoPedroRows,
      totalUsuariosSP,
      totalAcessosSP,
      pctSP,
      'border-teal-500/30',
      'bg-teal-500/10',
      'text-teal-300',
      0.15
    )}

  {unidade === 'rosario' &&
    renderUnitColumn(
      'Rosário',
      rosarioRows,
      totalUsuariosRos,
      totalAcessosRos,
      pctRos,
      'border-amber-500/30',
      'bg-amber-500/10',
      'text-amber-300',
      0.25
    )}

  {unidade === 'jp-ii' &&
    renderUnitColumn(
      'João Paulo II',
      joaoPauloRows,
      totalUsuariosJP,
      totalAcessosJP,
      pctJP,
      'border-violet-500/30',
      'bg-violet-500/10',
      'text-violet-300',
      0.15
    )}
</div>
      </div>

      {/* Styled Data Table Completa Consolidada */}

    </motion.div>
  );
};