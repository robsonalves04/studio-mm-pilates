import * as yup from "yup";
import { validarCpf } from "../../../../functions/utils";
import { validoMaior, isMaiorDeIdade, toValidDate, validarData, isValidDate, isDataMinima,  } from "../../../../functions/use-cases/date-functions";
import { validarCnpj } from "../../../../functions/utils/korpay-validacoes-functions";

// -- Validação de CPF
export const KorpayCPFSchema = yup.object({
    cpf: yup.string()
        .required("Insira seu CPF ou CNPJ")
        .test("CNPJ valido", "CNPJ inválido", (value) => validarCpf(value)),
})

// -- Validação de CPF Empresa
export const KorpayCPFEmpresaSchema = yup.object({
    cpfEmpresa: yup.string()
        .required("Insira seu CPF ou CNPJ")
        .test("cpf-valido", "CPF ou CNPJ inválido", (value) => validarCpf(value)),
})

// -- Validação de CNPJ
export const KorpayCNPJSchema = yup.object({
    cnpj: yup.string()
        .required("Insira seu CPF ou CNPJ")
        .test("cpf-valido", "CPF ou CNPJ inválido", (value) => validarCnpj(value)),
})
      

// -- Validação de formulário de dados pessoais
export const KorpayDadosPessoaisSchema = yup.object({
    nome: yup.string().required("Insira seu Nome"),
    sobrenome: yup.string().required("Insira seu Sobrenome"),
    profissao: yup.string().required('Insira sua Profissão'),
    senha: yup.string().required('Insira um senha').min(6, 'A senha deve conter no minímo 6 digitos'),
    confirmarSenha: yup.string()
        .test('passwords-match', 'Senhas digitadas não estão iguais', function (value) {
            return this.parent.senha === value }),
    dataNascimento: yup.string().required("Insira sua data de nascimento")
        .test("is-maior-de-idade", "Você precisa ser maior de idade para continuar", (value) =>
            isMaiorDeIdade(toValidDate(value)))
})

//-- Validação de formulário de endereço
export const KorpayEnderecoEContatoSchema = yup.object({
    endereco: yup.string().required("Insira seu Endereço"),
    cidade: yup.string().required('Insira sua Cidade').max(40,),
    pais: yup.string().required('Insira seu País'), otherwhise: yup.string(),
    cep: yup.string().required('Insira seu Cep').min(9, "Cep digitado é inválido"),
    email: yup.string().required("Insira seu E-mail").email('E-mail digitado é inválido'),
    celular: yup.string().required("Insira seu número de telefone").min(15, "Número digitado é inválido"),

});

export const KorpayEnderecoEContatoEmpresaSchema = yup.object({
    endereco: yup.string().required("Insira seu Endereço"),
    cidade: yup.string().required('Insira sua Cidade').max(40,),
    pais: yup.string().required('Insira seu País'), otherwhise: yup.string(),
    cep: yup.string().required('Insira seu Cep').min(9, "Cep digitado é inválido"),
    email: yup.string().required("Insira seu E-mail").email('E-mail digitado é inválido'),
});

// -- Validação de formulário de dados da empresa
export const KorpayDadosEmpresaSchema = yup.object({
    razaoSocial: yup.string().required("Razão Social é um campo obrigatório") .min(5, "Digite caracteres minimo obrigatorio!"),
    nomeFantasia: yup.string().required("Nome fantasia é um campo obrigatório"),
    dataFundacao: yup.string().required("Data de Fundação ").min(10, "a data deve ter 8 números")
    .test("é valida", "Voce precisa inserir uma data valída de fundação", (value) => isDataMinima(toValidDate(value))),
    atividadeEconomica: yup.string().required("Atividade econômica é um campo obrigatório"),
    dataDeRegistro: yup.string().required("Data de registro é um campo obrigatório").min(10, "a data deve ter 8 números")
    .test("é valida", "Voce precisa inserir uma data valída de registro", (value) => isDataMinima(toValidDate(value))),
})

export const KorpayAnexoFaturalmentoSchema = yup.object ({
    base64FaturamentoComFoto: yup.string().required ("É nescessario anexar um documento comprovando seu faturamento", )
})   

export const KorpayAnexoContratoSocialSchema = yup.object ({
    base64ContratoSocial: yup.string().required ("É nescessario anexar o Contrato Social da sua empresa")
})
export const KorpayAnexoComprovanteDeResidenciaDaEmpresaSchema = yup.object ({
    base64ComprovanteDeResidenciaEmpresa: yup.string().required ("É nescessario anexar um documento comprovando o endereço da empresa")
})
export const KorpayAnexoCPFSchema = yup.object ({
    base64DocumentoComFoto: yup.string().required ("É nescessario anexar o seu CPF ou CNH ")
})
export const KorpayAnexoComprovanteDeResidenciaSchema = yup.object ({
    base64ComprovanteDeResidencia: yup.string().required ("É nescessario anexar um comprovante da sua residência")
})
