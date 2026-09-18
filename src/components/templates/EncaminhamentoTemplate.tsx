import React from 'react';
import { EncaminhamentoData, DoctorProfile } from '../../types';
import { Search } from 'lucide-react';
import {
  getDoctorDisplayName,
  getDoctorDisplayCrm,
  getDoctorDisplaySpecialty,
  getDisplayLocalData
} from '../../utils/blankHelpers';

interface EncaminhamentoTemplateProps {
  data: EncaminhamentoData;
  onChange: (updated: EncaminhamentoData) => void;
  doctorProfile: DoctorProfile;
  onOpenCidModal?: () => void;
}

export const EncaminhamentoTemplate: React.FC<EncaminhamentoTemplateProps> = ({
  data,
  onChange,
  doctorProfile,
  onOpenCidModal,
}) => {
  const updateField = (field: keyof EncaminhamentoData, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const docName = getDoctorDisplayName(data.medicoNome, doctorProfile.name);
  const docCrm = getDoctorDisplayCrm(data.medicoCrm, data.medicoUf, doctorProfile.crm, doctorProfile.uf);
  const docSpec = getDoctorDisplaySpecialty(data.medicoEspecialidade, doctorProfile.specialty);

  return (
    <div className="bg-white text-slate-900 border border-slate-200 shadow-xl mx-auto w-full max-w-[210mm] min-h-[297mm] p-10 md:p-14 font-sans flex flex-col justify-between print:shadow-none print:border-none print:m-0 print:p-0 print:w-full print:max-w-none">
      
      {/* Top Clinic / Doctor Header */}
      <div>
        <div className="border-b-2 border-slate-900 pb-5 mb-6 flex justify-between items-start">
          <div className="space-y-0.5">
            <h1 className="text-xl font-black tracking-tight text-slate-950 uppercase">
              {docName}
            </h1>
            <p className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              {docSpec}
            </p>
            <p className="text-xs font-mono text-slate-600">
              {docCrm}
              {doctorProfile.rqe && ` | RQE ${doctorProfile.rqe}`}
            </p>
            <p className="text-xs text-slate-500 font-sans">
              {doctorProfile.clinicName || '_____________________________________________'}
            </p>
          </div>

          <div className="text-right max-w-xs text-xs text-slate-600 space-y-0.5">
            {doctorProfile.logoUrl && (
              <img src={doctorProfile.logoUrl} alt="Logo" className="h-12 ml-auto mb-1 object-contain" />
            )}
            <p className="font-medium text-slate-700">{doctorProfile.clinicAddress || '_____________________________________________'}</p>
            <p>{doctorProfile.clinicPhone ? `Tel: ${doctorProfile.clinicPhone}` : 'Tel: (___) ________-________'}</p>
          </div>
        </div>

        {/* Title */}
        <div className="text-center my-6 flex justify-between items-center border-b-2 border-slate-900 pb-2">
          <h2 className="text-xl font-extrabold uppercase tracking-wider text-slate-900">
            ENCAMINHAMENTO MÉDICO ESPECIALIZADO
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700 uppercase">Prioridade:</span>
            <select
              value={data.prioridade}
              onChange={(e) => updateField('prioridade', e.target.value)}
              className={`text-xs font-bold px-2 py-1 rounded border uppercase ${
                data.prioridade === 'Urgência' 
                  ? 'bg-red-100 text-red-800 border-red-300' 
                  : data.prioridade === 'Prioritário'
                  ? 'bg-amber-100 text-amber-800 border-amber-300'
                  : 'bg-slate-100 text-slate-800 border-slate-300'
              }`}
            >
              <option value="Eletivo">Eletivo</option>
              <option value="Prioritário">Prioritário</option>
              <option value="Urgência">Urgência</option>
            </select>
          </div>
        </div>

        {/* Destination & Patient Info */}
        <div className="space-y-3 mb-6 bg-slate-50 p-4 border border-slate-300 rounded">
          <div className="grid grid-cols-12 gap-2">
            <div className="col-span-12 md:col-span-6">
              <label className="block text-[10px] font-bold text-slate-700 uppercase">
                À Especialidade / Serviço de Destino:
              </label>
              <input
                type="text"
                value={data.destinoEspecialidade}
                onChange={(e) => updateField('destinoEspecialidade', e.target.value)}
                className="w-full font-bold text-sm text-teal-900 bg-white border border-slate-300 rounded px-2 py-1 focus:outline-none focus:border-slate-800"
                placeholder="Ex: Cardiologia / Arritmologia"
              />
            </div>
            <div className="col-span-12 md:col-span-6">
              <label className="block text-[10px] font-bold text-slate-700 uppercase">
                Profissional / Instituição de Destino (opcional):
              </label>
              <input
                type="text"
                value={data.destinoProfissionalOuServico || ''}
                onChange={(e) => updateField('destinoProfissionalOuServico', e.target.value)}
                className="w-full text-xs text-slate-900 bg-white border border-slate-300 rounded px-2 py-1 focus:outline-none focus:border-slate-800"
                placeholder="Ex: Ambulatório de Arritmias do HU"
              />
            </div>
          </div>

          <div className="grid grid-cols-12 gap-2 border-t border-slate-200 pt-2">
            <div className="col-span-8">
              <label className="block text-[10px] font-bold text-slate-700 uppercase">
                Nome do Paciente:
              </label>
              <input
                type="text"
                value={data.pacienteNome}
                onChange={(e) => updateField('pacienteNome', e.target.value)}
                className="w-full font-bold text-sm text-slate-900 bg-transparent border-b border-slate-400 focus:outline-none"
              />
            </div>
            <div className="col-span-4">
              <label className="block text-[10px] font-bold text-slate-700 uppercase">
                Idade / Data Nasc:
              </label>
              <input
                type="text"
                value={data.pacienteIdadeDataNasc}
                onChange={(e) => updateField('pacienteIdadeDataNasc', e.target.value)}
                className="w-full text-xs text-slate-900 bg-transparent border-b border-slate-400 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Clinical History & Diagnostic Hypothesis */}
        <div className="space-y-4">
          <div>
            <label className="block text-[11px] font-bold text-slate-900 uppercase mb-1">
              1. História Clínica e Motivo do Encaminhamento:
            </label>
            <textarea
              rows={4}
              value={data.historiaClinica}
              onChange={(e) => updateField('historiaClinica', e.target.value)}
              className="w-full font-serif text-sm text-slate-900 bg-slate-50/50 p-2.5 border border-slate-300 rounded focus:outline-none focus:border-slate-900"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-[11px] font-bold text-slate-900 uppercase">
                2. Hipótese Diagnóstica & CID-10:
              </label>
              {onOpenCidModal && (
                <button
                  type="button"
                  onClick={onOpenCidModal}
                  className="print:hidden text-[10px] bg-slate-800 hover:bg-slate-700 text-teal-300 px-2 py-0.5 rounded font-medium flex items-center gap-1 cursor-pointer"
                >
                  <Search className="w-3 h-3" /> Buscar CID-10
                </button>
              )}
            </div>
            <div className="grid grid-cols-12 gap-2">
              <div className="col-span-8">
                <input
                  type="text"
                  value={data.hipoteseDiagnostica}
                  onChange={(e) => updateField('hipoteseDiagnostica', e.target.value)}
                  placeholder="Hipótese diagnóstica detalhada"
                  className="w-full font-bold text-xs text-slate-900 bg-slate-50/50 p-2 border border-slate-300 rounded focus:outline-none"
                />
              </div>
              <div className="col-span-4">
                <input
                  type="text"
                  value={data.cid10 || ''}
                  onChange={(e) => updateField('cid10', e.target.value)}
                  placeholder="CID-10 (ex: I47.1)"
                  className="w-full font-mono font-bold text-xs text-slate-900 bg-slate-50/50 p-2 border border-slate-300 rounded focus:outline-none uppercase"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-900 uppercase mb-1">
              3. Exames Complementares Realizados:
            </label>
            <textarea
              rows={3}
              value={data.examesRealizados}
              onChange={(e) => updateField('examesRealizados', e.target.value)}
              className="w-full font-sans text-xs text-slate-800 bg-slate-50/50 p-2.5 border border-slate-300 rounded focus:outline-none focus:border-slate-900"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-900 uppercase mb-1">
              4. Conduta Solicitada e Objetivos da Avaliação:
            </label>
            <textarea
              rows={3}
              value={data.condutaSolicitada}
              onChange={(e) => updateField('condutaSolicitada', e.target.value)}
              className="w-full font-sans text-xs text-slate-800 bg-slate-50/50 p-2.5 border border-slate-300 rounded focus:outline-none focus:border-slate-900"
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto pt-8 space-y-8">
        <div className="text-center font-serif text-slate-800 text-sm">
          <input
            type="text"
            value={data.localData}
            onChange={(e) => updateField('localData', e.target.value)}
            placeholder={getDisplayLocalData('')}
            className="w-full text-center border-b border-dashed border-slate-400 focus:outline-none py-1 font-serif text-slate-900 text-base font-medium"
          />
        </div>

        <div className="text-center max-w-sm mx-auto border-t-2 border-slate-900 pt-3">
          {doctorProfile.signatureUrl ? (
            <img src={doctorProfile.signatureUrl} alt="Assinatura" className="h-16 mx-auto object-contain mb-1" />
          ) : (
            <div className="h-12"></div>
          )}
          <h3 className="font-extrabold text-base text-slate-900 uppercase tracking-tight">
            {docName}
          </h3>
          <p className="text-xs font-semibold text-slate-800 uppercase">
            {docSpec}
          </p>
          <p className="text-xs font-mono text-slate-700">
            {docCrm}
          </p>
        </div>
      </div>

    </div>
  );
};
