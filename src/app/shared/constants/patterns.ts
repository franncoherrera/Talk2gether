export const VALIDATOR_PATTERNS = {
  patternEmail:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  patterOnlyLetters: /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü]+$/,
  imageType: /\.(jpg|jpeg|png)$/i,

};

export const VALIDATOR_SIZE = {
  maxLenghtText: 200,
  imageWeight: 5242880, /* 5Mb */
  minimunAge: 18
}

export const IMAGE_FORMAT = {
  // Se debe agregar el formato y luego ","
  imagePermittedFormat : 'image/jpg, image/jpeg, image/png'
}