import { KorpayDadosDocumentosModel } from "./korpay-dados-documentos-model";
import { KorpayDadosPessoaisModel } from "./korpay-dados-pessoais-model";
import { KorpayEnderecoEContatoModel } from "./korpay-endereco-e-contato-model";

export interface IKorpayAbrirContaPfModel {
    dadosPessoais: KorpayDadosPessoaisModel,
    dadosDocumentos: KorpayDadosDocumentosModel,
    enderecoEContato: KorpayEnderecoEContatoModel,
}

export class KorpayAbrirContaPFModel {
    constructor(
        public dadosPessoais: KorpayDadosPessoaisModel,
        public dadosDocumentos: KorpayDadosDocumentosModel,
        public enderecoEContato: KorpayEnderecoEContatoModel,
    ) { }
}