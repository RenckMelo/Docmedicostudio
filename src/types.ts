export type DocumentType = 
  | 'lme' 
  | 'atestado_comparecimento' 
  | 'atestado_dias' 
  | 'receita_simples' 
  | 'receita_controle' 
  | 'encaminhamento' 
  | 'apac';

export interface DoctorProfile {
  name: string;
  crm: string;
  uf: string;
  specialty: string;
  rqe?: string;
  clinicName: string;
  clinicAddress: string;
  clinicPhone: string;
  clinicEmail?: string;
  clinicCnpj?: string;
  logoUrl?: string;
  signatureUrl?: string;
  stampText?: string;
}

export interface Patient {
  id: string;
  name: string;
  cpf: string;
  cns: string; // Cartão SUS
  birthDate: string;
  motherName: string;
  rg?: string;
  address: string;
  cityState: string;
  phone: string;
  weight?: string;
  height?: string;
  sex?: 'M' | 'F';
}

export interface CID10 {
  code: string;
  description: string;
  category?: string;
}

// 1. LME Data (Componente Especializado SUS)
export interface LMEMedicamento {
  id: string;
  nomeGenerico: string; // Princípio ativo
  posologia: string;
  qtdMes1: number | string;
  qtdMes2: number | string;
  qtdMes3: number | string;
  qtdMes4: number | string;
  qtdMes5: number | string;
  qtdMes6: number | string;
}

export interface LMEData {
  uf: string;
  cnes: string;
  estabelecimentoNome: string;
  pacienteNome: string;
  pacienteCns: string;
  pacienteCpf: string;
  pacienteDataNasc: string;
  pacienteMae: string;
  pacientePeso: string;
  pacienteAltura: string;
  pacienteTelefone: string;
  pacienteEndereco: string;
  
  medicamentos: LMEMedicamento[];
  
  cid10Principal: string;
  cid10PrincipalDesc: string;
  cid10Secundario?: string;
  cid10SecundarioDesc?: string;
  
  anamneseExames: string;
  tratamentosAnteriores: string;
  
  tipoSolicitacao: 'inicial' | 'continuidade' | 'alteracao';
  
  medicoNome: string;
  medicoCrm: string;
  medicoUf: string;
  medicoCpf: string;
  dataEmissao: string;
}

// 2. Atestado de Comparecimento Data
export interface AtestadoComparecimentoData {
  pacienteNome: string;
  pacienteRgCpf: string;
  dataComparecimento: string;
  horarioInicio: string;
  horarioFim: string;
  finalidade: string; // ex: "para fins de comprovação junto ao empregador / instituição de ensino"
  localData: string;
  medicoNome: string;
  medicoCrm: string;
  medicoUf: string;
  medicoEspecialidade: string;
  observacoes?: string;
}

// 3. Atestado de Dias Data
export interface AtestadoDiasData {
  pacienteNome: string;
  pacienteRgCpf: string;
  diasAfastamento: number;
  diasAfastamentoExtenso: string;
  dataInicio: string;
  cid10Code?: string;
  cid10Description?: string;
  mostrarCid: boolean; // Médicos só colocam CID se o paciente autorizar
  motivoAfastamento: string; // ex: "necessita de repouso para tratamento de saúde"
  localData: string;
  medicoNome: string;
  medicoCrm: string;
  medicoUf: string;
  medicoEspecialidade: string;
}

// 4. Receita Simples Data
export interface ReceitaItem {
  id: string;
  medicamento: string;
  concentracao: string;
  formaFarmaceutica: string; // ex: comprimidos, xarope, pomada
  quantidade: string;
  posologia: string;
  uso: 'Uso Interno' | 'Uso Tópico' | 'Uso Inalatório' | 'Uso Oftálmico' | 'Uso Otológico' | 'Outro';
}

export interface ReceitaSimplesData {
  pacienteNome: string;
  pacienteCpf?: string;
  itens: ReceitaItem[];
  orientacoesGerais?: string;
  localData: string;
  medicoNome: string;
  medicoCrm: string;
  medicoUf: string;
  medicoEspecialidade: string;
  medicoEndereco: string;
  medicoTelefone: string;
}

// 5. Receita de Controle Especial (1ª e 2ª Via)
export interface ReceitaControleItem {
  id: string;
  medicamento: string;
  posologia: string;
  quantidadeNum: string;
  quantidadeExtenso: string;
}

export interface ReceitaControleData {
  emissorNome: string; // Dr / Clínica
  emissorEndereco: string;
  emissorTelefone: string;
  emissorCrm: string;
  emissorUf: string;
  emissorCnpjCpf: string;

  pacienteNome: string;
  pacienteEndereco: string;
  pacienteTelefone?: string;

  itens: ReceitaControleItem[];
  
  // Comprador (Preenchido na farmácia ou antecipado)
  compradorNome?: string;
  compradorIdentidade?: string;
  compradorOrgaoEmissor?: string;
  compradorEndereco?: string;
  compradorTelefone?: string;

  // Farmácia (Identificação do Fornecedor)
  farmaciaNome?: string;
  farmaciaCnpj?: string;
  farmaciaDataAtendimento?: string;

  localData: string;
  mostrarSegundaViaMesmaPagina: boolean;
}

// 6. Encaminhamento Data
export interface EncaminhamentoData {
  destinoEspecialidade: string;
  destinoProfissionalOuServico?: string;
  pacienteNome: string;
  pacienteIdadeDataNasc: string;
  pacienteCpfCns?: string;

  historiaClinica: string;
  hipoteseDiagnostica: string;
  cid10?: string;
  examesRealizados: string;
  condutaSolicitada: string;
  prioridade: 'Eletivo' | 'Urgência' | 'Prioritário';

  localData: string;
  medicoNome: string;
  medicoCrm: string;
  medicoUf: string;
  medicoEspecialidade: string;
}

// 7. APAC Data (Laudo para Solicitação de Procedimento Ambulatorial - SUS)
export interface APACData {
  estabelecimentoSolicitanteNome: string;
  cnes: string;
  cnpj: string;

  pacienteNome: string;
  pacienteCns: string;
  pacienteCpf: string;
  pacienteDataNasc: string;
  pacienteSex: 'M' | 'F';
  pacienteMae: string;
  pacienteTelefone: string;
  pacienteEndereco: string;

  procedimentoCodigo: string;
  procedimentoNome: string;
  quantidadeSolicitada: number;
  
  cid10Principal: string;
  cid10PrincipalDesc: string;
  cid10Secundario?: string;

  justificativaProcedimento: string;
  resumoAnamneseExames: string;
  caraterAtendimento: 'Eletivo' | 'Urgência' | 'Acidente/Outros';

  medicoSolicitanteNome: string;
  medicoSolicitanteCrm: string;
  medicoSolicitanteCns: string;
  medicoSolicitanteUf: string;
  dataSolicitacao: string;
}
