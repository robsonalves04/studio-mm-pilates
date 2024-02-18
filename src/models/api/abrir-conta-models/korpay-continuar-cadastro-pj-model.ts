import { KorpayDadosDocumentosEmpresaModel } from "./korpay-dados-documentos-empresa-model";
import { KorpayDadosDocumentosModel } from "./korpay-dados-documentos-model";

export class ContinuarCadastroPjModel{
    constructor(
        public cnpj ?: string,
        public dadosDocumentosEmpresa ?: KorpayDadosDocumentosEmpresaModel,
        public dadosDocumentos ?: KorpayDadosDocumentosModel,
    ){}
}