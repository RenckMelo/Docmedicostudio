import React from 'react';
import { ReceitaSimplesData, ReceitaItem, DoctorProfile } from '../../types';
import { Plus, Trash2 } from 'lucide-react';
import {
  getDoctorDisplayName,
  getDoctorDisplayCrm,
  getDoctorDisplaySpecialty,
  getDisplayLocalData
} from '../../utils/blankHelpers';

interface ReceitaSimplesTemplateProps {
  data: ReceitaSimplesData;
  onChange: (updated: ReceitaSimplesData) => void;
  doctorProfile: DoctorProfile;
}

export const ReceitaSimplesTemplate: React.FC<ReceitaSimplesTemplateProps> = ({
  data,
  onChange,
  doctorProfile,
}) => {
  const updateField = (field: keyof ReceitaSimplesData, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const updateItem = (index: number, field: keyof ReceitaItem, value: any) => {
    const updatedItens = [...data.itens];
    updatedItens[index] = { ...updatedItens[index], [field]: value };
    onChange({ ...data, itens: updatedItens });
  };

  const addItem = () => {
    const newItem: ReceitaItem = {
      id: `rec-item-${Date.now()}`,
      medicamento: '',
      concentracao: '',
      formaFarmaceutica: 'Comprimidos',
      quantidade: '1 caixa',
      posologia: '',
      uso: 'Uso Interno'
    };
    onChange({ ...data, itens: [...data.itens, newItem] });
  };

  const removeItem = (index: number) => {
    const updatedItens = data.itens.filter((_, i) => i !== index);
    onChange({ ...data, itens: updatedItens });
  };

  const docName = getDoctorDisplayName(data.medicoNome, doctorProfile.name);
  const docCrm = getDoctorDisplayCrm(data.medicoCrm, data.medicoUf, doctorProfile.crm, doctorProfile.uf);
  const docSpec = getDoctorDisplaySpecialty(data.medicoEspecialidade, doctorProfile.specialty);

  return (
    <div className="bg-white text-slate-900 border border-slate-200 shadow-xl mx-auto w-full max-w-[210mm] min-h-[297mm] p-10 md:p-14 font-sans flex flex-col justify-between print:shadow-none print:border-none print:m-0 print:p-0 print:w-full print:max-w-none">
      
      {/* Top Clinic / Doctor Header */}
      <div>
        <div className="border-b-2 border-teal-800 pb-5 mb-8 flex justify-between items-start">
          <div className="space-y-0.5">
            <h1 className="text-xl font-black tracking-tight text-teal-950 uppercase">
              {docName}
            </h1>
            <p className="text-xs font-bold text-teal-800 uppercase tracking-wide">
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

        {/* Patient Name Section */}
        <div className="bg-slate-50/80 border-y-2 border-slate-800 py-2 px-3 mb-8 flex justify-between items-center">
          <div className="flex-grow flex items-center gap-2">
            <span className="font-extrabold text-xs uppercase text-slate-900 shrink-0">PACIENTE:</span>
            <input
              type="text"
              value={data.pacienteNome}
              onChange={(e) => updateField('pacienteNome', e.target.value)}
              className="w-full font-bold text-base text-slate-900 bg-transparent focus:outline-none focus:bg-white px-1 rounded"
              placeholder="___________________________________________________"
            />
          </div>
          <div className="w-48 flex items-center gap-1 shrink-0 justify-end">
            <span className="font-bold text-[11px] uppercase text-slate-700">CPF:</span>
            <input
              type="text"
              value={data.pacienteCpf || ''}
              onChange={(e) => updateField('pacienteCpf', e.target.value)}
              className="font-mono text-xs font-semibold text-slate-900 bg-transparent focus:outline-none focus:bg-white px-1 py-0.5 border-b border-slate-300 w-32"
              placeholder="000.000.000-00"
            />
          </div>
        </div>

        {/* Prescription Header Title */}
        <div className="flex justify-between items-center mb-6 border-b border-slate-300 pb-2">
          <h2 className="text-lg font-black uppercase tracking-wider text-teal-950 flex items-center gap-2">
            RECEITUÁRIO MÉDICO
          </h2>
          <button
            type="button"
            onClick={addItem}
            className="print:hidden text-xs bg-teal-800 hover:bg-teal-700 text-white font-medium px-3 py-1 rounded shadow flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Adicionar Medicamento
          </button>
        </div>

        {/* Medications List */}
        <div className="space-y-6">
          {data.itens.map((item, index) => (
            <div
              key={item.id || index}
              className="group relative border-l-4 border-teal-700 pl-4 py-2 bg-slate-50/30 hover:bg-teal-50/20 transition-colors rounded-r"
            >
              <div className="flex items-start justify-between gap-3 mb-1">
                <div className="flex-grow grid grid-cols-12 gap-2 items-center">
                  <div className="col-span-2">
                    <select
                      value={item.uso}
                      onChange={(e) => updateItem(index, 'uso', e.target.value)}
                      className="w-full text-[10px] font-bold text-teal-900 uppercase bg-white border border-slate-300 rounded px-1.5 py-1 focus:outline-none focus:border-teal-700 print:border-none print:bg-transparent"
                    >
                      <option value="Uso Interno">Uso Interno</option>
                      <option value="Uso Tópico">Uso Tópico</option>
                      <option value="Uso Inalatório">Uso Inalatório</option>
                      <option value="Uso Oftálmico">Uso Oftálmico</option>
                      <option value="Uso Otológico">Uso Otológico</option>
                      <option value="Outro">Outro</option>
                    </select>
                  </div>
                  <div className="col-span-6">
                    <input
                      type="text"
                      value={item.medicamento}
                      onChange={(e) => updateItem(index, 'medicamento', e.target.value)}
                      placeholder="Nome do Medicamento"
                      className="w-full font-bold text-sm text-slate-900 bg-transparent border-b border-slate-300 focus:outline-none focus:border-teal-700 px-1"
                    />
                  </div>
                  <div className="col-span-2">
                    <input
                      type="text"
                      value={item.concentracao}
                      onChange={(e) => updateItem(index, 'concentracao', e.target.value)}
                      placeholder="Dosagem (ex: 500mg)"
                      className="w-full text-xs font-semibold text-slate-800 bg-transparent border-b border-slate-300 focus:outline-none focus:border-teal-700 px-1 text-center"
                    />
                  </div>
                  <div className="col-span-2 text-right">
                    <input
                      type="text"
                      value={item.quantidade}
                      onChange={(e) => updateItem(index, 'quantidade', e.target.value)}
                      placeholder="Qtd (ex: 1 cx)"
                      className="w-full text-xs font-bold text-slate-900 bg-transparent border-b border-slate-300 focus:outline-none focus:border-teal-700 px-1 text-right"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  className="print:hidden text-slate-400 hover:text-red-600 p-1 rounded"
                  title="Remover medicamento"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Posology Details */}
              <div className="pl-2 mt-1">
                <textarea
                  rows={2}
                  value={item.posologia}
                  onChange={(e) => updateItem(index, 'posologia', e.target.value)}
                  placeholder="Posologia e modo de usar..."
                  className="w-full text-xs text-slate-800 font-serif bg-transparent focus:outline-none focus:bg-white p-1 rounded border border-dashed border-slate-200 focus:border-teal-600"
                />
              </div>
            </div>
          ))}
        </div>

        {/* General Orientations Box */}
        <div className="mt-8 border-t border-slate-200 pt-4">
          <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1">
            Recomendações e Orientações Médicas Gerais ao Paciente:
          </label>
          <textarea
            rows={3}
            value={data.orientacoesGerais || ''}
            onChange={(e) => updateField('orientacoesGerais', e.target.value)}
            placeholder="Orientações adicionais sobre dieta, repouso ou sinais de alarme..."
            className="w-full text-xs text-slate-700 bg-slate-50/50 p-2 border border-slate-200 rounded focus:outline-none focus:border-teal-600"
          />
        </div>
      </div>

      {/* Date, Location and Doctor Signature Footer */}
      <div className="mt-auto pt-10 space-y-8">
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

        <div className="border-t border-slate-200 pt-2 text-center text-[10px] text-slate-500 font-sans">
          {doctorProfile.clinicAddress || '_____________________________________________'} • Tel: {doctorProfile.clinicPhone || '(__) ________-________'}
        </div>
      </div>

    </div>
  );
};
