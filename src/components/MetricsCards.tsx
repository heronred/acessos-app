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
  Hash,
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

export const RAW_DATA = [
{ unidade: 'São Pedro', tipo: 'ALUNO', total: 711, acessos: 47, porcentagem: 6.61, atualizado: '31/07/2026 às 15:42' },
{ unidade: 'São Pedro', tipo: 'PORTAL CONECTADO', total: 711, acessos: 156, porcentagem: 21.94, atualizado: '31/07/2026 às 15:42' },
{ unidade: 'São Pedro', tipo: 'RESPONSAVEL', total: 1247, acessos: 140, porcentagem: 11.23, atualizado: '31/07/2026 às 15:42' },
{ unidade: 'Rosário', tipo: 'ALUNO', total: 2788, acessos: 114, porcentagem: 4.09, atualizado: '31/07/2026 às 15:42' },
{ unidade: 'Rosário', tipo: 'PORTAL CONECTADO', total: 2785, acessos: 544, porcentagem: 19.53, atualizado: '31/07/2026 às 15:42' },
{ unidade: 'Rosário', tipo: 'RESPONSAVEL', total: 5475, acessos: 579, porcentagem: 10.58, atualizado: '31/07/2026 às 15:42' },
];

export const ACCESS_DATA: AccessDataRow[] = RAW_DATA.map((row) => ({
  ...row,
  porcentagem: row.porcentagem ?? ((row.acessos / row.total) * 100),
}));

export const AccessMetricsTable: React.FC = () => {
  const accountRows = ACCESS_DATA.filter((r) => r.tipo !== 'PORTAL CONECTADO');
  const totalUsuarios = accountRows.reduce((acc, row) => acc + row.total, 0);
  const totalAcessos = accountRows.reduce((acc, row) => acc + row.acessos, 0);
  const mediaPorcentagemGeral = totalUsuarios > 0 ? (totalAcessos / totalUsuarios) * 100 : 0;

  // Totais por Tipo
  const alunosRows = ACCESS_DATA.filter((r) => r.tipo === 'ALUNO');
  const portalRows = ACCESS_DATA.filter((r) => r.tipo === 'PORTAL CONECTADO');
  const respRows = ACCESS_DATA.filter((r) => r.tipo === 'RESPONSAVEL');

  const totalAlunos = alunosRows.reduce((acc, r) => acc + r.total, 0);
  const acessosAlunos = alunosRows.reduce((acc, r) => acc + r.acessos, 0);
  const pctAlunos = totalAlunos > 0 ? (acessosAlunos / totalAlunos) * 100 : 0;

  const totalPortal = portalRows.reduce((acc, r) => acc + r.total, 0);
  const acessosPortal = portalRows.reduce((acc, r) => acc + r.acessos, 0);

  const totalResp = respRows.reduce((acc, r) => acc + r.total, 0);
  const acessosResp = respRows.reduce((acc, r) => acc + r.acessos, 0);
  const pctResp = totalResp > 0 ? (acessosResp / totalResp) * 100 : 0;

  // Separação dos dados por Unidade
  const saoPedroRows = ACCESS_DATA.filter((r) => r.unidade === 'São Pedro');
  const rosarioRows = ACCESS_DATA.filter((r) => r.unidade === 'Rosário');

  // Adesão por unidade (Regra de três: Soma dos Acessos / Soma dos Usuários da Base de Alunos e Responsáveis)
  const saoPedroAdesaoRows = saoPedroRows.filter((r) => r.tipo !== 'PORTAL CONECTADO');
  const totalUsuariosSP = saoPedroAdesaoRows.reduce((acc, r) => acc + r.total, 0);
  const totalAcessosSP = saoPedroAdesaoRows.reduce((acc, r) => acc + r.acessos, 0);
  const pctSP = totalUsuariosSP > 0 ? (totalAcessosSP / totalUsuariosSP) * 100 : 0;

  const rosarioAdesaoRows = rosarioRows.filter((r) => r.tipo !== 'PORTAL CONECTADO');
  const totalUsuariosRos = rosarioAdesaoRows.reduce((acc, r) => acc + r.total, 0);
  const totalAcessosRos = rosarioAdesaoRows.reduce((acc, r) => acc + r.acessos, 0);
  const pctRos = totalUsuariosRos > 0 ? (totalAcessosRos / totalUsuariosRos) * 100 : 0;

  const getTypeStyle = (tipo: TipoAcesso) => {
    switch (tipo) {
      case 'ALUNO':
        return {
          badge: 'bg-sky-500/10 text-sky-300 border-sky-500/30',
          badgeTable: 'bg-sky-500/10 text-sky-300 border-sky-500/20',
          bar: 'bg-sky-400',
          text: 'text-sky-400',
          icon: <User className="w-3.5 h-3.5" />,
        };
      case 'PORTAL CONECTADO':
        return {
          badge: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
          badgeTable: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
          bar: 'bg-emerald-400',
          text: 'text-emerald-400',
          icon: <Globe className="w-3.5 h-3.5" />,
        };
      case 'RESPONSAVEL':
      default:
        return {
          badge: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
          badgeTable: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
          bar: 'bg-amber-400',
          text: 'text-amber-400',
          icon: <ShieldCheck className="w-3.5 h-3.5" />,
        };
    }
  };

  const renderUnitColumn = (
    unitTitle: string,
    unitRows: AccessDataRow[],
    totalBase: number,
    totalAcc: number,
    overallPct: number,
    borderColor: string,
    glowColor: string,
    accentBadge: string
  ) => (
    <div className={`bg-slate-950/80 border ${borderColor} rounded-3xl p-5 space-y-4 relative overflow-hidden flex flex-col justify-between`}>
      <div className={`absolute top-0 right-0 w-32 h-32 ${glowColor} rounded-full blur-2xl pointer-events-none`} />

      <div className="space-y-4">
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
                <div
                  key={idx}
                  className={`bg-slate-900/90 border ${
                    isPortal ? 'border-emerald-500/40 bg-slate-900/95 shadow-md shadow-emerald-500/5' : 'border-slate-800 hover:border-slate-700'
                  } rounded-2xl p-4 transition-all space-y-3`}
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
                        className={`${
                          isPortal ? 'text-3xl font-black text-emerald-400' : 'text-xl font-black text-teal-300'
                        } font-mono`}
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

                  {/* Barra de Progresso apenas para ALUNO e RESPONSÁVEL */}
                  {!isPortal && (
                    <div className="space-y-1">
                      <div className="w-full bg-slate-800/80 rounded-full h-2.5 overflow-hidden relative">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${style.bar}`}
                          style={{
                            width: `${Math.min(
                              100,
                              Math.max(1, (item.acessos / item.total) * 100)
                            )}%`,
                          }}
                        />
                      </div>
                      <div className="flex justify-between text-[10px] font-mono text-slate-500">
                        <span>0%</span>
                        <span className="text-slate-300 font-semibold">
                          {item.porcentagem.toFixed(2)}%
                        </span>
                        <span>100%</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-2xl backdrop-blur-xl space-y-6"
    >
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-teal-400" />
            Relatório de Acessos por Unidade e Tipo
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Estatísticas de acessos para Alunos, Portal Conectado (absoluto) e Responsáveis
          </p>
        </div>

        {/* Total Summary Badges */}
        <div className="flex flex-wrap items-center gap-2">

          <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs font-semibold flex items-center gap-1.5">
            <UserCheck className="w-3.5 h-3.5" />
            Total Acessos APP: <strong>{totalAcessos.toLocaleString('pt-BR')}</strong>
          </span>
          <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono text-xs font-semibold flex items-center gap-1.5">
            <Percent className="w-3.5 h-3.5" />
            Média Geral APP: <strong>{mediaPorcentagemGeral.toFixed(2)}%</strong>
          </span>
        </div>
      </div>

      {/* Comparison Summaries (3 Tipos de Acesso) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card Resumo Alunos */}
        <div className="bg-slate-950/80 border border-sky-500/30 rounded-2xl p-4 flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sky-400 font-bold text-xs uppercase tracking-wider">
              <User className="w-4 h-4" />
              Resumo Perfil Aluno
            </div>
            <div className="text-2xl font-black font-mono text-slate-100">
              {acessosAlunos}{' '}

            </div>
          </div>
          <div className="text-right">

          </div>
        </div>

        {/* Card Resumo Portal Conectado (Sem % - Número Absoluto) */}
        <div className="bg-slate-950/80 border border-emerald-500/30 rounded-2xl p-4 flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
              <Globe className="w-4 h-4" />
              Resumo Portal Conectado
            </div>
            <div className="text-2xl font-black font-mono text-slate-100">
              {acessosPortal.toLocaleString('pt-BR')}{' '}

            </div>
          </div>
          <div className="text-right">

            <span className="text-xl font-mono font-black text-emerald-400 flex items-center justify-end gap-1">
            </span>
          </div>
        </div>

        {/* Card Resumo Responsáveis */}
        <div className="bg-slate-950/80 border border-amber-500/30 rounded-2xl p-4 flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              Resumo Perfil Responsável
            </div>
            <div className="text-2xl font-black font-mono text-slate-100">
              {acessosResp}{' '}

            </div>
          </div>
          <div className="text-right">

          </div>
        </div>
      </div>

      {/* DISSOCIAÇÃO EM DUAS COLUNAS: UMA PARA CADA UNIDADE (São Pedro x Rosário) */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
          <School className="w-4 h-4 text-teal-400" />
          Acompanhamento por Unidade
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Coluna 1: São Pedro */}
          {renderUnitColumn(
            'São Pedro',
            saoPedroRows,
            totalUsuariosSP,
            totalAcessosSP,
            pctSP,
            'border-teal-500/30',
            'bg-teal-500/10',
            'text-teal-300'
          )}

          {/* Coluna 2: Rosário */}
          {renderUnitColumn(
            'Rosário',
            rosarioRows,
            totalUsuariosRos,
            totalAcessosRos,
            pctRos,
            'border-amber-500/30',
            'bg-amber-500/10',
            'text-amber-300'
          )}
        </div>
      </div>

      {/* Styled Data Table Completa Consolidada */}
      <div className="space-y-3 pt-2">
        <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-teal-400" />
          Tabela Detalhada de Dados
        </h3>

        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/80">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/90 text-slate-400 font-sans font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4">Unidade</th>
                <th className="py-3.5 px-4">Tipo</th>
                <th className="py-3.5 px-4 text-right">Total Usuários</th>
                <th className="py-3.5 px-4 text-right">Acessos</th>
                <th className="py-3.5 px-4 text-right">Porcentagem / Valor</th>
                <th className="py-3.5 px-4 w-1/3">Adesão / Progresso</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-200">
              {ACCESS_DATA.map((row, index) => {
                const style = getTypeStyle(row.tipo);
                const isPortal = row.tipo === 'PORTAL CONECTADO';

                return (
                  <tr
                    key={index}
                    className="hover:bg-slate-900/50 transition-colors"
                  >
                    <td className="py-3.5 px-4 font-bold text-slate-100 flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          row.unidade === 'São Pedro'
                            ? 'bg-teal-400'
                            : 'bg-amber-400'
                        }`}
                      />
                      Unidade {row.unidade}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-bold ${style.badgeTable}`}
                      >
                        {style.icon}
                        {row.tipo}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right font-medium text-slate-300">
                      {row.total.toLocaleString('pt-BR')}
                    </td>
                    <td className="py-3.5 px-4 text-right font-bold text-teal-300">
                      {row.acessos.toLocaleString('pt-BR')}
                    </td>
                    <td
                      className={`py-3.5 px-4 text-right font-bold font-mono text-sm ${style.text}`}
                    >
                      {isPortal
                        ? row.acessos.toLocaleString('pt-BR')
                        : `${row.porcentagem.toFixed(2)}%`}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 bg-slate-800 rounded-full h-2.5 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${style.bar}`}
                            style={{
                              width: `${Math.min(
                                100,
                                Math.max(1, (row.acessos / row.total) * 100)
                              )}%`,
                            }}
                          />
                        </div>
                        <span className="text-[11px] text-slate-300 font-bold font-mono w-16 text-right">
                          {isPortal
                            ? row.acessos.toLocaleString('pt-BR')
                            : `${row.porcentagem.toFixed(2)}%`}
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};
