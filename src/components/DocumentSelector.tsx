import React from 'react';
import { DocumentType } from '../types';
import { FileText, ClipboardList, ShieldAlert, Award, Send, Activity, Pill } from 'lucide-react';

interface DocumentSelectorProps {
  currentType: DocumentType;
  onSelect: (type: DocumentType) => void;
}

export const DOCUMENT_TYPES_CONFIG: {
  id: DocumentType;
  title: string;
  badge: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}[] = [
  {
    id: 'lme',
    title: 'LME - Medicamentos SUS',
    badge: 'Oficial SUS',
    description: 'Laudo de Solicitação, Avaliação e Autorização de Medicamentos do Componente Especializado.',
    icon: Pill,
    color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:border-emerald-500',
  },
  {
    id: 'atestado_comparecimento',
    title: 'Atestado de Comparecimento',
    badge: 'Declaração',
    description: 'Comprovação de presença em consulta ou exames médicos com registro de horários.',
    icon: Award,
    color: 'bg-teal-500/10 text-teal-400 border-teal-500/30 hover:border-teal-500',
  },
  {
    id: 'atestado_dias',
    title: 'Atestado de Afastamento',
    badge: 'Licença Médica',
    description: 'Atestado de dias de repouso por motivo de saúde com opção de resguardo de CID-10.',
    icon: ShieldAlert,
    color: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30 hover:border-cyan-500',
  },
  {
    id: 'receita_simples',
    title: 'Receita Simples',
    badge: 'Prescrição',
    description: 'Receituário médico padrão para medicamentos isentos e tarjados comuns.',
    icon: FileText,
    color: 'bg-blue-500/10 text-blue-400 border-blue-500/30 hover:border-blue-500',
  },
  {
    id: 'receita_controle',
    title: 'Receita de Controle Especial',
    badge: 'Portaria 344/98',
    description: 'Receita C1 de controle especial branca em 1ª e 2ª vias para medicamentos psicotrópicos.',
    icon: ClipboardList,
    color: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30 hover:border-indigo-500',
  },
  {
    id: 'encaminhamento',
    title: 'Encaminhamento Médico',
    badge: 'Especialidades',
    description: 'Solicitação de avaliação especializada com histórico clínico e hipótese diagnóstica.',
    icon: Send,
    color: 'bg-purple-500/10 text-purple-400 border-purple-500/30 hover:border-purple-500',
  },
  {
    id: 'apac',
    title: 'APAC - Laudo SUS',
    badge: 'Procedimentos SIA',
    description: 'Laudo para autorização de procedimentos ambulatoriais de alta complexidade no SUS.',
    icon: Activity,
    color: 'bg-amber-500/10 text-amber-400 border-amber-500/30 hover:border-amber-500',
  },
];

export const DocumentSelector: React.FC<DocumentSelectorProps> = ({ currentType, onSelect }) => {
  return (
    <div className="print:hidden mb-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
          <span>Modelos Oficiais de Documentos Médicos</span>
          <span className="text-xs bg-slate-800 text-slate-400 font-normal px-2 py-0.5 rounded-full">
            7 Modelos
          </span>
        </h2>
      </div>

      {/* Horizontal Scrollable/Grid Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2.5">
        {DOCUMENT_TYPES_CONFIG.map((doc) => {
          const Icon = doc.icon;
          const isActive = currentType === doc.id;
          return (
            <button
              key={doc.id}
              type="button"
              onClick={() => onSelect(doc.id)}
              className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between cursor-pointer group ${
                isActive
                  ? 'bg-slate-800 border-teal-400 shadow-lg shadow-teal-950/50 ring-1 ring-teal-400'
                  : 'bg-slate-900/80 hover:bg-slate-800/90 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-2 rounded-lg border ${doc.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold tracking-tight px-1.5 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                    {doc.badge}
                  </span>
                </div>
                <h3 className={`text-xs font-bold leading-snug ${isActive ? 'text-teal-300' : 'text-slate-200 group-hover:text-white'}`}>
                  {doc.title}
                </h3>
              </div>
              <p className="text-[10px] text-slate-400 line-clamp-2 mt-2 font-sans">
                {doc.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};
