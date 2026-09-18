import React from 'react';
import { APACData, DoctorProfile } from '../../types';
import { Search } from 'lucide-react';
import { getDoctorDisplayName, getDoctorDisplayCrm } from '../../utils/blankHelpers';

interface APACTemplateProps {
  data: APACData;
  onChange: (updated: APACData) => void;
  doctorProfile: DoctorProfile;
  onOpenCidModal?: () => void;
}

export const APACTemplate: React.FC<APACTemplateProps> = ({
  data,
  onChange,
  doctorProfile,
  onOpenCidModal,
}) => {
  const updateField = (field: keyof APACData, value: any) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="bg-white text-slate-900 border border-slate-300 shadow-xl mx-auto w-full max-w-[210mm] min-h-[297mm] p-6 md:p-10 font-sans text-xs leading-tight print:shadow-none print:border-none print:m-0 print:p-0 print:w-full print:max-w-none">
      
      {/* Header SUS / Ministério da Saúde */}
      <div className="border-2 border-slate-900 p-3 mb-4 bg-slate-50/50">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 flex items-center justify-center font-bold text-lg border-2 border-slate-900 rounded-full bg-emerald-700 text-white">
              SUS
            </div>
            <div>
              <h1 className="font-extrabold text-xs uppercase tracking-wider text-slate-900">
                REPÚBLICA FEDERATIVA DO BRASIL - MINISTÉRIO DA SAÚDE
              </h1>
              <h2 className="font-bold text-xs uppercase text-slate-800">
                SISTEMA ÚNICO DE SAÚDE - SUS
              </h2>
              <p className="text-[10px] text-slate-700 font-semibold">
                SISTEMA DE INFORMAÇÕES AMBULATORIAIS (SIA/SUS)
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="inline-block border border-slate-900 px-2 py-1 font-extrabold text-xs bg-slate-200">
              LAUDO APAC
            </span>
          </div>
        </div>
        <div className="text-center font-black text-xs tracking-wide text-slate-900 uppercase">
          LAUDO PARA SOLICITAÇÃO / AUTORIZAÇÃO DE PROCEDIMENTOS AMBULATORIAIS (APAC)
        </div>
      </div>

      {/* BLOCO 1 - Estabelecimento Solicitante */}
      <div className="border border-slate-900 mb-3">
        <div className="bg-slate-800 text-white px-2 py-1 font-bold text-[11px] uppercase print:bg-slate-900">
          1 - ESTABELECIMENTO DE SAÚDE SOLICITANTE
        </div>
        <div className="p-2 grid grid-cols-12 gap-2 bg-slate-50/30">
          <div className="col-span-8">
            <label className="block text-[9px] font-bold text-slate-700 uppercase">
              Nome do Estabelecimento:
            </label>
            <input
              type="text"
              value={data.estabelecimentoSolicitanteNome}
              onChange={(e) => updateField('estabelecimentoSolicitanteNome', e.target.value)}
              className="w-full font-bold text-slate-900 bg-transparent border-b border-slate-400 focus:outline-none px-1 py-0.5"
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
              className="w-full font-mono text-slate-900 bg-transparent border-b border-slate-400 focus:outline-none px-1 py-0.5"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-[9px] font-bold text-slate-700 uppercase">
              CNPJ:
            </label>
            <input
              type="text"
              value={data.cnpj}
              onChange={(e) => updateField('cnpj', e.target.value)}
              className="w-full font-mono text-slate-900 bg-transparent border-b border-slate-400 focus:outline-none px-1 py-0.5 text-center"
            />
          </div>
        </div>
      </div>

      {/* BLOCO 2 - Identificação do Paciente */}
      <div className="border border-slate-900 mb-3">
        <div className="bg-slate-800 text-white px-2 py-1 font-bold text-[11px] uppercase print:bg-slate-900">
          2 - IDENTIFICAÇÃO DO PACIENTE
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
                className="w-full font-bold text-slate-900 bg-transparent border-b border-slate-400 focus:outline-none px-1 py-0.5"
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
                className="w-full font-mono font-bold text-slate-900 bg-transparent border-b border-slate-400 focus:outline-none px-1 py-0.5"
              />
            </div>
          </div>

          <div className="grid grid-cols-12 gap-2">
            <div className="col-span-4">
              <label className="block text-[9px] font-bold text-slate-700 uppercase">
                CPF:
              </label>
              <input
                type="text"
                value={data.pacienteCpf}
                onChange={(e) => updateField('pacienteCpf', e.target.value)}
                className="w-full font-mono text-slate-900 bg-transparent border-b border-slate-400 focus:outline-none px-1 py-0.5"
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
                className="w-full text-slate-900 bg-transparent border-b border-slate-400 focus:outline-none px-1 py-0.5"
              />
            </div>
            <div className="col-span-4">
              <label className="block text-[9px] font-bold text-slate-700 uppercase">
                Sexo:
              </label>
              <select
                value={data.pacienteSex}
                onChange={(e) => updateField('pacienteSex', e.target.value as 'M' | 'F')}
                className="w-full text-slate-900 bg-transparent border-b border-slate-400 focus:outline-none px-1 py-0.5 font-bold"
              >
                <option value="M">Masculino (M)</option>
                <option value="F">Feminino (F)</option>
              </select>
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
                className="w-full text-slate-900 bg-transparent border-b border-slate-400 focus:outline-none px-1 py-0.5"
              />
            </div>
            <div className="col-span-4">
              <label className="block text-[9px] font-bold text-slate-700 uppercase">
                Telefone:
              </label>
              <input
                type="text"
                value={data.pacienteTelefone}
                onChange={(e) => updateField('pacienteTelefone', e.target.value)}
                className="w-full text-slate-900 bg-transparent border-b border-slate-400 focus:outline-none px-1 py-0.5"
              />
            </div>
          </div>
        </div>
      </div>

      {/* BLOCO 3 - Procedimento Solicitado */}
      <div className="border border-slate-900 mb-3">
        <div className="bg-slate-800 text-white px-2 py-1 font-bold text-[11px] uppercase print:bg-slate-900">
          3 - PROCEDIMENTO SOLICITADO (TABELA SIGTAP/SUS)
        </div>
        <div className="p-2 space-y-2">
          <div className="grid grid-cols-12 gap-2">
            <div className="col-span-3">
              <label className="block text-[9px] font-bold text-slate-700 uppercase">
                Código do Procedimento:
              </label>
              <input
                type="text"
                value={data.procedimentoCodigo}
                onChange={(e) => updateField('procedimentoCodigo', e.target.value)}
                className="w-full font-mono font-bold text-slate-900 bg-transparent border-b border-slate-400 focus:outline-none px-1 py-0.5"
              />
            </div>
            <div className="col-span-7">
              <label className="block text-[9px] font-bold text-slate-700 uppercase">
                Nome do Procedimento:
              </label>
              <input
                type="text"
                value={data.procedimentoNome}
                onChange={(e) => updateField('procedimentoNome', e.target.value)}
                className="w-full font-bold text-slate-900 bg-transparent border-b border-slate-400 focus:outline-none px-1 py-0.5"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-[9px] font-bold text-slate-700 uppercase">
                Quantidade:
              </label>
              <input
                type="number"
                value={data.quantidadeSolicitada}
                onChange={(e) => updateField('quantidadeSolicitada', parseInt(e.target.value) || 1)}
                className="w-full font-bold text-slate-900 bg-transparent border-b border-slate-400 focus:outline-none px-1 py-0.5 text-center"
              />
            </div>
          </div>

          <div className="grid grid-cols-12 gap-2 border-t border-slate-200 pt-2">
            <div className="col-span-3">
              <div className="flex justify-between items-center">
                <label className="block text-[9px] font-bold text-slate-700 uppercase">
                  CID-10 Principal:
                </label>
                {onOpenCidModal && (
                  <button
                    type="button"
                    onClick={onOpenCidModal}
                    className="print:hidden text-[9px] text-teal-700 font-bold hover:underline"
                  >
                    Buscar
                  </button>
                )}
              </div>
              <input
                type="text"
                value={data.cid10Principal}
                onChange={(e) => updateField('cid10Principal', e.target.value)}
                className="w-full font-mono font-bold text-slate-900 bg-transparent border-b border-slate-400 focus:outline-none px-1 py-0.5 uppercase"
              />
            </div>
            <div className="col-span-6">
              <label className="block text-[9px] font-bold text-slate-700 uppercase">
                Descrição do Diagnóstico:
              </label>
              <input
                type="text"
                value={data.cid10PrincipalDesc}
                onChange={(e) => updateField('cid10PrincipalDesc', e.target.value)}
                className="w-full text-slate-900 bg-transparent border-b border-slate-400 focus:outline-none px-1 py-0.5"
              />
            </div>
            <div className="col-span-3">
              <label className="block text-[9px] font-bold text-slate-700 uppercase">
                Caráter do Atendimento:
              </label>
              <select
                value={data.caraterAtendimento}
                onChange={(e) => updateField('caraterAtendimento', e.target.value as any)}
                className="w-full font-bold text-slate-900 bg-transparent border-b border-slate-400 focus:outline-none px-1 py-0.5"
              >
                <option value="Eletivo">Eletivo</option>
                <option value="Urgência">Urgência</option>
                <option value="Acidente/Outros">Acidente / Outros</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* BLOCO 4 - Anamnese e Justificativa */}
      <div className="border border-slate-900 mb-4">
        <div className="bg-slate-800 text-white px-2 py-1 font-bold text-[11px] uppercase print:bg-slate-900">
          4 - JUSTIFICATIVA DO PROCEDIMENTO SOLICITADO
        </div>
        <div className="p-2 space-y-2">
          <div>
            <label className="block text-[9px] font-bold text-slate-700 uppercase mb-1">
              Justificativa Clínica e Quadro Diagnóstico:
            </label>
            <textarea
              rows={3}
              value={data.justificativaProcedimento}
              onChange={(e) => updateField('justificativaProcedimento', e.target.value)}
              className="w-full font-sans text-slate-900 bg-slate-50/50 p-1.5 border border-slate-300 rounded focus:outline-none text-xs"
            />
          </div>
          <div>
            <label className="block text-[9px] font-bold text-slate-700 uppercase mb-1">
              Resumo da Anamnese e Exames de Apoyo Realizados:
            </label>
            <textarea
              rows={2}
              value={data.resumoAnamneseExames}
              onChange={(e) => updateField('resumoAnamneseExames', e.target.value)}
              className="w-full font-sans text-slate-900 bg-slate-50/50 p-1.5 border border-slate-300 rounded focus:outline-none text-xs"
            />
          </div>
        </div>
      </div>

      {/* BLOCO 5 - Profissional Solicitante */}
      <div className="border-2 border-slate-900 p-3 bg-slate-50/30">
        <div className="text-center font-bold text-[11px] uppercase mb-2 text-slate-900 border-b border-slate-400 pb-1">
          IDENTIFICAÇÃO E ASSINATURA DO PROFISSIONAL SOLICITANTE
        </div>
        
        <div className="grid grid-cols-12 gap-2 mb-4">
          <div className="col-span-5">
            <label className="block text-[9px] font-bold text-slate-700 uppercase">
              Nome do Médico Solicitante:
            </label>
            <input
              type="text"
              value={data.medicoSolicitanteNome}
              onChange={(e) => updateField('medicoSolicitanteNome', e.target.value)}
              className="w-full font-bold text-slate-900 bg-transparent border-b border-slate-400 focus:outline-none px-1"
            />
          </div>
          <div className="col-span-3">
            <label className="block text-[9px] font-bold text-slate-700 uppercase">
              Cartão SUS (CNS Profissional):
            </label>
            <input
              type="text"
              value={data.medicoSolicitanteCns}
              onChange={(e) => updateField('medicoSolicitanteCns', e.target.value)}
              className="w-full font-mono text-slate-900 bg-transparent border-b border-slate-400 focus:outline-none px-1"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-[9px] font-bold text-slate-700 uppercase">
              CRM/UF:
            </label>
            <input
              type="text"
              value={`${data.medicoSolicitanteCrm}/${data.medicoSolicitanteUf}`}
              onChange={(e) => {
                const parts = e.target.value.split('/');
                updateField('medicoSolicitanteCrm', parts[0] || '');
                if (parts[1]) updateField('medicoSolicitanteUf', parts[1]);
              }}
              className="w-full font-mono text-slate-900 bg-transparent border-b border-slate-400 focus:outline-none px-1 text-center"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-[9px] font-bold text-slate-700 uppercase">
              Data Solicit.:
            </label>
            <input
              type="date"
              value={data.dataSolicitacao}
              onChange={(e) => updateField('dataSolicitacao', e.target.value)}
              className="w-full text-slate-900 bg-transparent border-b border-slate-400 focus:outline-none px-1"
            />
          </div>
        </div>

        <div className="flex justify-between items-end pt-2">
          <div className="text-[9px] text-slate-600 max-w-xs">
            Declaro que as informações acima são a expressão da verdade para os fins previstos na legislação de regência do SUS.
          </div>
          
          <div className="text-center w-60 border-t border-slate-800 pt-1">
            {doctorProfile.signatureUrl ? (
              <img src={doctorProfile.signatureUrl} alt="Assinatura" className="h-10 mx-auto object-contain" />
            ) : (
              <div className="h-8"></div>
            )}
            <p className="font-extrabold text-xs text-slate-900 uppercase">
              {getDoctorDisplayName(data.medicoSolicitanteNome, doctorProfile.name)}
            </p>
            <p className="font-mono text-[10px] text-slate-800">
              {getDoctorDisplayCrm(data.medicoSolicitanteCrm, data.medicoSolicitanteUf, doctorProfile.crm, doctorProfile.uf)}
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
