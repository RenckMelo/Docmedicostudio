// Helper functions to format doctor info and local/date gracefully when left blank for manual fill

export const getDoctorDisplayName = (docDataName?: string, profileName?: string): string => {
  if (docDataName !== undefined) {
    if (docDataName.trim()) return docDataName.trim();
    return 'Dr(a). _____________________________________________';
  }
  if (profileName && profileName.trim()) return profileName.trim();
  return 'Dr(a). _____________________________________________';
};

export const getDoctorDisplayCrm = (docCrm?: string, docUf?: string, profileCrm?: string, profileUf?: string): string => {
  const crm = docCrm !== undefined ? docCrm.trim() : (profileCrm?.trim() || '');
  const uf = docUf !== undefined ? docUf.trim() : (profileUf?.trim() || '');

  if (crm && uf) return `CRM-${uf} ${crm}`;
  if (crm) return `CRM ${crm}`;
  return 'CRM: ______________ / UF: ______';
};

export const getDoctorDisplaySpecialty = (docSpec?: string, profileSpec?: string): string => {
  if (docSpec !== undefined) {
    if (docSpec.trim()) return docSpec.trim();
    return 'Especialidade: _______________________________';
  }
  if (profileSpec && profileSpec.trim()) return profileSpec.trim();
  return 'Especialidade: _______________________________';
};

export const getDisplayLocalData = (localData?: string): string => {
  if (localData && localData.trim()) return localData;
  return '______________________________, _____ de ______________________ de _________';
};
