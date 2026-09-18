import React from 'react';
import { AtestadoDiasData, DoctorProfile } from '../../types';
import { Eye, EyeOff, Search } from 'lucide-react';
import {
  getDoctorDisplayName,
  getDoctorDisplayCrm,
  getDoctorDisplaySpecialty,
  getDisplayLocalData
} from '../../utils/blankHelpers';

interface AtestadoDiasTemplateProps {
  data: AtestadoDiasData;
  onChange: (updated: AtestadoDiasData) => void;
  doctorProfile: DoctorProfile;
  onOpenCidModal?: () => void;
}

export const AtestadoDiasTemplate: React.FC<AtestadoDiasTemplateProps> = ({
  data,
  onChange,
  doctorProfile,
  onOpenCidModal,
}) => {
  const updateField = (field: keyof AtestadoDiasData, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const docName = getDoctorDisplayName(data.medicoNome, doctorProfile.name);
  const docCrm = getDoctorDisplayCrm(data.medicoCrm, data.medicoUf, doctorProfile.crm, doctorProfile.uf);
  const docSpec = getDoctorDisplaySpecialty(data.medicoEspecialidade, doctorProfile.specialty);

  return (
    <div className="bg-white text-slate-900 border border-slate-200 shadow-xl mx-auto w-full max-w-[210mm] min-h-[297mm] p-10 md:p-16 font-sans flex flex-col justify-between print:shadow-none print:border-none print:m-0 print:p-0 print:w-full print:max-w-none">
      
      {/* Top Clinic / Doctor Header */}
      <div>
        <div className="border-b-2 border-emerald-800 pb-6 mb-12 flex justify-between items-start">
          <div className="space-y-1">
            <h1 className="text-xl font-black tracking-tight text-emerald-950 uppercase">
              {docName}
            </h1>
            <p className="text-sm font-semibold text-emerald-800 uppercase tracking-wide">
              {docSpec}
            </p>
            <p className="text-xs font-mono text-slate-600">
              {docCrm}
              {doctorProfile.rqe && ` | RQE ${doctorProfile.rqe}`}
            </p>
            <p className="text-xs text-slate-500 pt-1 font-sans">
              {doctorProfile.clinicName || '_____________________________________________'}
            </p>
          </div>

          <div className="text-right max-w-xs text-xs text-slate-600 space-y-0.5">
            {doctorProfile.logoUrl && (
              <img src={doctorProfile.logoUrl} alt="Logo" className="h-12 ml-auto mb-2 object-contain" />
            )}
            <p className="font-medium text-slate-700">{doctorProfile.clinicAddress || '_____________________________________________'}</p>
            <p>{doctorProfile.clinicPhone ? `Tel: ${doctorProfile.clinicPhone}` : 'Tel: (___) ________-________'}</p>
            {doctorProfile.clinicEmail && <p>{doctorProfile.clinicEmail}</p>}
          </div>
        </div>

        {/* Document Title */}
        <div className="text-center my-12">
          <h2 className="text-2xl font-extrabold uppercase tracking-widest text-slate-900 border-b-2 border-slate-900 inline-block pb-1">
            ATESTADO MÉDICO
          </h2>
        </div>

        {/* Certificate Body Wording */}
        <div className="text-base text-slate-800 leading-relaxed font-serif space-y-8 max-w-2xl mx-auto my-12">
          <p className="text-justify leading-loose">
            Atesto, para os devidos fins de direito, que o(a) Sr(a).{' '}
            <input
              type="text"
              value={data.pacienteNome}
              onChange={(e) => updateField('pacienteNome', e.target.value)}
              className="font-bold border-b-2 border-emerald-700 focus:outline-none focus:bg-emerald-50 px-1 py-0.5 min-w-[280px] font-sans text-slate-900"
              placeholder="_______________________________________"
            />
            , portador(a) do CPF/RG nº{' '}
            <input
              type="text"
              value={data.pacienteRgCpf}
              onChange={(e) => updateField('pacienteRgCpf', e.target.value)}
              className="font-semibold border-b border-slate-400 focus:outline-none focus:bg-emerald-50 px-1 py-0.5 w-48 font-sans text-slate-900"
              placeholder="_______________________"
            />
            , foi por mim examinado(a) nesta data e necessita de{' '}
            <span className="inline-flex items-center gap-1 font-sans">
              <input
                type="number"
                min={1}
                max={365}
                value={data.diasAfastamento}
                onChange={(e) => updateField('diasAfastamento', parseInt(e.target.value) || 1)}
                className="font-black text-lg border-b-2 border-slate-900 w-12 text-center focus:outline-none focus:bg-emerald-50 text-slate-900"
              />
            </span>
            {' '}(
            <input
              type="text"
              value={data.diasAfastamentoExtenso}
              onChange={(e) => updateField('diasAfastamentoExtenso', e.target.value)}
              className="font-semibold border-b border-slate-400 focus:outline-none focus:bg-emerald-50 px-1 py-0.5 w-24 text-center font-sans text-slate-900"
              placeholder="extenso"
            />
            ) dia(s) de repouso e afastamento de suas atividades habituais de trabalho e estudo, a contar do dia{' '}
            <input
              type="date"
              value={data.dataInicio}
              onChange={(e) => updateField('dataInicio', e.target.value)}
              className="font-semibold border-b border-slate-400 focus:outline-none focus:bg-emerald-50 px-1 py-0.5 font-sans text-slate-900 inline-block"
            />
            , por motivo de saúde.
          </p>

          {/* CID-10 Block with Authorization Toggle */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 font-sans text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800 uppercase flex items-center gap-1.5">
                Diagnóstico / CID-10 (Resolução CFM nº 1.851/2008):
              </span>
              <div className="flex items-center gap-2 print:hidden">
                <button
                  type="button"
                  onClick={() => updateField('mostrarCid', !data.mostrarCid)}
                  className={`px-2 py-1 rounded text-[11px] font-medium flex items-center gap-1 transition-colors cursor-pointer ${
                    data.mostrarCid 
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                      : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {data.mostrarCid ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  {data.mostrarCid ? 'CID Visível' : 'CID Oculto'}
                </button>
                {onOpenCidModal && (
                  <button
                    type="button"
                    onClick={onOpenCidModal}
                    className="bg-slate-800 hover:bg-slate-700 text-white px-2 py-1 rounded text-[11px] font-medium flex items-center gap-1 cursor-pointer"
                  >
                    <Search className="w-3 h-3" /> Selecionar CID
                  </button>
                )}
              </div>
            </div>

            {data.mostrarCid ? (
              <div className="flex gap-2 items-center pt-1">
                <input
                  type="text"
                  value={data.cid10Code || ''}
                  onChange={(e) => updateField('cid10Code', e.target.value)}
                  placeholder="Código CID-10 (ex: J06.9)"
                  className="font-mono font-bold text-slate-900 border border-slate-300 rounded px-2 py-1 w-32 uppercase focus:outline-none focus:border-emerald-600 bg-white"
                />
                <input
                  type="text"
                  value={data.cid10Description || ''}
                  onChange={(e) => updateField('cid10Description', e.target.value)}
                  placeholder="Descrição do diagnóstico"
                  className="w-full text-slate-900 border border-slate-300 rounded px-2 py-1 focus:outline-none focus:border-emerald-600 bg-white"
                />
              </div>
            ) : (
              <p className="text-slate-500 italic text-[11px]">
                Diagnóstico codificado (CID-10) omitido por solicitação ou ausência de autorização expressa do paciente, conforme determina o CFM.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Date, Location and Doctor Signature Footer */}
      <div className="mt-auto pt-12 space-y-12">
        <div className="text-center font-serif text-slate-800 text-sm">
          <input
            type="text"
            value={data.localData}
            onChange={(e) => updateField('localData', e.target.value)}
            placeholder={getDisplayLocalData('')}
            className="w-full text-center border-b border-dashed border-slate-400 focus:outline-none focus:bg-emerald-50 py-1 font-serif text-slate-900 text-base font-medium"
          />
        </div>

        <div className="text-center max-w-sm mx-auto border-t-2 border-slate-900 pt-3">
          {doctorProfile.signatureUrl ? (
            <img
              src={doctorProfile.signatureUrl}
              alt="Assinatura"
              className="h-16 mx-auto object-contain mb-1"
            />
          ) : (
            <div className="h-12"></div>
          )}
          <h3 className="font-extrabold text-base text-slate-900 uppercase tracking-tight">
            {docName}
          </h3>
          <p className="text-xs font-semibold text-emerald-800 uppercase">
            {docSpec}
          </p>
          <p className="text-xs font-mono text-slate-700">
            {docCrm}
          </p>
        </div>

        <div className="border-t border-slate-200 pt-3 text-center text-[10px] text-slate-500 font-sans">
          Atestado médico válido em todo o território nacional. A falsificação ou rasura deste documento constitui crime tipificado no Código Penal Brasileiro.
        </div>
      </div>

    </div>
  );
};
