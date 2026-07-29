import React from 'react';
import { motion } from 'framer-motion';
import { Users, UserCheck, Key, School, Percent, BarChart3, ShieldCheck, User } from 'lucide-react';

export interface AccessDataRow {
  unidade: string;
  tipo: 'ALUNO' | 'RESPONSAVEL';
  total: number;
  acessos: number;
  porcentagem: number;
}

export const RAW_DATA = [
{ unidade: '2008', tipo: 'ALUNO', total: 711, acessos: 28, porcentagem: 3.94, atualizado: '29/07/2026 às 17:03' },
{ unidade: '2008', tipo: 'RESPONSAVEL', total: 707, acessos: 92, porcentagem: 13.01, atualizado: '29/07/2026 às 17:03' },
{ unidade: '2035', tipo: 'ALUNO', total: 2785, acessos: 55, porcentagem: 1.97, atualizado: '29/07/2026 às 17:03' },
{ unidade: '2035', tipo: 'RESPONSAVEL', total: 2771, acessos: 285, porcentagem: 10.29, atualizado: '29/07/2026 às 17:03' },
];

export const ACCESS_DATA: AccessDataRow[] = RAW_DATA.map((row) => ({
  ...row,
  porcentagem: ((row.acessos / row.total) * 100),
}));

export const AccessMetricsTable: React.FC = () => {
  const totalUsuarios = ACCESS_DATA.reduce((acc, row) => acc + row.total, 0);
  const totalAcessos = ACCESS_DATA.reduce((acc, row) => acc + row.acessos, 0);
  const mediaPorcentagemGeral = (totalAcessos / totalUsuarios) * 100;

  // Totais por Tipo (Aluno vs Responsável)
  const alunosRows = ACCESS_DATA.filter((r) => r.tipo === 'ALUNO');
  const respRows = ACCESS_DATA.filter((r) => r.tipo === 'RESPONSAVEL');

  const totalAlunos = alunosRows.reduce((acc, r) => acc + r.total, 0);
  const acessosAlunos = alunosRows.reduce((acc, r) => acc + r.acessos, 0);
  const pctAlunos = (acessosAlunos / totalAlunos) * 100;

  const totalResp = respRows.reduce((acc, r) => acc + r.total, 0);
  const acessosResp = respRows.reduce((acc, r) => acc + r.acessos, 0);
  const pctResp = (acessosResp / totalResp) * 100;

  // Maior porcentagem para escala relativa se necessário
  const maxPorcentagem = Math.max(...ACCESS_DATA.map((r) => r.porcentagem));

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
            Estatísticas exatas de acessos e adesão dos perfis de Alunos e Responsáveis
          </p>
        </div>

        {/* Total Summary Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 font-mono text-xs font-semibold flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5" />
            Total Base: <strong>{totalUsuarios.toLocaleString('pt-BR')}</strong>
          </span>
          <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs font-semibold flex items-center gap-1.5">
            <UserCheck className="w-3.5 h-3.5" />
            Total Acessos: <strong>{totalAcessos.toLocaleString('pt-BR')}</strong>
          </span>
          <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono text-xs font-semibold flex items-center gap-1.5">
            <Percent className="w-3.5 h-3.5" />
            Média Geral: <strong>{mediaPorcentagemGeral.toFixed(2)}%</strong>
          </span>
        </div>
      </div>

      {/* Comparison Summaries: Alunos vs Responsáveis */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Card Resumo Alunos */}
        <div className="bg-slate-950/80 border border-sky-500/30 rounded-2xl p-4 flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sky-400 font-bold text-xs uppercase tracking-wider">
              <User className="w-4 h-4" />
              Resumo Perfil Aluno
            </div>
            <div className="text-2xl font-black font-mono text-slate-100">
              {acessosAlunos} <span className="text-xs font-normal text-slate-400">/ {totalAlunos} acessos</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-400 block font-medium">Porcentagem Geral</span>
            <span className="text-xl font-mono font-black text-sky-400">
              {pctAlunos.toFixed(2)}%
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
              {acessosResp} <span className="text-xs font-normal text-slate-400">/ {totalResp} acessos</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-400 block font-medium">Porcentagem Geral</span>
            <span className="text-xl font-mono font-black text-amber-400">
              {pctResp.toFixed(2)}%
            </span>
          </div>
        </div>
      </div>

      {/* Grid of Summary KPI Cards for Each Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {ACCESS_DATA.map((item, idx) => (
          <div
            key={idx}
            className="bg-slate-950/70 border border-slate-800 hover:border-teal-500/40 rounded-2xl p-4 transition-all space-y-3 group"
          >
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-mono flex items-center gap-1.5 text-slate-200 font-bold">
                <School className="w-4 h-4 text-teal-400" />
                Unidade {item.unidade}
              </span>
              <span
                className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full font-mono uppercase tracking-wider ${
                  item.tipo === 'ALUNO'
                    ? 'bg-sky-500/10 text-sky-300 border border-sky-500/30'
                    : 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
                }`}
              >
                {item.tipo}
              </span>
            </div>

            <div className="flex items-baseline justify-between pt-1">
              <div>
                <span className="text-[10px] text-slate-500 block uppercase font-medium">Acessos / Total</span>
                <span className="text-xl font-black font-mono text-teal-300">
                  {item.acessos}
                  <span className="text-xs font-normal text-slate-400 ml-1">/ {item.total}</span>
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-500 block uppercase font-medium">Porcentagem</span>
                <span className="text-base font-bold font-mono text-emerald-400">
                  {item.porcentagem.toFixed(2)}%
                </span>
              </div>
            </div>

            {/* Barra de Progresso com escala exata do percentual */}
            <div className="space-y-1">
              <div className="w-full bg-slate-800/80 rounded-full h-2 overflow-hidden relative">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    item.tipo === 'ALUNO' ? 'bg-sky-400' : 'bg-amber-400'
                  }`}
                  style={{ width: `${Math.min(100, Math.max(1, item.porcentagem))}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>0%</span>
                <span className="text-slate-400 font-semibold">{item.porcentagem.toFixed(2)}%</span>
                <span>100%</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Styled Data Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/80">
        <table className="w-full text-left text-xs font-mono">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-900/90 text-slate-400 font-sans font-semibold uppercase tracking-wider text-[11px]">
              <th className="py-3.5 px-4">Unidade</th>
              <th className="py-3.5 px-4">Tipo</th>
              <th className="py-3.5 px-4 text-right">Total Usuários</th>
              <th className="py-3.5 px-4 text-right">Acessos</th>
              <th className="py-3.5 px-4 text-right">Porcentagem Acessos</th>
              <th className="py-3.5 px-4 w-1/3">Adesão Real (0% a 100%)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-slate-200">
            {ACCESS_DATA.map((row, index) => (
              <tr
                key={index}
                className="hover:bg-slate-900/50 transition-colors"
              >
                <td className="py-3.5 px-4 font-bold text-slate-100 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-teal-400" />
                  Unidade {row.unidade}
                </td>
                <td className="py-3.5 px-4">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-bold ${
                      row.tipo === 'ALUNO'
                        ? 'bg-sky-500/10 text-sky-300 border border-sky-500/20'
                        : 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                    }`}
                  >
                    <Key className="w-3 h-3" />
                    {row.tipo}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right font-medium text-slate-300">
                  {row.total.toLocaleString('pt-BR')}
                </td>
                <td className="py-3.5 px-4 text-right font-bold text-teal-300">
                  {row.acessos.toLocaleString('pt-BR')}
                </td>
                <td className="py-3.5 px-4 text-right font-bold text-emerald-400 font-mono text-sm">
                  {row.porcentagem.toFixed(2)}%
                </td>
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-slate-800 rounded-full h-2.5 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          row.tipo === 'ALUNO' ? 'bg-sky-400' : 'bg-amber-400'
                        }`}
                        style={{ width: `${Math.min(100, Math.max(1, row.porcentagem))}%` }}
                      />
                    </div>
                    <span className="text-[11px] text-slate-300 font-bold font-mono w-16 text-right">
                      {row.porcentagem.toFixed(2)}%
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};
