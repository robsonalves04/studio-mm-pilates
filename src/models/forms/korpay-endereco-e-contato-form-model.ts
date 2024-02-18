export class KorpayEnderecoEContatoFormModel{
    constructor(
        public endereco : string |undefined,
        public cidade : string |undefined,
        public estado : string |undefined,
        public pais : string |undefined,
        public cep : string |undefined,
        public numero : string |undefined,
        public complemento : string |undefined,
        public email : string  |undefined,
        public celular : string |undefined
    ){}
}