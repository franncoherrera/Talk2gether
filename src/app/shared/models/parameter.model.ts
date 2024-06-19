export class REGISTER_PARAMETERS {
  countryList: string[];
  languageList: string[];
  languageLevelList: string[];
  interestList: INTEREST;
}

export class INTEREST {
  icon: string;
  id: number;
  name: string;
  seleccionado: boolean;
}
