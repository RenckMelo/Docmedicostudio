import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  DocumentType, 
  DoctorProfile, 
  Patient, 
  CID10,
  LMEData,
  AtestadoComparecimentoData,
  AtestadoDiasData,
  ReceitaSimplesData,
  ReceitaControleData,
  EncaminhamentoData,
  APACData
} from './types';
import { safeLocalStorage, safeSessionStorage } from './utils/storage';
import { 
  DEFAULT_DOCTOR_PROFILE, 
  MOCK_PATIENTS, 
  INITIAL_LME_SAMPLE,
  INITIAL_ATESTADO_COMPARECIMENTO_SAMPLE,
  INITIAL_ATESTADO_DIAS_SAMPLE,
  INITIAL_RECEITA_SIMPLES_SAMPLE,
  INITIAL_RECEITA_CONTROLE_SAMPLE,
  INITIAL_ENCAMINHAMENTO_SAMPLE,
  INITIAL_APAC_SAMPLE
} from './data/mockData';

import { PasswordGate } from './components/PasswordGate';
import { Header } from './components/Header';
import { DocumentSelector } from './components/DocumentSelector';
import { DoctorProfileModal } from './components/DoctorProfileModal';
import { PatientManagerModal } from './components/PatientManagerModal';
import { CidSearchModal } from './components/CidSearchModal';
import { SideFormEditor } from './components/SideFormEditor';

import { LMETemplate } from './components/templates/LMETemplate';
import { AtestadoComparecimentoTemplate } from './components/templates/AtestadoComparecimentoTemplate';
import { AtestadoDiasTemplate } from './components/templates/AtestadoDiasTemplate';
import { ReceitaSimplesTemplate } from './components/templates/ReceitaSimplesTemplate';
import { ReceitaControleTemplate } from './components/templates/ReceitaControleTemplate';
import { EncaminhamentoTemplate } from './components/templates/EncaminhamentoTemplate';
import { APACTemplate } from './components/templates/APACTemplate';

import { 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Edit, 
  Sparkles, 
  RotateCcw, 
  FileCheck, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';

export default function App() {
  // Security Gate State: session lock requires pin "9669" on open/refresh/manual lock
  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    return safeSessionStorage.getItem('docmedico_session_unlocked') === 'true';
  });

  const handleUnlock = () => {
    setIsUnlocked(true);
    safeSessionStorage.setItem('docmedico_session_unlocked', 'true');
  };

  const handleLock = () => {
    setIsUnlocked(false);
    safeSessionStorage.removeItem('docmedico_session_unlocked');
  };

  // Doctor Profile State
  const [doctorProfile, setDoctorProfile] = useState<DoctorProfile>(() => {
    try {
      const saved = safeLocalStorage.getItem('docmedico_doctor_profile');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.name && parsed.name.includes('Lucas R. Silva')) {
          return DEFAULT_DOCTOR_PROFILE;
        }
        return parsed;
      }
      return DEFAULT_DOCTOR_PROFILE;
    } catch {
      return DEFAULT_DOCTOR_PROFILE;
    }
  });

  const handleSaveDoctorProfile = (updated: DoctorProfile) => {
    setDoctorProfile(updated);
    safeLocalStorage.setItem('docmedico_doctor_profile', JSON.stringify(updated));
  };

  // Patients Database State
  const [patients, setPatients] = useState<Patient[]>(() => {
    try {
      const saved = safeLocalStorage.getItem('docmedico_patients');
      return saved ? JSON.parse(saved) : MOCK_PATIENTS;
    } catch {
      return MOCK_PATIENTS;
    }
  });

  const handleAddPatient = (newPat: Patient) => {
    const updated = [newPat, ...patients];
    setPatients(updated);
    safeLocalStorage.setItem('docmedico_patients', JSON.stringify(updated));
  };

  // Modals state
  const [isDoctorModalOpen, setIsDoctorModalOpen] = useState(false);
  const [isPatientModalOpen, setIsPatientModalOpen] = useState(false);
  const [isCidModalOpen, setIsCidModalOpen] = useState(false);
  const [showSidePanel, setShowSidePanel] = useState(true);

  // Document Zoom Level (for responsive mobile/tablet preview)
  const [zoomLevel, setZoomLevel] = useState<number>(100);

  // Active Document Type
  const [currentDocType, setCurrentDocType] = useState<DocumentType>('lme');

  // Document Datasets for all 7 models
  const [lmeData, setLmeData] = useState<LMEData>(INITIAL_LME_SAMPLE);
  const [atestadoCompData, setAtestadoCompData] = useState<AtestadoComparecimentoData>(INITIAL_ATESTADO_COMPARECIMENTO_SAMPLE);
  const [atestadoDiasData, setAtestadoDiasData] = useState<AtestadoDiasData>(INITIAL_ATESTADO_DIAS_SAMPLE);
  const [receitaSimplesData, setReceitaSimplesData] = useState<ReceitaSimplesData>(INITIAL_RECEITA_SIMPLES_SAMPLE);
  const [receitaControleData, setReceitaControleData] = useState<ReceitaControleData>(INITIAL_RECEITA_CONTROLE_SAMPLE);
  const [encaminhamentoData, setEncaminhamentoData] = useState<EncaminhamentoData>(INITIAL_ENCAMINHAMENTO_SAMPLE);
  const [apacData, setApacData] = useState<APACData>(INITIAL_APAC_SAMPLE);

  // Fill Patient Data Into Active Document
  const handleSelectPatientToFill = (pat: Patient) => {
    // Fill active document fields
    if (currentDocType === 'lme') {
      setLmeData(prev => ({
        ...prev,
        pacienteNome: pat.name,
        pacienteCns: pat.cns || prev.pacienteCns,
        pacienteCpf: pat.cpf || prev.pacienteCpf,
        pacienteDataNasc: pat.birthDate || prev.pacienteDataNasc,
        pacienteMae: pat.motherName || prev.pacienteMae,
        pacienteTelefone: pat.phone || prev.pacienteTelefone,
        pacienteEndereco: `${pat.address} - ${pat.cityState}`,
        pacientePeso: pat.weight || prev.pacientePeso,
        pacienteAltura: pat.height || prev.pacienteAltura
      }));
    } else if (currentDocType === 'atestado_comparecimento') {
      setAtestadoCompData(prev => ({
        ...prev,
        pacienteNome: pat.name,
        pacienteRgCpf: pat.cpf ? `CPF ${pat.cpf}` : prev.pacienteRgCpf
      }));
    } else if (currentDocType === 'atestado_dias') {
      setAtestadoDiasData(prev => ({
        ...prev,
        pacienteNome: pat.name,
        pacienteRgCpf: pat.cpf ? `CPF ${pat.cpf}` : prev.pacienteRgCpf
      }));
    } else if (currentDocType === 'receita_simples') {
      setReceitaSimplesData(prev => ({
        ...prev,
        pacienteNome: pat.name,
        pacienteCpf: pat.cpf
      }));
    } else if (currentDocType === 'receita_controle') {
      setReceitaControleData(prev => ({
        ...prev,
        pacienteNome: pat.name,
        pacienteEndereco: `${pat.address} - ${pat.cityState}`,
        pacienteTelefone: pat.phone
      }));
    } else if (currentDocType === 'encaminhamento') {
      setEncaminhamentoData(prev => ({
        ...prev,
        pacienteNome: pat.name,
        pacienteCpfCns: `CPF: ${pat.cpf || 'N/A'} | CNS: ${pat.cns || 'N/A'}`
      }));
    } else if (currentDocType === 'apac') {
      setApacData(prev => ({
        ...prev,
        pacienteNome: pat.name,
        pacienteCns: pat.cns || prev.pacienteCns,
        pacienteCpf: pat.cpf || prev.pacienteCpf,
        pacienteDataNasc: pat.birthDate || prev.pacienteDataNasc,
        pacienteMae: pat.motherName || prev.pacienteMae,
        pacienteTelefone: pat.phone || prev.pacienteTelefone,
        pacienteEndereco: `${pat.address} - ${pat.cityState}`,
        pacienteSex: pat.sex || 'F'
      }));
    }
  };

  // Insert Selected CID-10 Code Into Active Document
  const handleSelectCidToFill = (cid: CID10) => {
    if (currentDocType === 'lme') {
      setLmeData(prev => ({
        ...prev,
        cid10Principal: cid.code,
        cid10PrincipalDesc: cid.description
      }));
    } else if (currentDocType === 'atestado_dias') {
      setAtestadoDiasData(prev => ({
        ...prev,
        cid10Code: cid.code,
        cid10Description: cid.description,
        mostrarCid: true
      }));
    } else if (currentDocType === 'encaminhamento') {
      setEncaminhamentoData(prev => ({
        ...prev,
        cid10: `${cid.code} - ${cid.description}`,
        hipoteseDiagnostica: prev.hipoteseDiagnostica || cid.description
      }));
    } else if (currentDocType === 'apac') {
      setApacData(prev => ({
        ...prev,
        cid10Principal: cid.code,
        cid10PrincipalDesc: cid.description
      }));
    }
  };

  // Fill Preset Sample Data
  const handleFillSampleData = () => {
    if (currentDocType === 'lme') setLmeData(INITIAL_LME_SAMPLE);
    if (currentDocType === 'atestado_comparecimento') setAtestadoCompData(INITIAL_ATESTADO_COMPARECIMENTO_SAMPLE);
    if (currentDocType === 'atestado_dias') setAtestadoDiasData(INITIAL_ATESTADO_DIAS_SAMPLE);
    if (currentDocType === 'receita_simples') setReceitaSimplesData(INITIAL_RECEITA_SIMPLES_SAMPLE);
    if (currentDocType === 'receita_controle') setReceitaControleData(INITIAL_RECEITA_CONTROLE_SAMPLE);
    if (currentDocType === 'encaminhamento') setEncaminhamentoData(INITIAL_ENCAMINHAMENTO_SAMPLE);
    if (currentDocType === 'apac') setApacData(INITIAL_APAC_SAMPLE);
  };

  // Clear Document Data
  const handleClearData = () => {
    if (currentDocType === 'lme') {
      setLmeData(prev => ({ ...prev, pacienteNome: '', pacienteCns: '', pacienteCpf: '', medicamentos: [] }));
    } else if (currentDocType === 'atestado_comparecimento') {
      setAtestadoCompData(prev => ({ ...prev, pacienteNome: '', pacienteRgCpf: '', finalidade: '' }));
    } else if (currentDocType === 'atestado_dias') {
      setAtestadoDiasData(prev => ({ ...prev, pacienteNome: '', pacienteRgCpf: '', diasAfastamento: 1, diasAfastamentoExtenso: 'um' }));
    } else if (currentDocType === 'receita_simples') {
      setReceitaSimplesData(prev => ({ ...prev, pacienteNome: '', pacienteCpf: '', itens: [] }));
    } else if (currentDocType === 'receita_controle') {
      setReceitaControleData(prev => ({ ...prev, pacienteNome: '', pacienteEndereco: '', itens: [] }));
    } else if (currentDocType === 'encaminhamento') {
      setEncaminhamentoData(prev => ({ ...prev, pacienteNome: '', historiaClinica: '', examesRealizados: '' }));
    } else if (currentDocType === 'apac') {
      setApacData(prev => ({ ...prev, pacienteNome: '', pacienteCns: '', procedimentoNome: '' }));
    }
  };

  // Print Handler
  const handlePrint = () => {
    window.print();
  };

  // Export to PDF Handler
  const handleDownloadPdf = async () => {
    const element = document.getElementById('printable-document');
    if (!element) {
      window.print();
      return;
    }

    try {
      // Dynamic import html2pdf if available or trigger browser print PDF engine
      const html2pdfModule = await import('html2pdf.js');
      const html2pdf = html2pdfModule.default || html2pdfModule;

      const opt = {
        margin: 5,
        filename: `${currentDocType}_${new Date().toISOString().split('T')[0]}.pdf`,
        image: { type: 'jpeg' as const, quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { unit: 'mm' as const, format: 'a4' as const, orientation: 'portrait' as const }
      };

      html2pdf().set(opt).from(element).save().then(() => {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 }
        });
      });
    } catch (err) {
      console.warn('Fallback to native print PDF engine', err);
      window.print();
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-teal-500 selection:text-slate-950">
      
      {/* 1. Security Gate Modal (PIN 9669) */}
      <PasswordGate isUnlocked={isUnlocked} onUnlock={handleUnlock} />

      {/* 2. Top Navigation Bar */}
      <Header
        currentType={currentDocType}
        onSelectType={setCurrentDocType}
        onLock={handleLock}
        onOpenDoctorProfile={() => setIsDoctorModalOpen(true)}
        onOpenPatientManager={() => setIsPatientModalOpen(true)}
        onFillSampleData={handleFillSampleData}
        onClearData={handleClearData}
        onPrint={handlePrint}
        onDownloadPdf={handleDownloadPdf}
        doctorProfile={doctorProfile}
      />

      {/* Main Workspace Container */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        
        {/* Document Model Selector Tabs */}
        <DocumentSelector
          currentType={currentDocType}
          onSelect={setCurrentDocType}
        />

        {/* Toolbar & View Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/60 p-3 rounded-2xl border border-slate-800 print:hidden">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Documento Ativo: <strong className="text-teal-300 uppercase">{currentDocType.replace('_', ' ')}</strong></span>
          </div>

          <div className="flex items-center gap-2">
            
            {/* Sample presets button */}
            <button
              type="button"
              onClick={handleFillSampleData}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-300 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-teal-400" />
              <span>Dados de Exemplo</span>
            </button>

            {/* Clear fields */}
            <button
              type="button"
              onClick={handleClearData}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Limpar</span>
            </button>

            {/* Toggle Side Form Panel */}
            <button
              type="button"
              onClick={() => setShowSidePanel(!showSidePanel)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 cursor-pointer ${
                showSidePanel 
                  ? 'bg-teal-500/20 text-teal-300 border-teal-500/40' 
                  : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}
            >
              <Edit className="w-3.5 h-3.5" />
              <span>{showSidePanel ? 'Ocultar Painel Lateral' : 'Painel de Edição'}</span>
            </button>

            {/* Zoom Controls */}
            <div className="hidden sm:flex items-center gap-1 bg-slate-950 px-2 py-1 rounded-xl border border-slate-800 text-xs">
              <button
                type="button"
                onClick={() => setZoomLevel(prev => Math.max(70, prev - 10))}
                className="p-1 hover:text-teal-400 text-slate-400 transition-colors"
                title="Diminuir Visualização"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="font-mono text-[11px] font-bold text-slate-300 w-10 text-center">
                {zoomLevel}%
              </span>
              <button
                type="button"
                onClick={() => setZoomLevel(prev => Math.min(130, prev + 10))}
                className="p-1 hover:text-teal-400 text-slate-400 transition-colors"
                title="Aumentar Visualização"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setZoomLevel(100)}
                className="p-1 hover:text-teal-400 text-slate-400 transition-colors ml-1"
                title="Tamanho Normal 100%"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>

        {/* Split Grid: Document Paper Canvas & Optional Side Form Editor */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Printable Document Paper View Container */}
          <div className={`${showSidePanel ? 'lg:col-span-8' : 'lg:col-span-12'} transition-all overflow-x-auto pb-8`}>
            
            <div 
              id="printable-document"
              style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
              className="transition-transform duration-200"
            >
              {currentDocType === 'lme' && (
                <LMETemplate
                  data={lmeData}
                  onChange={setLmeData}
                  doctorProfile={doctorProfile}
                  onOpenCidModal={() => setIsCidModalOpen(true)}
                />
              )}

              {currentDocType === 'atestado_comparecimento' && (
                <AtestadoComparecimentoTemplate
                  data={atestadoCompData}
                  onChange={setAtestadoCompData}
                  doctorProfile={doctorProfile}
                />
              )}

              {currentDocType === 'atestado_dias' && (
                <AtestadoDiasTemplate
                  data={atestadoDiasData}
                  onChange={setAtestadoDiasData}
                  doctorProfile={doctorProfile}
                  onOpenCidModal={() => setIsCidModalOpen(true)}
                />
              )}

              {currentDocType === 'receita_simples' && (
                <ReceitaSimplesTemplate
                  data={receitaSimplesData}
                  onChange={setReceitaSimplesData}
                  doctorProfile={doctorProfile}
                />
              )}

              {currentDocType === 'receita_controle' && (
                <ReceitaControleTemplate
                  data={receitaControleData}
                  onChange={setReceitaControleData}
                  doctorProfile={doctorProfile}
                />
              )}

              {currentDocType === 'encaminhamento' && (
                <EncaminhamentoTemplate
                  data={encaminhamentoData}
                  onChange={setEncaminhamentoData}
                  doctorProfile={doctorProfile}
                  onOpenCidModal={() => setIsCidModalOpen(true)}
                />
              )}

              {currentDocType === 'apac' && (
                <APACTemplate
                  data={apacData}
                  onChange={setApacData}
                  doctorProfile={doctorProfile}
                  onOpenCidModal={() => setIsCidModalOpen(true)}
                />
              )}
            </div>

          </div>

          {/* Side Form Editor Drawer */}
          {showSidePanel && (
            <div className="lg:col-span-4 sticky top-20 print:hidden">
              <SideFormEditor
                currentType={currentDocType}
                lmeData={lmeData}
                setLmeData={setLmeData}
                atestadoCompData={atestadoCompData}
                setAtestadoCompData={setAtestadoCompData}
                atestadoDiasData={atestadoDiasData}
                setAtestadoDiasData={setAtestadoDiasData}
                receitaSimplesData={receitaSimplesData}
                setReceitaSimplesData={setReceitaSimplesData}
                receitaControleData={receitaControleData}
                setReceitaControleData={setReceitaControleData}
                encaminhamentoData={encaminhamentoData}
                setEncaminhamentoData={setEncaminhamentoData}
                apacData={apacData}
                setApacData={setApacData}
                onOpenCidModal={() => setIsCidModalOpen(true)}
                onOpenPatientModal={() => setIsPatientModalOpen(true)}
                doctorProfile={doctorProfile}
              />
            </div>
          )}

        </div>

      </main>

      {/* Footer info */}
      <footer className="border-t border-slate-900 py-6 text-center text-xs text-slate-500 print:hidden">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© {new Date().getFullYear()} DocMédico Studio — Emissão Segura de Documentos Médicos.</p>
          <p className="flex items-center gap-1.5 text-slate-400">
            <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
            Em conformidade com as portarias do Ministério da Saúde, ANVISA e CFM.
          </p>
        </div>
      </footer>

      {/* Doctor Settings Modal */}
      <DoctorProfileModal
        isOpen={isDoctorModalOpen}
        onClose={() => setIsDoctorModalOpen(false)}
        doctorProfile={doctorProfile}
        onSave={handleSaveDoctorProfile}
      />

      {/* Patients Database Modal */}
      <PatientManagerModal
        isOpen={isPatientModalOpen}
        onClose={() => setIsPatientModalOpen(false)}
        patients={patients}
        onSelectPatient={handleSelectPatientToFill}
        onAddPatient={handleAddPatient}
      />

      {/* CID-10 Directory Modal */}
      <CidSearchModal
        isOpen={isCidModalOpen}
        onClose={() => setIsCidModalOpen(false)}
        onSelectCid={handleSelectCidToFill}
      />

    </div>
  );
}
