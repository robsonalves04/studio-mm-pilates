export class KorpayEnderecoEContatoEmpresaFormModel{
    constructor(
        public cep : string |undefined,
        public endereco : string |undefined,
        public numero : string |undefined,
        public complemento : string |undefined,
        public cidade : string |undefined,
        public estado : string |undefined,
        public pais : string |undefined,
        public celular : string |undefined,
        public email : string |undefined,
    ){}
}