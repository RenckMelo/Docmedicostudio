import React from 'react';
import { ReceitaControleData, ReceitaControleItem, DoctorProfile } from '../../types';
import { Plus, Trash2, Copy } from 'lucide-react';
import {
  getDoctorDisplayName,
  getDoctorDisplayCrm,
  getDisplayLocalData
} from '../../utils/blankHelpers';

interface ReceitaControleTemplateProps {
  data: ReceitaControleData;
  onChange: (updated: ReceitaControleData) => void;
  doctorProfile: DoctorProfile;
}

export const ReceitaControleTemplate: React.FC<ReceitaControleTemplateProps> = ({
  data,
  onChange,
  doctorProfile,
}) => {
  const updateField = (field: keyof ReceitaControleData, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const updateItem = (index: number, field: keyof ReceitaControleItem, value: any) => {
    const updated = [...data.itens];
    updated[index] = { ...updated[index], [field]: value };
    onChange({ ...data, itens: updated });
  };

  const addItem = () => {
    if (data.itens.length >= 3) return; // Controlled drugs limited to max 3 per C1 prescription
    const newItem: ReceitaControleItem = {
      id: `ctrl-item-${Date.now()}`,
      medicamento: '',
      posologia: '',
      quantidadeNum: '01',
      quantidadeExtenso: 'uma caixa'
    };
    onChange({ ...data, itens: [...data.itens, newItem] });
  };

  const removeItem = (index: number) => {
    const updated = data.itens.filter((_, i) => i !== index);
    onChange({ ...data, itens: updated });
  };

  const docName = getDoctorDisplayName(data.emissorNome, doctorProfile.name);
  const docCrm = getDoctorDisplayCrm(data.emissorCrm, data.emissorUf, doctorProfile.crm, doctorProfile.uf);

  const renderSingleVia = (viaTitle: string, viaBadge: string) => (
    <div className="border-2 border-slate-900 p-4 bg-white text-slate-900 text-xs font-sans mb-6 last:mb-0 relative">
      
      {/* Header Prescritor */}
      <div className="border-b-2 border-slate-900 pb-3 mb-3 flex justify-between items-start">
        <div>
          <h1 className="font-black text-sm uppercase text-slate-900 tracking-tight">
            RECEITUÁRIO DE CONTROLE ESPECIAL
          </h1>
          <p className="font-extrabold text-xs text-slate-800">
            {docName}
          </p>
          <p className="text-[10px] text-slate-700 font-mono">
            {docCrm}
          </p>
          <p className="text-[10px] text-slate-600">
            {doctorProfile.clinicAddress || data.emissorEndereco || '_____________________________________________'}
          </p>
          <p className="text-[10px] text-slate-600">
            Tel: {doctorProfile.clinicPhone || data.emissorTelefone || '(__) ________-________'}
          </p>
        </div>

        <div className="text-right flex flex-col items-end">
          <span className="inline-block bg-slate-900 text-white font-black text-[10px] px-2 py-0.5 uppercase tracking-widest mb-1">
            {viaBadge}
          </span>
          <span className="text-[9px] font-bold text-slate-700 uppercase border border-slate-900 px-1.5 py-0.5">
            {viaTitle}
          </span>
        </div>
      </div>

      {/* Paciente Section */}
      <div className="border border-slate-800 p-2 mb-3 bg-slate-50/50">
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-12">
            <label className="block text-[9px] font-bold text-slate-700 uppercase">
              PACIENTE:
            </label>
            <input
              type="text"
              value={data.pacienteNome}
              onChange={(e) => updateField('pacienteNome', e.target.value)}
              className="w-full font-bold text-sm text-slate-900 bg-transparent border-b border-slate-400 focus:outline-none px-1"
              placeholder="Nome completo do paciente"
            />
          </div>
          <div className="col-span-12">
            <label className="block text-[9px] font-bold text-slate-700 uppercase">
              ENDEREÇO DO PACIENTE:
            </label>
            <input
              type="text"
              value={data.pacienteEndereco}
              onChange={(e) => updateField('pacienteEndereco', e.target.value)}
              className="w-full text-xs text-slate-900 bg-transparent border-b border-slate-400 focus:outline-none px-1"
              placeholder="Rua, Número, Bairro, Cidade / UF"
            />
          </div>
        </div>
      </div>

      {/* Prescription Drugs Section */}
      <div className="border border-slate-800 p-2 mb-3">
        <div className="flex justify-between items-center border-b border-slate-400 pb-1 mb-2">
          <span className="font-extrabold text-[10px] uppercase text-slate-900">
            PRESCRIÇÃO (MEDICAMENTOS DE CONTROLE ESPECIAL)
          </span>
          <button
            type="button"
            onClick={addItem}
            className="print:hidden text-[10px] bg-slate-800 hover:bg-slate-700 text-white px-2 py-0.5 rounded font-medium flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3 h-3" /> Add Medicamento
          </button>
        </div>

        <div className="space-y-3">
          {data.itens.map((item, idx) => (
            <div key={item.id || idx} className="border-b border-slate-300 pb-2 last:border-none">
              <div className="flex justify-between items-start gap-2">
                <div className="flex-grow">
                  <input
                    type="text"
                    value={item.medicamento}
                    onChange={(e) => updateItem(idx, 'medicamento', e.target.value)}
                    placeholder="Nome do Medicamento Controlado + Dosagem"
                    className="w-full font-bold text-xs text-slate-900 bg-transparent border-b border-slate-300 focus:outline-none"
                  />
                  <input
                    type="text"
                    value={item.posologia}
                    onChange={(e) => updateItem(idx, 'posologia', e.target.value)}
                    placeholder="Posologia detalhada"
                    className="w-full text-[11px] text-slate-800 font-serif bg-transparent focus:outline-none mt-0.5"
                  />
                </div>

                <div className="w-36 text-right shrink-0">
                  <div className="flex items-center justify-end gap-1">
                    <span className="text-[9px] font-bold text-slate-600">QTD:</span>
                    <input
                      type="text"
                      value={item.quantidadeNum}
                      onChange={(e) => updateItem(idx, 'quantidadeNum', e.target.value)}
                      className="w-8 font-black text-xs text-center border-b border-slate-400 bg-transparent focus:outline-none"
                    />
                  </div>
                  <input
                    type="text"
                    value={item.quantidadeExtenso}
                    onChange={(e) => updateItem(idx, 'quantidadeExtenso', e.target.value)}
                    placeholder="por extenso"
                    className="w-full text-[9px] italic text-slate-700 text-right bg-transparent focus:outline-none"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => removeItem(idx)}
                  className="print:hidden text-slate-400 hover:text-red-600 p-0.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Date & Prescriber Signature */}
      <div className="grid grid-cols-12 gap-2 border-t-2 border-slate-900 pt-2 mb-3 items-end">
        <div className="col-span-6">
          <label className="block text-[8px] font-bold text-slate-600 uppercase">
            LOCAL E DATA DE EMISSÃO:
          </label>
          <input
            type="text"
            value={data.localData}
            onChange={(e) => updateField('localData', e.target.value)}
            placeholder={getDisplayLocalData('')}
            className="w-full font-serif text-xs font-medium text-slate-900 bg-transparent border-b border-slate-400 focus:outline-none"
          />
        </div>

        <div className="col-span-6 text-center border-t border-slate-800 pt-1">
          {doctorProfile.signatureUrl ? (
            <img src={doctorProfile.signatureUrl} alt="Assinatura" className="h-10 mx-auto object-contain" />
          ) : (
            <div className="h-8"></div>
          )}
          <p className="font-extrabold text-[10px] text-slate-900 uppercase">
            {docName}
          </p>
          <p className="text-[9px] font-mono text-slate-700">
            {docCrm}
          </p>
        </div>
      </div>

      {/* Two Columns: BUYER & SUPPLIER (COM PRADOR E FARMÁCIA) */}
      <div className="grid grid-cols-2 gap-2 text-[9px] border-t-2 border-slate-900 pt-2">
        {/* Comprador Box */}
        <div className="border border-slate-800 p-1.5 space-y-1 bg-slate-50/30">
          <div className="font-extrabold text-[9px] uppercase border-b border-slate-400 pb-0.5 text-slate-900">
            IDENTIFICAÇÃO DO COMPRADOR
          </div>
          <div>
            <span className="font-bold text-slate-700">NOME: </span>
            <input
              type="text"
              value={data.compradorNome || ''}
              onChange={(e) => updateField('compradorNome', e.target.value)}
              placeholder="Nome do comprador"
              className="w-full border-b border-slate-300 bg-transparent focus:outline-none"
            />
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
              <span className="font-bold text-slate-700">IDENTIDADE: </span>
              <input
                type="text"
                value={data.compradorIdentidade || ''}
                onChange={(e) => updateField('compradorIdentidade', e.target.value)}
                placeholder="RG / Órgão"
                className="w-full border-b border-slate-300 bg-transparent focus:outline-none"
              />
            </div>
            <div className="w-20">
              <span className="font-bold text-slate-700">TEL: </span>
              <input
                type="text"
                value={data.compradorTelefone || ''}
                onChange={(e) => updateField('compradorTelefone', e.target.value)}
                placeholder="Telefone"
                className="w-full border-b border-slate-300 bg-transparent focus:outline-none"
              />
            </div>
          </div>
          <div>
            <span className="font-bold text-slate-700">ENDEREÇO: </span>
            <input
              type="text"
              value={data.compradorEndereco || ''}
              onChange={(e) => updateField('compradorEndereco', e.target.value)}
              placeholder="Endereço do comprador"
              className="w-full border-b border-slate-300 bg-transparent focus:outline-none"
            />
          </div>
        </div>

        {/* Farmácia Box */}
        <div className="border border-slate-800 p-1.5 space-y-1 bg-slate-50/30">
          <div className="font-extrabold text-[9px] uppercase border-b border-slate-400 pb-0.5 text-slate-900">
            IDENTIFICAÇÃO DO FORNECEDOR (FARMÁCIA)
          </div>
          <div>
            <span className="font-bold text-slate-700">RAZÃO SOCIAL / NOME: </span>
            <input
              type="text"
              value={data.farmaciaNome || ''}
              onChange={(e) => updateField('farmaciaNome', e.target.value)}
              placeholder="Carimbo do estabelecimento"
              className="w-full border-b border-slate-300 bg-transparent focus:outline-none"
            />
          </div>
          <div className="pt-4 text-center border-t border-dashed border-slate-400 mt-2">
            <span className="text-[8px] text-slate-500 uppercase">Assinatura do Farmacêutico / Data de Atendimento</span>
          </div>
        </div>
      </div>

    </div>
  );

  return (
    <div className="bg-white text-slate-900 border border-slate-200 shadow-xl mx-auto w-full max-w-[210mm] min-h-[297mm] p-6 md:p-10 font-sans print:shadow-none print:border-none print:m-0 print:p-0 print:w-full print:max-w-none">
      
      {/* Visual Controls for Dual Via Toggle */}
      <div className="print:hidden mb-4 bg-slate-100 p-3 rounded-lg border border-slate-300 flex items-center justify-between">
        <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
          <Copy className="w-4 h-4 text-teal-700" />
          Receita de Controle Especial - Portaria SVS/MS nº 344/98
        </span>
        <button
          type="button"
          onClick={() => updateField('mostrarSegundaViaMesmaPagina', !data.mostrarSegundaViaMesmaPagina)}
          className={`px-3 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
            data.mostrarSegundaViaMesmaPagina 
              ? 'bg-teal-700 text-white shadow' 
              : 'bg-slate-200 text-slate-700'
          }`}
        >
          {data.mostrarSegundaViaMesmaPagina ? 'Exibindo 1ª e 2ª Via no mesmo A4' : 'Exibindo apenas 1ª Via'}
        </button>
      </div>

      {/* 1ª VIA */}
      {renderSingleVia('1ª VIA - ESTABELECIMENTO DE SAÚDE', '1ª VIA')}

      {/* 2ª VIA */}
      {data.mostrarSegundaViaMesmaPagina && (
        <>
          <div className="my-4 border-b-2 border-dashed border-slate-400 relative text-center">
            <span className="bg-white px-3 text-[10px] font-bold text-slate-500 font-mono relative -top-2">
              SEPARADOR DE VIAS (CORTE AQUI)
            </span>
          </div>
          {renderSingleVia('2ª VIA - PACIENTE / ATENDIMENTO', '2ª VIA')}
        </>
      )}

    </div>
  );
};
