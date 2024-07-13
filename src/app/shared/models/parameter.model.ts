export class REGISTER_PARAMETERS {
  countryList?: string[];
  languageList?: string[];
  languageLevelList?: string[];
  interest?: INTEREST[]
}

export class INTEREST {
  icon: string;
  id: number;
  name: string;
  seleccionado: boolean;
}
