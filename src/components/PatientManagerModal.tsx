import React, { useState } from 'react';
import { Patient } from '../types';
import { Users, UserPlus, Search, Check, X, CreditCard, Calendar, MapPin, Phone } from 'lucide-react';

interface PatientManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  patients: Patient[];
  onSelectPatient: (patient: Patient) => void;
  onAddPatient: (patient: Patient) => void;
}

export const PatientManagerModal: React.FC<PatientManagerModalProps> = ({
  isOpen,
  onClose,
  patients,
  onSelectPatient,
  onAddPatient,
}) => {
  const [search, setSearch] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [newPatient, setNewPatient] = useState<Partial<Patient>>({
    name: '',
    cpf: '',
    cns: '',
    birthDate: '',
    motherName: '',
    rg: '',
    address: '',
    cityState: 'São Paulo - SP',
    phone: '',
    weight: '',
    height: '',
    sex: 'F'
  });

  if (!isOpen) return null;

  const filtered = patients.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.cpf.includes(search) ||
    p.cns.includes(search)
  );

  const handleSaveNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPatient.name) return;
    const created: Patient = {
      id: `pat-${Date.now()}`,
      name: newPatient.name || '',
      cpf: newPatient.cpf || '',
      cns: newPatient.cns || '',
      birthDate: newPatient.birthDate || '',
      motherName: newPatient.motherName || '',
      rg: newPatient.rg || '',
      address: newPatient.address || '',
      cityState: newPatient.cityState || '',
      phone: newPatient.phone || '',
      weight: newPatient.weight || '',
      height: newPatient.height || '',
      sex: newPatient.sex || 'F'
    };
    onAddPatient(created);
    onSelectPatient(created);
    setIsAdding(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 print:hidden">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl text-slate-100">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex justify-between items-center bg-slate-950">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-teal-500/10 border border-teal-500/20 text-teal-400">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-100">Gerenciador e Seleção de Pacientes</h2>
              <p className="text-xs text-slate-400">Selecione um paciente cadastrado para preencher o documento instantaneamente.</p>
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

        {/* Content Area */}
        <div className="p-6 overflow-y-auto flex-grow space-y-4">
          
          {/* Top Bar with Search & Add Patient Button */}
          <div className="flex items-center justify-between gap-3">
            <div className="relative flex-grow">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar por Nome, CPF ou Cartão SUS (CNS)..."
                className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-sm text-slate-100 focus:outline-none focus:border-teal-500"
              />
            </div>
            <button
              type="button"
              onClick={() => setIsAdding(!isAdding)}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-teal-500 hover:bg-teal-400 text-slate-950 transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
            >
              <UserPlus className="w-4 h-4" />
              {isAdding ? 'Ver Lista' : 'Novo Paciente'}
            </button>
          </div>

          {/* New Patient Form Accordion */}
          {isAdding ? (
            <form onSubmit={handleSaveNew} className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-teal-400">
                Cadastrar Novo Paciente
              </h3>
              <div className="grid grid-cols-12 gap-3 text-xs">
                <div className="col-span-8">
                  <label className="block text-slate-300 mb-1 font-semibold">Nome Completo:</label>
                  <input
                    type="text"
                    required
                    value={newPatient.name}
                    onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div className="col-span-4">
                  <label className="block text-slate-300 mb-1 font-semibold">CPF:</label>
                  <input
                    type="text"
                    value={newPatient.cpf}
                    onChange={(e) => setNewPatient({ ...newPatient, cpf: e.target.value })}
                    className="w-full font-mono bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none"
                    placeholder="000.000.000-00"
                  />
                </div>
                <div className="col-span-6">
                  <label className="block text-slate-300 mb-1 font-semibold">Cartão SUS (CNS):</label>
                  <input
                    type="text"
                    value={newPatient.cns}
                    onChange={(e) => setNewPatient({ ...newPatient, cns: e.target.value })}
                    className="w-full font-mono bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none"
                  />
                </div>
                <div className="col-span-6">
                  <label className="block text-slate-300 mb-1 font-semibold">Data de Nascimento:</label>
                  <input
                    type="date"
                    value={newPatient.birthDate}
                    onChange={(e) => setNewPatient({ ...newPatient, birthDate: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none"
                  />
                </div>
                <div className="col-span-8">
                  <label className="block text-slate-300 mb-1 font-semibold">Nome da Mãe:</label>
                  <input
                    type="text"
                    value={newPatient.motherName}
                    onChange={(e) => setNewPatient({ ...newPatient, motherName: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none"
                  />
                </div>
                <div className="col-span-4">
                  <label className="block text-slate-300 mb-1 font-semibold">Telefone:</label>
                  <input
                    type="text"
                    value={newPatient.phone}
                    onChange={(e) => setNewPatient({ ...newPatient, phone: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none"
                  />
                </div>
                <div className="col-span-12">
                  <label className="block text-slate-300 mb-1 font-semibold">Endereço:</label>
                  <input
                    type="text"
                    value={newPatient.address}
                    onChange={(e) => setNewPatient({ ...newPatient, address: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:bg-slate-800"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg text-xs font-bold bg-teal-500 hover:bg-teal-400 text-slate-950"
                >
                  Cadastrar e Selecionar
                </button>
              </div>
            </form>
          ) : null}

          {/* Patient Cards List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filtered.map((patient) => (
              <div
                key={patient.id}
                className="bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 rounded-xl p-4 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-sm text-slate-100 group-hover:text-teal-300">
                      {patient.name}
                    </h3>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-900 text-teal-400 border border-slate-700">
                      {patient.sex === 'M' ? 'Masc' : 'Fem'}
                    </span>
                  </div>

                  <div className="space-y-1 text-xs text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <CreditCard className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                      <span className="font-mono">CPF: {patient.cpf || 'Não informado'}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                      <span>CNS: <span className="font-mono text-slate-300">{patient.cns || 'N/A'}</span></span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                      <span className="truncate">{patient.address}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-700/50 flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      onSelectPatient(patient);
                      onClose();
                    }}
                    className="w-full bg-teal-500/10 hover:bg-teal-500 text-teal-300 hover:text-slate-950 border border-teal-500/30 font-bold text-xs py-1.5 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Check className="w-4 h-4" /> Preencher Documento
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};
