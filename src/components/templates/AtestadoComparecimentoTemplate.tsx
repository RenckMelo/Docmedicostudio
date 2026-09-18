import React from 'react';
import { AtestadoComparecimentoData, DoctorProfile } from '../../types';
import {
  getDoctorDisplayName,
  getDoctorDisplayCrm,
  getDoctorDisplaySpecialty,
  getDisplayLocalData
} from '../../utils/blankHelpers';

interface AtestadoComparecimentoTemplateProps {
  data: AtestadoComparecimentoData;
  onChange: (updated: AtestadoComparecimentoData) => void;
  doctorProfile: DoctorProfile;
}

export const AtestadoComparecimentoTemplate: React.FC<AtestadoComparecimentoTemplateProps> = ({
  data,
  onChange,
  doctorProfile,
}) => {
  const updateField = (field: keyof AtestadoComparecimentoData, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const docName = getDoctorDisplayName(data.medicoNome, doctorProfile.name);
  const docCrm = getDoctorDisplayCrm(data.medicoCrm, data.medicoUf, doctorProfile.crm, doctorProfile.uf);
  const docSpec = getDoctorDisplaySpecialty(data.medicoEspecialidade, doctorProfile.specialty);

  return (
    <div className="bg-white text-slate-900 border border-slate-200 shadow-xl mx-auto w-full max-w-[210mm] min-h-[297mm] p-10 md:p-16 font-sans flex flex-col justify-between print:shadow-none print:border-none print:m-0 print:p-0 print:w-full print:max-w-none">
      
      {/* Top Clinic / Doctor Header */}
      <div>
        <div className="border-b-2 border-teal-800 pb-6 mb-12 flex justify-between items-start">
          <div className="space-y-1">
            <h1 className="text-xl font-black tracking-tight text-teal-950 uppercase">
              {docName}
            </h1>
            <p className="text-sm font-semibold text-teal-800 uppercase tracking-wide">
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
            ATESTADO DE COMPARECIMENTO
          </h2>
        </div>

        {/* Certificate Body Wording */}
        <div className="text-base text-slate-800 leading-relaxed font-serif space-y-6 max-w-2xl mx-auto my-12">
          <p className="text-justify">
            Atesto, para os devidos fins de direito e comprovação perante a quem possa interessar, que o(a) Sr(a).{' '}
            <input
              type="text"
              value={data.pacienteNome}
              onChange={(e) => updateField('pacienteNome', e.target.value)}
              className="font-bold border-b-2 border-teal-700 focus:outline-none focus:bg-teal-50 px-1 py-0.5 min-w-[280px] font-sans text-slate-900"
              placeholder="_______________________________________"
            />
            , portador(a) do documento de identificação{' '}
            <input
              type="text"
              value={data.pacienteRgCpf}
              onChange={(e) => updateField('pacienteRgCpf', e.target.value)}
              className="font-semibold border-b border-slate-400 focus:outline-none focus:bg-teal-50 px-1 py-0.5 w-44 font-sans text-slate-900"
              placeholder="_______________________"
            />
            , compareceu a este serviço médico e esteve sob meus cuidados no dia{' '}
            <input
              type="date"
              value={data.dataComparecimento}
              onChange={(e) => updateField('dataComparecimento', e.target.value)}
              className="font-semibold border-b border-slate-400 focus:outline-none focus:bg-teal-50 px-1 py-0.5 font-sans text-slate-900 inline-block"
            />
            , no período compreendido das{' '}
            <input
              type="text"
              value={data.horarioInicio}
              onChange={(e) => updateField('horarioInicio', e.target.value)}
              className="font-semibold border-b border-slate-400 focus:outline-none focus:bg-teal-50 px-1 py-0.5 w-16 text-center font-sans text-slate-900"
              placeholder="08:00"
            />
            {' '}às{' '}
            <input
              type="text"
              value={data.horarioFim}
              onChange={(e) => updateField('horarioFim', e.target.value)}
              className="font-semibold border-b border-slate-400 focus:outline-none focus:bg-teal-50 px-1 py-0.5 w-16 text-center font-sans text-slate-900"
              placeholder="11:30"
            />
            , para a finalidade de{' '}
            <input
              type="text"
              value={data.finalidade}
              onChange={(e) => updateField('finalidade', e.target.value)}
              className="font-medium border-b border-slate-400 focus:outline-none focus:bg-teal-50 px-1 py-0.5 w-full mt-2 font-sans text-slate-900"
              placeholder="Ex: realização de consulta médica e exames laboratoriais"
            />
            .
          </p>

          {data.observacoes !== undefined && (
            <div className="pt-4 border-t border-slate-200 text-sm font-sans text-slate-700 italic">
              <strong>Observações complementares:</strong>
              <textarea
                rows={2}
                value={data.observacoes}
                onChange={(e) => updateField('observacoes', e.target.value)}
                placeholder="Observações complementares..."
                className="w-full mt-1 p-2 border border-slate-300 rounded focus:outline-none text-slate-800 not-italic bg-slate-50/50"
              />
            </div>
          )}
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
            className="w-full text-center border-b border-dashed border-slate-400 focus:outline-none focus:bg-teal-50 py-1 font-serif text-slate-900 text-base font-medium"
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
          <p className="text-xs font-semibold text-teal-800 uppercase">
            {docSpec}
          </p>
          <p className="text-xs font-mono text-slate-700">
            {docCrm}
          </p>
        </div>

        <div className="border-t border-slate-200 pt-3 text-center text-[10px] text-slate-500 font-sans">
          Atestado emitido sob a responsabilidade do profissional médico identificado acima, nos termos da legislação sanitária e do Conselho Federal de Medicina.
        </div>
      </div>

    </div>
  );
};
