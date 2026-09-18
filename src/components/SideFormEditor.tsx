import React from 'react';
import { 
  DocumentType, 
  LMEData, 
  AtestadoComparecimentoData, 
  AtestadoDiasData, 
  ReceitaSimplesData, 
  ReceitaControleData, 
  EncaminhamentoData, 
  APACData,
  DoctorProfile 
} from '../types';
import { Edit3, Sparkles, Search, Trash2, Plus, Calendar, Clock, User, ShieldCheck } from 'lucide-react';

interface SideFormEditorProps {
  currentType: DocumentType;
  lmeData: LMEData;
  setLmeData: (d: LMEData) => void;
  atestadoCompData: AtestadoComparecimentoData;
  setAtestadoCompData: (d: AtestadoComparecimentoData) => void;
  atestadoDiasData: AtestadoDiasData;
  setAtestadoDiasData: (d: AtestadoDiasData) => void;
  receitaSimplesData: ReceitaSimplesData;
  setReceitaSimplesData: (d: ReceitaSimplesData) => void;
  receitaControleData: ReceitaControleData;
  setReceitaControleData: (d: ReceitaControleData) => void;
  encaminhamentoData: EncaminhamentoData;
  setEncaminhamentoData: (d: EncaminhamentoData) => void;
  apacData: APACData;
  setApacData: (d: APACData) => void;
  onOpenCidModal: () => void;
  onOpenPatientModal: () => void;
  doctorProfile: DoctorProfile;
}

export const SideFormEditor: React.FC<SideFormEditorProps> = ({
  currentType,
  lmeData,
  setLmeData,
  atestadoCompData,
  setAtestadoCompData,
  atestadoDiasData,
  setAtestadoDiasData,
  receitaSimplesData,
  setReceitaSimplesData,
  receitaControleData,
  setReceitaControleData,
  encaminhamentoData,
  setEncaminhamentoData,
  apacData,
  setApacData,
  onOpenCidModal,
  onOpenPatientModal,
}) => {

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-slate-100 space-y-5 shadow-xl print:hidden">
      
      {/* Panel Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-teal-500/10 border border-teal-500/20 text-teal-400">
            <Edit3 className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Formulário de Edição
            </h3>
            <p className="text-[10px] text-slate-400">Edição estruturada sincronizada em tempo real com o papel</p>
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenPatientModal}
          className="text-[11px] font-bold bg-teal-500/10 hover:bg-teal-500 text-teal-300 hover:text-slate-950 border border-teal-500/30 px-2.5 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1"
        >
          <User className="w-3.5 h-3.5" />
          <span>Selecionar Paciente</span>
        </button>
      </div>

      {/* Editor Mapped to Document Type */}
      {currentType === 'atestado_comparecimento' && (
        <div className="space-y-3 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Nome do Paciente:</label>
            <input
              type="text"
              value={atestadoCompData.pacienteNome}
              onChange={(e) => setAtestadoCompData({ ...atestadoCompData, pacienteNome: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-teal-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">CPF ou RG:</label>
              <input
                type="text"
                value={atestadoCompData.pacienteRgCpf}
                onChange={(e) => setAtestadoCompData({ ...atestadoCompData, pacienteRgCpf: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Data:</label>
              <input
                type="date"
                value={atestadoCompData.dataComparecimento}
                onChange={(e) => setAtestadoCompData({ ...atestadoCompData, dataComparecimento: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Horário Início:</label>
              <input
                type="text"
                value={atestadoCompData.horarioInicio}
                onChange={(e) => setAtestadoCompData({ ...atestadoCompData, horarioInicio: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Horário Fim:</label>
              <input
                type="text"
                value={atestadoCompData.horarioFim}
                onChange={(e) => setAtestadoCompData({ ...atestadoCompData, horarioFim: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Finalidade:</label>
            <textarea
              rows={2}
              value={atestadoCompData.finalidade}
              onChange={(e) => setAtestadoCompData({ ...atestadoCompData, finalidade: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none"
            />
          </div>
        </div>
      )}

      {currentType === 'atestado_dias' && (
        <div className="space-y-3 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Nome do Paciente:</label>
            <input
              type="text"
              value={atestadoDiasData.pacienteNome}
              onChange={(e) => setAtestadoDiasData({ ...atestadoDiasData, pacienteNome: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-teal-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Dias de Afastamento:</label>
              <input
                type="number"
                min={1}
                value={atestadoDiasData.diasAfastamento}
                onChange={(e) => setAtestadoDiasData({ ...atestadoDiasData, diasAfastamento: parseInt(e.target.value) || 1 })}
                className="w-full font-bold bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Dias (por extenso):</label>
              <input
                type="text"
                value={atestadoDiasData.diasAfastamentoExtenso}
                onChange={(e) => setAtestadoDiasData({ ...atestadoDiasData, diasAfastamentoExtenso: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Data Início:</label>
              <input
                type="date"
                value={atestadoDiasData.dataInicio}
                onChange={(e) => setAtestadoDiasData({ ...atestadoDiasData, dataInicio: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">CPF / RG:</label>
              <input
                type="text"
                value={atestadoDiasData.pacienteRgCpf}
                onChange={(e) => setAtestadoDiasData({ ...atestadoDiasData, pacienteRgCpf: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none"
              />
            </div>
          </div>

          <div className="border-t border-slate-800 pt-3">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-slate-300">CID-10:</span>
              <button
                type="button"
                onClick={onOpenCidModal}
                className="text-[10px] bg-slate-800 hover:bg-slate-700 text-teal-300 px-2 py-0.5 rounded font-semibold flex items-center gap-1 cursor-pointer"
              >
                <Search className="w-3 h-3" /> Buscar
              </button>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={atestadoDiasData.cid10Code || ''}
                onChange={(e) => setAtestadoDiasData({ ...atestadoDiasData, cid10Code: e.target.value })}
                placeholder="Código CID"
                className="w-24 font-mono font-bold uppercase bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none"
              />
              <input
                type="text"
                value={atestadoDiasData.cid10Description || ''}
                onChange={(e) => setAtestadoDiasData({ ...atestadoDiasData, cid10Description: e.target.value })}
                placeholder="Descrição"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {currentType === 'receita_simples' && (
        <div className="space-y-3 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Nome do Paciente:</label>
            <input
              type="text"
              value={receitaSimplesData.pacienteNome}
              onChange={(e) => setReceitaSimplesData({ ...receitaSimplesData, pacienteNome: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-teal-500"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">CPF do Paciente:</label>
            <input
              type="text"
              value={receitaSimplesData.pacienteCpf || ''}
              onChange={(e) => setReceitaSimplesData({ ...receitaSimplesData, pacienteCpf: e.target.value })}
              className="w-full font-mono bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Orientações Gerais ao Paciente:</label>
            <textarea
              rows={3}
              value={receitaSimplesData.orientacoesGerais || ''}
              onChange={(e) => setReceitaSimplesData({ ...receitaSimplesData, orientacoesGerais: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none"
            />
          </div>
        </div>
      )}

      {currentType === 'lme' && (
        <div className="space-y-3 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Nome do Paciente:</label>
            <input
              type="text"
              value={lmeData.pacienteNome}
              onChange={(e) => setLmeData({ ...lmeData, pacienteNome: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-teal-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">CNS (Cartão SUS):</label>
              <input
                type="text"
                value={lmeData.pacienteCns}
                onChange={(e) => setLmeData({ ...lmeData, pacienteCns: e.target.value })}
                className="w-full font-mono bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">CPF:</label>
              <input
                type="text"
                value={lmeData.pacienteCpf}
                onChange={(e) => setLmeData({ ...lmeData, pacienteCpf: e.target.value })}
                className="w-full font-mono bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold text-slate-300">CID-10 Principal:</span>
              <button
                type="button"
                onClick={onOpenCidModal}
                className="text-[10px] bg-slate-800 hover:bg-slate-700 text-teal-300 px-2 py-0.5 rounded font-semibold flex items-center gap-1 cursor-pointer"
              >
                <Search className="w-3 h-3" /> Buscar CID
              </button>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={lmeData.cid10Principal}
                onChange={(e) => setLmeData({ ...lmeData, cid10Principal: e.target.value })}
                className="w-24 font-mono font-bold uppercase bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none"
              />
              <input
                type="text"
                value={lmeData.cid10PrincipalDesc}
                onChange={(e) => setLmeData({ ...lmeData, cid10PrincipalDesc: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {currentType === 'encaminhamento' && (
        <div className="space-y-3 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Especialidade / Serviço de Destino:</label>
            <input
              type="text"
              value={encaminhamentoData.destinoEspecialidade}
              onChange={(e) => setEncaminhamentoData({ ...encaminhamentoData, destinoEspecialidade: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-teal-500"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Nome do Paciente:</label>
            <input
              type="text"
              value={encaminhamentoData.pacienteNome}
              onChange={(e) => setEncaminhamentoData({ ...encaminhamentoData, pacienteNome: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">História Clínica / Motivo:</label>
            <textarea
              rows={3}
              value={encaminhamentoData.historiaClinica}
              onChange={(e) => setEncaminhamentoData({ ...encaminhamentoData, historiaClinica: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none"
            />
          </div>
        </div>
      )}

      {currentType === 'receita_controle' && (
        <div className="space-y-3 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Nome do Paciente:</label>
            <input
              type="text"
              value={receitaControleData.pacienteNome}
              onChange={(e) => setReceitaControleData({ ...receitaControleData, pacienteNome: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-teal-500"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Endereço do Paciente:</label>
            <input
              type="text"
              value={receitaControleData.pacienteEndereco}
              onChange={(e) => setReceitaControleData({ ...receitaControleData, pacienteEndereco: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none"
            />
          </div>
        </div>
      )}

      {currentType === 'apac' && (
        <div className="space-y-3 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Nome do Paciente:</label>
            <input
              type="text"
              value={apacData.pacienteNome}
              onChange={(e) => setApacData({ ...apacData, pacienteNome: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-teal-500"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Procedimento Solicitado:</label>
            <input
              type="text"
              value={apacData.procedimentoNome}
              onChange={(e) => setApacData({ ...apacData, procedimentoNome: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none"
            />
          </div>
        </div>
      )}

    </div>
  );
};
