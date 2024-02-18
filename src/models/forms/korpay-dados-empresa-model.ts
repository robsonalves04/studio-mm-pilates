export class KorpayDadosEmpresaModel {
    constructor(
        public razaoSocial: string | undefined,
        public nomeFantasia: string | undefined,
        public dataFundacao: string | undefined,
        public atividadeEconomica: string | undefined,
        public dataDeRegistro: string | undefined,
        public cpfEmpresa: string | undefined,
    ) { }
}