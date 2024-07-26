export const VALIDATOR_PATTERNS = {
  patternEmail:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  patterOnlyLetters: /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/,
  patterOnlyNumber: /^[0-9]*$/,
  imageType: /\.(jpg|jpeg|png)$/i,
};

export const VALIDATOR_SIZE = {
  maxLenghtText: 600,
  imageWeight: 5242880 /* 5Mb */,
  minimunAge: 18,
};

export const IMAGE_FORMAT = {
  // The format must be added and then ","
  imagePermittedFormat: 'image/jpg, image/jpeg, image/png',
  imagePermittedFormatValidator: ['jpg', 'jpeg', 'png'],
};

export const VALIDATOR_INTEREST = {
  maxInterest: 5,
};
