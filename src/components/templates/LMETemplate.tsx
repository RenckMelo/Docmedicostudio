import React from 'react';
import { LMEData, DoctorProfile } from '../../types';
import { Plus, Trash2, Search, Calendar } from 'lucide-react';
import { getDoctorDisplayName, getDoctorDisplayCrm } from '../../utils/blankHelpers';

interface LMETemplateProps {
  data: LMEData;
  onChange: (updated: LMEData) => void;
  doctorProfile: DoctorProfile;
  onOpenCidModal?: () => void;
}

export const LMETemplate: React.FC<LMETemplateProps> = ({
  data,
  onChange,
  doctorProfile,
  onOpenCidModal
}) => {
  const updateField = (field: keyof LMEData, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const updateMed = (index: number, field: string, val: any) => {
    const updated = [...data.medicamentos];
    updated[index] = { ...updated[index], [field]: val };
    onChange({ ...data, medicamentos: updated });
  };

  const addMed = () => {
    if (data.medicamentos.length >= 4) return;
    const newMed = {
      id: `med-${Date.now()}`,
      nomeGenerico: '',
      posologia: '',
      qtdMes1: 30,
      qtdMes2: 30,
      qtdMes3: 30,
      qtdMes4: 30,
      qtdMes5: 30,
      qtdMes6: 30,
    };
    onChange({ ...data, medicamentos: [...data.medicamentos, newMed] });
  };

  const removeMed = (index: number) => {
    const updated = data.medicamentos.filter((_, i) => i !== index);
    onChange({ ...data, medicamentos: updated });
  };

  return (
    <div className="bg-white text-slate-900 border border-slate-300 shadow-xl mx-auto w-full max-w-[210mm] min-h-[297mm] p-6 md:p-10 font-sans text-xs leading-tight print:shadow-none print:border-none print:m-0 print:p-0 print:w-full print:max-w-none">
      
      {/* Header SUS / Ministério da Saúde */}
      <div className="border-2 border-slate-900 p-3 mb-4 bg-slate-50/50">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 flex items-center justify-center font-bold text-lg border-2 border-slate-900 rounded-full bg-emerald-700 text-white print:border-slate-900">
              SUS
            </div>
            <div>
              <h1 className="font-extrabold text-sm uppercase tracking-wider text-slate-900">
                REPÚBLICA FEDERATIVA DO BRASIL - MINISTÉRIO DA SAÚDE
              </h1>
              <h2 className="font-bold text-xs uppercase text-slate-800">
                SISTEMA ÚNICO DE SAÚDE - SUS
              </h2>
              <p className="text-[10px] text-slate-700 font-semibold">
                COMPONENTE ESPECIALIZADO DA ASSISTÊNCIA FARMACÊUTICA
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="inline-block border border-slate-900 px-2 py-1 font-extrabold text-xs bg-slate-200">
              LME - LAUDO MÉDICO
            </span>
          </div>
        </div>
        <div className="text-center font-black text-sm tracking-wide text-slate-900 uppercase">
          LAUDO DE SOLICITAÇÃO, AVALIAÇÃO E AUTORIZAÇÃO DE MEDICAMENTOS (LME)
        </div>
      </div>

      {/* BLOCO 1 - Estabelecimento de Saúde */}
      <div className="border border-slate-900 mb-3">
        <div className="bg-slate-800 text-white px-2 py-1 font-bold text-[11px] uppercase flex justify-between print:bg-slate-900">
          <span>1 - CAMPOS DE PREENCHIMENTO EXCLUSIVO PELO MÉDICO SOLICITANTE</span>
          <span>ESTABELECIMENTO DE SAÚDE</span>
        </div>
        <div className="p-2 grid grid-cols-12 gap-2 bg-slate-50/30">
          <div className="col-span-8">
            <label className="block text-[9px] font-bold text-slate-700 uppercase">
              Nome do Estabelecimento de Saúde Solicitante:
            </label>
            <input
              type="text"
              value={data.estabelecimentoNome}
              onChange={(e) => updateField('estabelecimentoNome', e.target.value)}
              className="w-full font-bold text-slate-900 bg-transparent border-b border-dashed border-slate-400 focus:outline-none focus:border-emerald-600 px-1 py-0.5"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-[9px] font-bold text-slate-700 uppercase">
              CNES:
            </label>
            <input
              type="text"
              value={data.cnes}
              onChange={(e) => updateField('cnes', e.target.value)}
              className="w-full font-mono font-bold text-slate-900 bg-transparent border-b border-dashed border-slate-400 focus:outline-none focus:border-emerald-600 px-1 py-0.5"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-[9px] font-bold text-slate-700 uppercase">
              UF:
            </label>
            <input
              type="text"
              value={data.uf}
              onChange={(e) => updateField('uf', e.target.value)}
              className="w-full font-bold text-slate-900 bg-transparent border-b border-dashed border-slate-400 focus:outline-none focus:border-emerald-600 px-1 py-0.5 uppercase text-center"
            />
          </div>
        </div>
      </div>

      {/* BLOCO 2 - Dados do Paciente */}
      <div className="border border-slate-900 mb-3">
        <div className="bg-slate-800 text-white px-2 py-1 font-bold text-[11px] uppercase print:bg-slate-900">
          2 - DADOS DO PACIENTE
        </div>
        <div className="p-2 space-y-2">
          <div className="grid grid-cols-12 gap-2">
            <div className="col-span-8">
              <label className="block text-[9px] font-bold text-slate-700 uppercase">
                Nome do Paciente:
              </label>
              <input
                type="text"
                value={data.pacienteNome}
                onChange={(e) => updateField('pacienteNome', e.target.value)}
                className="w-full font-bold text-slate-900 bg-transparent border-b border-slate-400 focus:outline-none focus:border-emerald-600 px-1 py-0.5 text-xs"
              />
            </div>
            <div className="col-span-4">
              <label className="block text-[9px] font-bold text-slate-700 uppercase">
                Cartão Nacional de Saúde (CNS):
              </label>
              <input
                type="text"
                value={data.pacienteCns}
                onChange={(e) => updateField('pacienteCns', e.target.value)}
                className="w-full font-mono font-bold text-slate-900 bg-transparent border-b border-slate-400 focus:outline-none focus:border-emerald-600 px-1 py-0.5"
              />
            </div>
          </div>

          <div className="grid grid-cols-12 gap-2">
            <div className="col-span-4">
              <label className="block text-[9px] font-bold text-slate-700 uppercase">
                CPF do Paciente:
              </label>
              <input
                type="text"
                value={data.pacienteCpf}
                onChange={(e) => updateField('pacienteCpf', e.target.value)}
                className="w-full font-mono text-slate-900 bg-transparent border-b border-slate-400 focus:outline-none focus:border-emerald-600 px-1 py-0.5"
              />
            </div>
            <div className="col-span-4">
              <label className="block text-[9px] font-bold text-slate-700 uppercase">
                Data de Nascimento:
              </label>
              <input
                type="date"
                value={data.pacienteDataNasc}
                onChange={(e) => updateField('pacienteDataNasc', e.target.value)}
                className="w-full text-slate-900 bg-transparent border-b border-slate-400 focus:outline-none focus:border-emerald-600 px-1 py-0.5"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-[9px] font-bold text-slate-700 uppercase">
                Peso (kg):
              </label>
              <input
                type="text"
                value={data.pacientePeso}
                onChange={(e) => updateField('pacientePeso', e.target.value)}
                className="w-full text-slate-900 bg-transparent border-b border-slate-400 focus:outline-none focus:border-emerald-600 px-1 py-0.5 text-center"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-[9px] font-bold text-slate-700 uppercase">
                Altura (cm):
              </label>
              <input
                type="text"
                value={data.pacienteAltura}
                onChange={(e) => updateField('pacienteAltura', e.target.value)}
                className="w-full text-slate-900 bg-transparent border-b border-slate-400 focus:outline-none focus:border-emerald-600 px-1 py-0.5 text-center"
              />
            </div>
          </div>

          <div className="grid grid-cols-12 gap-2">
            <div className="col-span-8">
              <label className="block text-[9px] font-bold text-slate-700 uppercase">
                Nome da Mãe do Paciente:
              </label>
              <input
                type="text"
                value={data.pacienteMae}
                onChange={(e) => updateField('pacienteMae', e.target.value)}
                className="w-full text-slate-900 bg-transparent border-b border-slate-400 focus:outline-none focus:border-emerald-600 px-1 py-0.5"
              />
            </div>
            <div className="col-span-4">
              <label className="block text-[9px] font-bold text-slate-700 uppercase">
                Telefone de Contato:
              </label>
              <input
                type="text"
                value={data.pacienteTelefone}
                onChange={(e) => updateField('pacienteTelefone', e.target.value)}
                className="w-full text-slate-900 bg-transparent border-b border-slate-400 focus:outline-none focus:border-emerald-600 px-1 py-0.5"
              />
            </div>
          </div>
        </div>
      </div>

      {/* BLOCO 3 - Medicamentos Solicitados */}
      <div className="border border-slate-900 mb-3">
        <div className="bg-slate-800 text-white px-2 py-1 font-bold text-[11px] uppercase flex justify-between items-center print:bg-slate-900">
          <span>3 - MEDICAMENTOS SOLICITADOS (COMPONENTE ESPECIALIZADO)</span>
          <button
            type="button"
            onClick={addMed}
            className="print:hidden text-[10px] bg-emerald-600 hover:bg-emerald-500 text-white px-2 py-0.5 rounded font-medium flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3 h-3" /> Adicionar Medicamento
          </button>
        </div>
        <div className="p-2 overflow-x-auto">
          <table className="w-full text-[10px] border-collapse border border-slate-400">
            <thead>
              <tr className="bg-slate-200 text-slate-800 font-bold uppercase">
                <th className="border border-slate-400 p-1 text-left">Princípio Ativo (Nome Genérico)</th>
                <th className="border border-slate-400 p-1 text-left">Posologia Recomendada</th>
                <th className="border border-slate-400 p-1 text-center w-8">M1</th>
                <th className="border border-slate-400 p-1 text-center w-8">M2</th>
                <th className="border border-slate-400 p-1 text-center w-8">M3</th>
                <th className="border border-slate-400 p-1 text-center w-8">M4</th>
                <th className="border border-slate-400 p-1 text-center w-8">M5</th>
                <th className="border border-slate-400 p-1 text-center w-8">M6</th>
                <th className="border border-slate-400 p-1 text-center w-6 print:hidden">Ação</th>
              </tr>
            </thead>
            <tbody>
              {data.medicamentos.map((med, idx) => (
                <tr key={med.id} className="border-b border-slate-300">
                  <td className="border border-slate-400 p-1">
                    <input
                      type="text"
                      value={med.nomeGenerico}
                      onChange={(e) => updateMed(idx, 'nomeGenerico', e.target.value)}
                      placeholder="Ex: Dulaglutida 1,5 mg/0,5 mL"
                      className="w-full font-bold bg-transparent focus:outline-none"
                    />
                  </td>
                  <td className="border border-slate-400 p-1">
                    <input
                      type="text"
                      value={med.posologia}
                      onChange={(e) => updateMed(idx, 'posologia', e.target.value)}
                      placeholder="Ex: 1 aplicação semanal"
                      className="w-full bg-transparent focus:outline-none"
                    />
                  </td>
                  {['qtdMes1', 'qtdMes2', 'qtdMes3', 'qtdMes4', 'qtdMes5', 'qtdMes6'].map((mKey) => (
                    <td key={mKey} className="border border-slate-400 p-0.5 text-center">
                      <input
                        type="text"
                        value={(med as any)[mKey]}
                        onChange={(e) => updateMed(idx, mKey, e.target.value)}
                        className="w-full text-center font-bold bg-transparent focus:outline-none"
                      />
                    </td>
                  ))}
                  <td className="border border-slate-400 p-1 text-center print:hidden">
                    <button
                      type="button"
                      onClick={() => removeMed(idx)}
                      className="text-red-600 hover:text-red-800 p-0.5"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* BLOCO 4 - Diagnóstico e CID-10 */}
      <div className="border border-slate-900 mb-3">
        <div className="bg-slate-800 text-white px-2 py-1 font-bold text-[11px] uppercase flex justify-between items-center print:bg-slate-900">
          <span>4 - DIAGNÓSTICO E CID-10</span>
          {onOpenCidModal && (
            <button
              type="button"
              onClick={onOpenCidModal}
              className="print:hidden text-[10px] bg-slate-700 hover:bg-slate-600 text-teal-300 px-2 py-0.5 rounded font-medium flex items-center gap-1 cursor-pointer"
            >
              <Search className="w-3 h-3" /> Buscar CID-10
            </button>
          )}
        </div>
        <div className="p-2 space-y-2">
          <div className="grid grid-cols-12 gap-2">
            <div className="col-span-3">
              <label className="block text-[9px] font-bold text-slate-700 uppercase">
                CID-10 Principal:
              </label>
              <input
                type="text"
                value={data.cid10Principal}
                onChange={(e) => updateField('cid10Principal', e.target.value)}
                className="w-full font-mono font-bold text-slate-900 bg-transparent border-b border-slate-400 focus:outline-none px-1 py-0.5 uppercase"
              />
            </div>
            <div className="col-span-9">
              <label className="block text-[9px] font-bold text-slate-700 uppercase">
                Descrição do Diagnóstico Principal:
              </label>
              <input
                type="text"
                value={data.cid10PrincipalDesc}
                onChange={(e) => updateField('cid10PrincipalDesc', e.target.value)}
                className="w-full font-semibold text-slate-900 bg-transparent border-b border-slate-400 focus:outline-none px-1 py-0.5"
              />
            </div>
          </div>

          <div className="grid grid-cols-12 gap-2">
            <div className="col-span-3">
              <label className="block text-[9px] font-bold text-slate-700 uppercase">
                CID-10 Secundário (opcional):
              </label>
              <input
                type="text"
                value={data.cid10Secundario || ''}
                onChange={(e) => updateField('cid10Secundario', e.target.value)}
                className="w-full font-mono text-slate-900 bg-transparent border-b border-slate-400 focus:outline-none px-1 py-0.5 uppercase"
              />
            </div>
            <div className="col-span-9">
              <label className="block text-[9px] font-bold text-slate-700 uppercase">
                Descrição do Diagnóstico Secundário:
              </label>
              <input
                type="text"
                value={data.cid10SecundarioDesc || ''}
                onChange={(e) => updateField('cid10SecundarioDesc', e.target.value)}
                className="w-full text-slate-900 bg-transparent border-b border-slate-400 focus:outline-none px-1 py-0.5"
              />
            </div>
          </div>
        </div>
      </div>

      {/* BLOCO 5 - Anamnese e Exames */}
      <div className="border border-slate-900 mb-4">
        <div className="bg-slate-800 text-white px-2 py-1 font-bold text-[11px] uppercase print:bg-slate-900">
          5 - ANAMNESE, EXAMES DE DIAGNÓSTICO E TRATAMENTOS PRÉVIOS
        </div>
        <div className="p-2 space-y-2">
          <div>
            <label className="block text-[9px] font-bold text-slate-700 uppercase mb-1">
              Anamnese e Quadro Clínico Resumido:
            </label>
            <textarea
              rows={3}
              value={data.anamneseExames}
              onChange={(e) => updateField('anamneseExames', e.target.value)}
              className="w-full font-sans text-slate-900 bg-slate-50/50 p-1.5 border border-slate-300 rounded focus:outline-none focus:border-emerald-600 text-xs"
            />
          </div>
          <div>
            <label className="block text-[9px] font-bold text-slate-700 uppercase mb-1">
              Tratamentos Anteriores Utilizados sem Resposta Terapêutica Adequada:
            </label>
            <textarea
              rows={2}
              value={data.tratamentosAnteriores}
              onChange={(e) => updateField('tratamentosAnteriores', e.target.value)}
              className="w-full font-sans text-slate-900 bg-slate-50/50 p-1.5 border border-slate-300 rounded focus:outline-none focus:border-emerald-600 text-xs"
            />
          </div>
        </div>
      </div>

      {/* BLOCO 6 - Identificação do Médico Solicitante */}
      <div className="border-2 border-slate-900 p-3 bg-slate-50/30">
        <div className="text-center font-bold text-[11px] uppercase mb-3 text-slate-900 border-b border-slate-400 pb-1">
          IDENTIFICAÇÃO E ASSINATURA DO MÉDICO SOLICITANTE
        </div>
        
        <div className="grid grid-cols-12 gap-2 mb-6">
          <div className="col-span-6">
            <label className="block text-[9px] font-bold text-slate-700 uppercase">
              Nome do Médico:
            </label>
            <input
              type="text"
              value={data.medicoNome}
              onChange={(e) => updateField('medicoNome', e.target.value)}
              className="w-full font-bold text-slate-900 bg-transparent border-b border-slate-400 focus:outline-none px-1 py-0.5"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-[9px] font-bold text-slate-700 uppercase">
              CRM:
            </label>
            <input
              type="text"
              value={data.medicoCrm}
              onChange={(e) => updateField('medicoCrm', e.target.value)}
              className="w-full font-mono font-bold text-slate-900 bg-transparent border-b border-slate-400 focus:outline-none px-1 py-0.5 text-center"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-[9px] font-bold text-slate-700 uppercase">
              UF CRM:
            </label>
            <input
              type="text"
              value={data.medicoUf}
              onChange={(e) => updateField('medicoUf', e.target.value)}
              className="w-full font-bold text-slate-900 bg-transparent border-b border-slate-400 focus:outline-none px-1 py-0.5 text-center uppercase"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-[9px] font-bold text-slate-700 uppercase">
              Data de Emissão:
            </label>
            <input
              type="date"
              value={data.dataEmissao}
              onChange={(e) => updateField('dataEmissao', e.target.value)}
              className="w-full text-slate-900 bg-transparent border-b border-slate-400 focus:outline-none px-1 py-0.5"
            />
          </div>
        </div>

        {/* Assinatura e Carimbo Box */}
        <div className="flex justify-between items-end pt-4">
          <div className="text-[9px] text-slate-600 max-w-xs">
            Declaro a veracidade das informações prestadas neste laudo médico em conformidade com o Código de Ética Médica e diretrizes do Protocolo Clínico do Ministério da Saúde.
          </div>
          
          <div className="text-center w-64 border-t border-slate-800 pt-2">
            {doctorProfile.signatureUrl ? (
              <img
                src={doctorProfile.signatureUrl}
                alt="Assinatura Digital"
                className="h-12 mx-auto object-contain mb-1"
              />
            ) : (
              <div className="h-10"></div>
            )}
            <p className="font-extrabold text-xs text-slate-900 uppercase">
              {getDoctorDisplayName(data.medicoNome, doctorProfile.name)}
            </p>
            <p className="font-mono text-[10px] text-slate-800">
              {getDoctorDisplayCrm(data.medicoCrm, data.medicoUf, doctorProfile.crm, doctorProfile.uf)}
            </p>
            <p className="text-[9px] text-slate-600 italic">
              Carimbo & Assinatura do Médico Solicitante
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
