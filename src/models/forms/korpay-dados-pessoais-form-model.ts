export class KorpayDadosPessoaisFormModel {
    constructor(
        public nome: string | undefined,
        public sobrenome: string | undefined,
        public celular: string | undefined,
        public dataNascimento: string | undefined,
        public profissao: string | undefined,
        public senha: string | undefined,
    ) { }
}