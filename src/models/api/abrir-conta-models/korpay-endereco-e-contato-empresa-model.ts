export class KorpayEnderecoEContatoEmpresaModel{
    constructor(
        public cep ?: string,
        public endereco ?: string,
        public numero ?: string,
        public complemento ?: string,
        public cidade ?: string,
        public estado ?: string,
        public pais ?: string,
        public celular ?: string,
        public email?:string,


    ){}
}