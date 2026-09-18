import React, { useState } from 'react';
import { DoctorProfile } from '../types';
import { UserCheck, Building2, Award, X, Save, Image as ImageIcon, Eraser, RotateCcw } from 'lucide-react';
import { DEFAULT_DOCTOR_PROFILE } from '../data/mockData';

interface DoctorProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  doctorProfile: DoctorProfile;
  onSave: (updated: DoctorProfile) => void;
}

export const DoctorProfileModal: React.FC<DoctorProfileModalProps> = ({
  isOpen,
  onClose,
  doctorProfile,
  onSave,
}) => {
  const [form, setForm] = useState<DoctorProfile>(doctorProfile);

  if (!isOpen) return null;

  const handleChange = (field: keyof DoctorProfile, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleClear = () => {
    setForm({
      name: '',
      crm: '',
      uf: '',
      specialty: '',
      rqe: '',
      clinicName: '',
      clinicAddress: '',
      clinicPhone: '',
      clinicEmail: '',
      clinicCnpj: '',
      logoUrl: '',
      signatureUrl: '',
      stampText: '',
    });
  };

  const handleRestoreDefault = () => {
    setForm(DEFAULT_DOCTOR_PROFILE);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 print:hidden">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl text-slate-100">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex justify-between items-center bg-slate-950">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-teal-500/10 border border-teal-500/20 text-teal-400">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-100">Dados do Médico & Cabeçalho do Consultório</h2>
              <p className="text-xs text-slate-400">Preencha seus dados ou deixe em branco para carimbo/preenchimento manual no papel.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Form */}
        <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-6 flex-grow">
          
          {/* Quick Preset Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-950/60 border border-slate-800 rounded-xl text-xs">
            <span className="text-slate-400">Ações Rápidas de Preenchimento:</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleClear}
                className="px-2.5 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-lg font-medium transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Eraser className="w-3.5 h-3.5" />
                <span>Deixar em Branco (Imprimir para Carimbo)</span>
              </button>
              <button
                type="button"
                onClick={handleRestoreDefault}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 rounded-lg font-medium transition-colors flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restaurar Exemplo</span>
              </button>
            </div>
          </div>

          {/* Section 1 - Dados Pessoais e Profissionais */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-teal-400 flex items-center gap-1.5">
              <Award className="w-4 h-4" /> Identificação Médica
            </h3>
            
            <div className="grid grid-cols-12 gap-3">
              <div className="col-span-12 sm:col-span-6">
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Nome Completo do Médico (ou deixe em branco):
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="Ex: Dr. Lucas R. Silva ou [em branco]"
                  className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  CRM:
                </label>
                <input
                  type="text"
                  value={form.crm}
                  onChange={(e) => handleChange('crm', e.target.value)}
                  placeholder="148.920"
                  className="w-full font-mono bg-slate-800/80 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  UF do CRM:
                </label>
                <input
                  type="text"
                  value={form.uf}
                  onChange={(e) => handleChange('uf', e.target.value)}
                  placeholder="SP"
                  className="w-full uppercase font-bold bg-slate-800/80 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-teal-500 text-center"
                />
              </div>

              <div className="col-span-12 sm:col-span-8">
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Especialidade Principal:
                </label>
                <input
                  type="text"
                  value={form.specialty}
                  onChange={(e) => handleChange('specialty', e.target.value)}
                  placeholder="Medicina Clínica"
                  className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="col-span-12 sm:col-span-4">
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  RQE (opcional):
                </label>
                <input
                  type="text"
                  value={form.rqe || ''}
                  onChange={(e) => handleChange('rqe', e.target.value)}
                  placeholder="Ex: 89.412"
                  className="w-full font-mono bg-slate-800/80 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>
          </div>

          {/* Section 2 - Dados da Clínica */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-teal-400 flex items-center gap-1.5">
              <Building2 className="w-4 h-4" /> Dados do Consultório / Clínica
            </h3>

            <div className="grid grid-cols-12 gap-3">
              <div className="col-span-12 sm:col-span-8">
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Nome da Clínica / Hospital:
                </label>
                <input
                  type="text"
                  value={form.clinicName}
                  onChange={(e) => handleChange('clinicName', e.target.value)}
                  placeholder="Nome do estabelecimento"
                  className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="col-span-12 sm:col-span-4">
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  CNPJ (opcional):
                </label>
                <input
                  type="text"
                  value={form.clinicCnpj || ''}
                  onChange={(e) => handleChange('clinicCnpj', e.target.value)}
                  placeholder="00.000.000/0001-00"
                  className="w-full font-mono bg-slate-800/80 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="col-span-12">
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Endereço Completo do Consultório:
                </label>
                <input
                  type="text"
                  value={form.clinicAddress}
                  onChange={(e) => handleChange('clinicAddress', e.target.value)}
                  placeholder="Rua, Número, Bairro, Cidade - UF"
                  className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="col-span-12 sm:col-span-6">
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Telefone de Contato:
                </label>
                <input
                  type="text"
                  value={form.clinicPhone}
                  onChange={(e) => handleChange('clinicPhone', e.target.value)}
                  placeholder="(00) 0000-0000"
                  className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="col-span-12 sm:col-span-6">
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  E-mail de Contato:
                </label>
                <input
                  type="email"
                  value={form.clinicEmail || ''}
                  onChange={(e) => handleChange('clinicEmail', e.target.value)}
                  placeholder="contato@clinica.com.br"
                  className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>
          </div>

          {/* Section 3 - Personalização Visual (Logo & Assinatura) */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-teal-400 flex items-center gap-1.5">
              <ImageIcon className="w-4 h-4" /> Logo e Assinatura Digital
            </h3>

            <div className="grid grid-cols-12 gap-3">
              <div className="col-span-12 sm:col-span-6">
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  URL da Logomarca (PNG/SVG transparente):
                </label>
                <input
                  type="text"
                  value={form.logoUrl || ''}
                  onChange={(e) => handleChange('logoUrl', e.target.value)}
                  placeholder="https://exemplo.com/logo.png"
                  className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-teal-500 font-mono"
                />
              </div>

              <div className="col-span-12 sm:col-span-6">
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  URL da Assinatura Digitalizada:
                </label>
                <input
                  type="text"
                  value={form.signatureUrl || ''}
                  onChange={(e) => handleChange('signatureUrl', e.target.value)}
                  placeholder="https://exemplo.com/assinatura.png"
                  className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-teal-500 font-mono"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-sm font-bold bg-teal-500 hover:bg-teal-400 text-slate-950 transition-all flex items-center gap-2 shadow-lg shadow-teal-500/20 cursor-pointer"
            >
              <Save className="w-4 h-4" /> Salvar Alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
