

export const validarCpf = (cpf: string): boolean => {
  if (isCPF(cpf)) {
    if (typeof cpf !== "string") return false
    cpf = cpf.replace(/[\s.-]*/igm, '')
    if (
      !cpf || cpf.length != 11 || cpf == "00000000000" ||
      cpf == "11111111111" || cpf == "22222222222" ||
      cpf == "33333333333" || cpf == "44444444444" ||
      cpf == "55555555555" || cpf == "66666666666" ||
      cpf == "77777777777" || cpf == "88888888888" ||
      cpf == "99999999999"
    ) {
      return false
    }
    var soma = 0
    var resto
    for (var i = 1; i <= 9; i++)
      soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i)
    resto = (soma * 10) % 11
    if ((resto == 10) || (resto == 11)) resto = 0
    if (resto != parseInt(cpf.substring(9, 10))) return false
    soma = 0
    for (var i = 1; i <= 10; i++)
      soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i)
    resto = (soma * 10) % 11
    if ((resto == 10) || (resto == 11)) resto = 0
    if (resto != parseInt(cpf.substring(10, 11))) return false
    return true
  } else return validarCnpj(cpf)
}

export const isCPF = (cpf: string): boolean => {
  if (typeof cpf !== "string") return false
  cpf = cpf.replace(/[\s.-]*/igm, '')
  if (cpf.length > 11)
    return false;
  return true;
}


export function validarCnpj(cnpj: string | undefined): boolean {
  if (!cnpj) return true;
  const newCnpj = cnpj.replace(/[^\d]+/g, ``);
  if (newCnpj.length !== 14) return false;
  if (newCnpj === `00000000000000`) return false;
  const validatorArray = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const firstValidationDivision =
    newCnpj
      .substr(0, newCnpj.length - 2)
      .split(``)
      .reduce((acc: number, val: string, idx: number): number => {
        return acc + parseInt(val, 10) * validatorArray[idx];
      }, 0) % 11;
  const firstDigit = firstValidationDivision < 2 ? 0 : 11 - firstValidationDivision;
  if (firstDigit !== parseInt(newCnpj.charAt(12), 10)) return false;
  validatorArray.unshift(6);
  const secondValidationDivision =
    newCnpj
      .substr(0, newCnpj.length - 1)
      .split(``)
      .reduce((acc: number, val: string, idx: number): number => {
        return acc + parseInt(val, 10) * validatorArray[idx];
      }, 0) % 11;
  const secondDigit = secondValidationDivision < 2 ? 0 : 11 - secondValidationDivision;
  if (secondDigit !== parseInt(newCnpj.charAt(13), 10)) return false;
  return true;
}


