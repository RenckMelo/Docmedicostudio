import {
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
} from '../types';

export const DEFAULT_DOCTOR_PROFILE: DoctorProfile = {
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
  stampText: '',
};

export const MOCK_PATIENTS: Patient[] = [
  {
    id: 'pat-1',
    name: 'Maria Aparecida dos Santos',
    cpf: '123.456.789-00',
    cns: '708.1023.4567.8901',
    birthDate: '1975-04-12',
    motherName: 'Francisca das Chagas Santos',
    rg: '24.890.123-X',
    address: 'Rua das Flores, 342, Apt 12 - Jardim Paulista',
    cityState: 'São Paulo - SP',
    phone: '(11) 98765-4321',
    weight: '68 kg',
    height: '1.62 m',
    sex: 'F'
  },
  {
    id: 'pat-2',
    name: 'João Carlos Oliveira',
    cpf: '987.654.321-11',
    cns: '890.1234.5678.9012',
    birthDate: '1982-11-25',
    motherName: 'Lúcia Maria Oliveira',
    rg: '18.345.678-9',
    address: 'Av. Brasil, 1200 - Centro',
    cityState: 'Campinas - SP',
    phone: '(19) 99123-8877',
    weight: '82 kg',
    height: '1.78 m',
    sex: 'M'
  },
  {
    id: 'pat-3',
    name: 'Ana Beatris Ferreira',
    cpf: '456.789.123-55',
    cns: '201.5543.8901.2345',
    birthDate: '1995-08-03',
    motherName: 'Rosangela Ferreira',
    rg: '33.112.445-2',
    address: 'Rua Bela Cintra, 890 - Consolação',
    cityState: 'São Paulo - SP',
    phone: '(11) 97112-3344',
    weight: '55 kg',
    height: '1.65 m',
    sex: 'F'
  }
];

export const MOCK_CID10_LIST: CID10[] = [
  { code: 'E11.9', description: 'Diabetes mellitus tipo 2 - sem complicações', category: 'Endocrinologia' },
  { code: 'E11.4', description: 'Diabetes mellitus tipo 2 com complicações neurológicas', category: 'Endocrinologia' },
  { code: 'E03.9', description: 'Hipotireoidismo não especificado', category: 'Endocrinologia' },
  { code: 'E66.0', description: 'Obesidade devida a excesso de calorias', category: 'Endocrinologia' },
  { code: 'I10', description: 'Hipertensão essencial (primária)', category: 'Cardiologia' },
  { code: 'I20.9', description: 'Angina pectoris não especificada', category: 'Cardiologia' },
  { code: 'I50.9', description: 'Insuficiência cardíaca não especificada', category: 'Cardiologia' },
  { code: 'J06.9', description: 'Infecção aguda das vias aéreas superiores não especificada', category: 'Infectologia' },
  { code: 'J18.9', description: 'Pneumonia não especificada', category: 'Pneumologia' },
  { code: 'J45.0', description: 'Asma predominantemente alérgica', category: 'Pneumologia' },
  { code: 'J44.9', description: 'Doença pulmonar obstrutiva crônica (DPOC) não especificada', category: 'Pneumologia' },
  { code: 'M54.5', description: 'Dor lombar baixa / Lombalgia', category: 'Ortopedia' },
  { code: 'M54.2', description: 'Cervicalgia', category: 'Ortopedia' },
  { code: 'M75.1', description: 'Síndrome do manguito rotador', category: 'Ortopedia' },
  { code: 'M17.9', description: 'Gonartrose [artrose do joelho] não especificada', category: 'Ortopedia' },
  { code: 'M05.8', description: 'Outras artrites reumatóides soropositivas', category: 'Reumatologia' },
  { code: 'F41.1', description: 'Ansiedade generalizada', category: 'Psiquiatria' },
  { code: 'F32.1', description: 'Episódio depressivo moderado', category: 'Psiquiatria' },
  { code: 'F90.0', description: 'Distúrbios da atividade e da atenção (TDAH)', category: 'Psiquiatria' },
  { code: 'G43.9', description: 'Enxaqueca não especificada', category: 'Neurologia' },
  { code: 'K21.9', description: 'Doença de refluxo gastroesofágico sem esofagite', category: 'Gastroenterologia' },
  { code: 'K29.7', description: 'Gastrite não especificada', category: 'Gastroenterologia' },
  { code: 'N39.0', description: 'Infecção do trato urinário de localização não especificada', category: 'Urologia' },
  { code: 'N20.1', description: 'Cálculo do ureter', category: 'Urologia' },
  { code: 'B34.9', description: 'Infecção viral não especificada', category: 'Infectologia' },
  { code: 'R51', description: 'Cefaleia', category: 'Sintomas Gerais' },
  { code: 'R50.9', description: 'Febre não especificada', category: 'Sintomas Gerais' },
  { code: 'Z00.0', description: 'Exame médico geral (Check-up)', category: 'Exames' },
  { code: 'Z02.7', description: 'Emissão de atestado médico', category: 'Atestados' }
];

export const INITIAL_LME_SAMPLE: LMEData = {
  uf: 'SP',
  cnes: '2078901',
  estabelecimentoNome: 'AMBULATÓRIO DE ESPECIALIDADES - HOSPITAL DAS CLÍNICAS',
  pacienteNome: 'Maria Aparecida dos Santos',
  pacienteCns: '708.1023.4567.8901',
  pacienteCpf: '123.456.789-00',
  pacienteDataNasc: '1975-04-12',
  pacienteMae: 'Francisca das Chagas Santos',
  pacientePeso: '68',
  pacienteAltura: '162',
  pacienteTelefone: '(11) 98765-4321',
  pacienteEndereco: 'Rua das Flores, 342, Apt 12 - São Paulo / SP',
  
  medicamentos: [
    {
      id: 'med-lme-1',
      nomeGenerico: 'Dulaglutida 1,5 mg/0,5 mL (Caneta aplicadora)',
      posologia: '1 aplicação subcutânea 1x por semana',
      qtdMes1: 4,
      qtdMes2: 4,
      qtdMes3: 4,
      qtdMes4: 4,
      qtdMes5: 4,
      qtdMes6: 4,
    },
    {
      id: 'med-lme-2',
      nomeGenerico: 'Dapagliflozina 10 mg (Comprimidos)',
      posologia: '1 comprimido via oral 1x ao dia pela manhã',
      qtdMes1: 30,
      qtdMes2: 30,
      qtdMes3: 30,
      qtdMes4: 30,
      qtdMes5: 30,
      qtdMes6: 30,
    }
  ],
  
  cid10Principal: 'E11.4',
  cid10PrincipalDesc: 'Diabetes mellitus tipo 2 com complicações neurológicas',
  cid10Secundario: 'I10',
  cid10SecundarioDesc: 'Hipertensão essencial (primária)',
  
  anamneseExames: 'Paciente de 51 anos, portadora de Diabetes Mellitus tipo 2 há 12 anos com inadequado controle glicêmico em uso de Metformina + Glibenclamida (HbA1c recente: 9.2%). Apresenta neuropatia diabética periférica comprovada por eletroneuromiografia. Função renal preservada (eTFG 88 mL/min).',
  tratamentosAnteriores: 'Metformina 2550 mg/dia, Glibenclamida 15 mg/dia sem atingimento da meta terapêutica de HbA1c < 7.0%.',
  
  tipoSolicitacao: 'inicial',
  
  medicoNome: '',
  medicoCrm: '',
  medicoUf: '',
  medicoCpf: '',
  dataEmissao: new Date().toISOString().split('T')[0],
};

export const INITIAL_ATESTADO_COMPARECIMENTO_SAMPLE: AtestadoComparecimentoData = {
  pacienteNome: 'João Carlos Oliveira',
  pacienteRgCpf: 'CPF 987.654.321-11',
  dataComparecimento: new Date().toISOString().split('T')[0],
  horarioInicio: '08:30',
  horarioFim: '11:45',
  finalidade: 'comprovação de comparecimento a consulta e realização de exames médicos',
  localData: `São Paulo - SP, ${new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })}`,
  medicoNome: '',
  medicoCrm: '',
  medicoUf: '',
  medicoEspecialidade: '',
  observacoes: 'O paciente permaneceu no consultório em atendimento médico no período supracitado.'
};

export const INITIAL_ATESTADO_DIAS_SAMPLE: AtestadoDiasData = {
  pacienteNome: 'Ana Beatris Ferreira',
  pacienteRgCpf: 'CPF 456.789.123-55',
  diasAfastamento: 3,
  diasAfastamentoExtenso: 'três',
  dataInicio: new Date().toISOString().split('T')[0],
  cid10Code: 'J06.9',
  cid10Description: 'Infecção aguda das vias aéreas superiores não especificada',
  mostrarCid: true,
  motivoAfastamento: 'necessita de repouso e afastamento de suas atividades laborais e escolares por motivo de saúde',
  localData: `São Paulo - SP, ${new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })}`,
  medicoNome: '',
  medicoCrm: '',
  medicoUf: '',
  medicoEspecialidade: ''
};

export const INITIAL_RECEITA_SIMPLES_SAMPLE: ReceitaSimplesData = {
  pacienteNome: 'Maria Aparecida dos Santos',
  pacienteCpf: '123.456.789-00',
  itens: [
    {
      id: 'rec-1',
      medicamento: 'Amoxicilina + Clavulanato de Potássio',
      concentracao: '875mg + 125mg',
      formaFarmaceutica: 'Comprimidos revestidos',
      quantidade: '1 caixa (14 comprimidos)',
      posologia: 'Tomar 01 comprimido por via oral a cada 12 horas durante 7 dias.',
      uso: 'Uso Interno'
    },
    {
      id: 'rec-2',
      medicamento: 'Dipirona Sódica',
      concentracao: '1g',
      formaFarmaceutica: 'Comprimidos',
      quantidade: '1 caixa (10 comprimidos)',
      posologia: 'Tomar 01 comprimido por via oral de 6 em 6 horas se houver dor ou febre (Temperatura > 37.8°C).',
      uso: 'Uso Interno'
    },
    {
      id: 'rec-3',
      medicamento: 'Sorosan / Soro Fisiológico 0,9%',
      concentracao: '500 ml',
      formaFarmaceutica: 'Frasco',
      quantidade: '02 frascos',
      posologia: 'Lavar as narinas com 10ml em cada narina de 4 em 4 horas.',
      uso: 'Uso Inalatório'
    }
  ],
  orientacoesGerais: 'Manter hidratação oral abundante (mínimo 2 litros de água/dia). Em caso de febre persistente por mais de 48 horas ou piora do estado geral, retornar para reavaliação médica imediata.',
  localData: `São Paulo - SP, ${new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })}`,
  medicoNome: '',
  medicoCrm: '',
  medicoUf: '',
  medicoEspecialidade: '',
  medicoEndereco: '',
  medicoTelefone: ''
};

export const INITIAL_RECEITA_CONTROLE_SAMPLE: ReceitaControleData = {
  emissorNome: '',
  emissorEndereco: '',
  emissorTelefone: '',
  emissorCrm: '',
  emissorUf: '',
  emissorCnpjCpf: '',

  pacienteNome: 'João Carlos Oliveira',
  pacienteEndereco: 'Av. Brasil, 1200 - Centro - Campinas / SP',
  pacienteTelefone: '(19) 99123-8877',

  itens: [
    {
      id: 'ctrl-1',
      medicamento: 'Clonazepam 2,5 mg/mL (Gotas)',
      posologia: 'Tomar 05 gotas por via oral diluídas em meio copo d\'água à noite antes de deitar.',
      quantidadeNum: '01',
      quantidadeExtenso: 'um frasco com 20 mL'
    },
    {
      id: 'ctrl-2',
      medicamento: 'Sertralina 50 mg (Comprimidos revestidos)',
      posologia: 'Tomar 01 comprimido por via oral pela manhã após o café.',
      quantidadeNum: '02',
      quantidadeExtenso: 'duas caixas com 30 comprimidos cada'
    }
  ],

  compradorNome: '',
  compradorIdentidade: '',
  compradorOrgaoEmissor: 'SSP/SP',
  compradorEndereco: '',
  compradorTelefone: '',

  farmaciaNome: '',
  farmaciaCnpj: '',
  farmaciaDataAtendimento: '',

  localData: `São Paulo - SP, ${new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })}`,
  mostrarSegundaViaMesmaPagina: true
};

export const INITIAL_ENCAMINHAMENTO_SAMPLE: EncaminhamentoData = {
  destinoEspecialidade: 'Cardiologia / Arritmologia',
  destinoProfissionalOuServico: 'Serviço de Cardiologia do Hospital Universitário',
  pacienteNome: 'João Carlos Oliveira',
  pacienteIdadeDataNasc: '43 anos (Nasc: 25/11/1982)',
  pacienteCpfCns: 'CPF: 987.654.321-11 | CNS: 890.1234.5678.9012',

  historiaClinica: 'Encaminho o paciente acima qualificado, com quadro de palpitações taquicárdicas paroxísticas associadas a pré-síncope aos esforços há cerca de 3 meses. Sem histórico pregresso de cardiopatia conhecida.',
  hipoteseDiagnostica: 'Taquicardia Supraventricular Paroxística a esclarecer / Fibrilação Atrial Paroxística.',
  cid10: 'I47.1 - Taquicardia supraventricular',
  examesRealizados: '1. ECG de repouso (12 derivações): Ritmo sinusal, FC 78 bpm, sem alterações agudas de repolarização.\n2. Ecocardiograma Transtorácico: FEVE 65%, átrio esquerdo de dimensões normais (36mm), sem valvopatias estruturais significações.\n3. Laboratório: TSH 2.1 mUI/L, Eletrólitos normais.',
  condutaSolicitada: 'Solicito avaliação especializada com Arritmologista, consideração de Holter 24h / Looper monitor e conduta terapêutica adequada.',
  prioridade: 'Prioritário',

  localData: `São Paulo - SP, ${new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })}`,
  medicoNome: '',
  medicoCrm: '',
  medicoUf: '',
  medicoEspecialidade: ''
};

export const INITIAL_APAC_SAMPLE: APACData = {
  estabelecimentoSolicitanteNome: 'AMBULATÓRIO DE ESPECIALIDADES MÉDICAS - CENTRO',
  cnes: '3456789',
  cnpj: '00.123.456/0001-78',

  pacienteNome: 'Maria Aparecida dos Santos',
  pacienteCns: '708.1023.4567.8901',
  pacienteCpf: '123.456.789-00',
  pacienteDataNasc: '1975-04-12',
  pacienteSex: 'F',
  pacienteMae: 'Francisca das Chagas Santos',
  pacienteTelefone: '(11) 98765-4321',
  pacienteEndereco: 'Rua das Flores, 342, Apt 12 - São Paulo / SP',

  procedimentoCodigo: '03.01.01.007-2',
  procedimentoNome: 'CONSULTA MÉRICA EM ATENÇÃO ESPECIALIZADA (ENDOCRINOLOGIA)',
  quantidadeSolicitada: 1,

  cid10Principal: 'E11.4',
  cid10PrincipalDesc: 'Diabetes mellitus tipo 2 com complicações neurológicas',
  cid10Secundario: 'I10',

  justificativaProcedimento: 'Paciente portadora de Diabetes Mellitus Tipo 2 descompensado com complicação microvascular (neuropatia periférica). Acompanhamento especializado contínuo e ajuste de esquema terapêutico de alta complexidade.',
  resumoAnamneseExames: 'Anamnese: Glicemia de jejum recente 210 mg/dL, HbA1c 9.2%. Exames de imagem e laboratoriais anexos. Parestesia em meias e luvas.',
  caraterAtendimento: 'Eletivo',

  medicoSolicitanteNome: '',
  medicoSolicitanteCrm: '',
  medicoSolicitanteCns: '',
  medicoSolicitanteUf: '',
  dataSolicitacao: new Date().toISOString().split('T')[0],
};
