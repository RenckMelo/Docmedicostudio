import React from 'react';
import { DocumentType, DoctorProfile } from '../types';
import { 
  Stethoscope, 
  Lock, 
  Printer, 
  Download, 
  Sparkles, 
  RotateCcw, 
  UserCheck, 
  Users, 
  ChevronDown 
} from 'lucide-react';
import { DOCUMENT_TYPES_CONFIG } from './DocumentSelector';

interface HeaderProps {
  currentType: DocumentType;
  onSelectType: (type: DocumentType) => void;
  onLock: () => void;
  onOpenDoctorProfile: () => void;
  onOpenPatientManager: () => void;
  onFillSampleData: () => void;
  onClearData: () => void;
  onPrint: () => void;
  onDownloadPdf: () => void;
  doctorProfile: DoctorProfile;
}

export const Header: React.FC<HeaderProps> = ({
  currentType,
  onSelectType,
  onLock,
  onOpenDoctorProfile,
  onOpenPatientManager,
  onFillSampleData,
  onClearData,
  onPrint,
  onDownloadPdf,
  doctorProfile,
}) => {
  const currentConfig = DOCUMENT_TYPES_CONFIG.find(d => d.id === currentType);

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 text-slate-100 print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        
        {/* Brand & Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 shadow-lg shadow-teal-950">
            <Stethoscope className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-base tracking-tight text-slate-100">
                DocMédico <span className="text-teal-400 font-serif italic">Studio</span>
              </h1>
              <span className="text-[10px] font-bold bg-teal-500/10 text-teal-300 border border-teal-500/20 px-2 py-0.5 rounded-full uppercase">
                Oficial
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Emissão e Edição de Documentos Médicos Universais
            </p>
          </div>
        </div>

        {/* Quick Document Dropdown for Mobile / Compact View */}
        <div className="relative md:hidden flex-grow max-w-[180px]">
          <select
            value={currentType}
            onChange={(e) => onSelectType(e.target.value as DocumentType)}
            className="w-full bg-slate-900 border border-slate-700 text-slate-200 text-xs font-bold rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-teal-500 appearance-none pr-7"
          >
            {DOCUMENT_TYPES_CONFIG.map(doc => (
              <option key={doc.id} value={doc.id}>
                {doc.title}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          
          {/* Fill Sample Preset */}
          <button
            type="button"
            onClick={onFillSampleData}
            title="Preencher com Dados Exemplo"
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-teal-300 text-xs font-semibold transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-teal-400" />
            <span>Exemplo</span>
          </button>

          {/* Patient Manager */}
          <button
            type="button"
            onClick={onOpenPatientManager}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white text-xs font-medium transition-all cursor-pointer"
          >
            <Users className="w-3.5 h-3.5 text-teal-400" />
            <span>Pacientes</span>
          </button>

          {/* Doctor Profile */}
          <button
            type="button"
            onClick={onOpenDoctorProfile}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white text-xs font-medium transition-all cursor-pointer"
          >
            <UserCheck className="w-3.5 h-3.5 text-teal-400" />
            <span className="hidden md:inline">{doctorProfile.name.split(' ')[0]} {doctorProfile.name.split(' ')[1] || ''}</span>
            <span className="md:hidden">Perfil</span>
          </button>

          <div className="h-4 w-px bg-slate-800 mx-1 hidden sm:block" />

          {/* Download PDF */}
          <button
            type="button"
            onClick={onDownloadPdf}
            className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-100 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-teal-400" />
            <span className="hidden sm:inline">Baixar PDF</span>
          </button>

          {/* Print Button */}
          <button
            type="button"
            onClick={onPrint}
            className="px-3.5 py-1.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shadow-teal-500/20"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Imprimir</span>
          </button>

          {/* Security Lock Button */}
          <button
            type="button"
            onClick={onLock}
            title="Trancar Sessão (Requer Senha 9669)"
            className="p-2 rounded-xl bg-slate-900 hover:bg-red-950/50 border border-slate-800 hover:border-red-800/50 text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
          >
            <Lock className="w-4 h-4" />
          </button>

        </div>
      </div>
    </header>
  );
};
