import { KorpayDadosEmpresaModel } from "./korpay-dados-empresa-model";
import { KorpayDadosDocumentosEmpresaModel } from "./korpay-dados-documentos-empresa-model";
import { KorpayEnderecoEContatoEmpresaModel } from "./korpay-endereco-e-contato-empresa-model";
import { KorpayAbrirContaPFModel } from "./korpay-abrir-conta-model-pf";


export interface IKorpayAbrirContaPjModel{
    dadosEmpresa :  KorpayDadosEmpresaModel,
    dadosDocumentosEmpresa : KorpayDadosDocumentosEmpresaModel,
    enderecoEContatoEmpresa : KorpayEnderecoEContatoEmpresaModel,
    dadosRepresentante : KorpayAbrirContaPFModel
}

export class KorpayAbrirContaPJModel implements IKorpayAbrirContaPjModel{
    constructor(
        public dadosEmpresa : KorpayDadosEmpresaModel,
        public dadosDocumentosEmpresa : KorpayDadosDocumentosEmpresaModel,
        public enderecoEContatoEmpresa : KorpayEnderecoEContatoEmpresaModel,
        public dadosRepresentante : KorpayAbrirContaPFModel

        // public dadosPessoais : KorpayDadosPessoaisModel,  
        // public dadosDocumentos: KorpayDadosDocumentosModel,
        // public enderecoEContato: KorpayEnderecoEContatoModel,
    ){}
}