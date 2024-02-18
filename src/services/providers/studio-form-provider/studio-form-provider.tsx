import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { toValidDate } from "../../../functions/use-cases/date-functions";
import { isCPF } from "../../../functions/utils/korpay-validacoes-functions";
import { IKorpayAbrirContaPfModel } from "../../../models/api/abrir-conta-models/korpay-abrir-conta-model-pf";
import { IKorpayAbrirContaPjModel, KorpayAbrirContaPJModel } from "../../../models/api/abrir-conta-models/korpay-abrir-conta-model-pj";
import { EnumFormSteps } from "../../../models/enums/form-steps";
import { KorpayAnexarComprovanteDeResidenciaFormModel } from "../../../models/forms/korpay-anexar-comprovante-residencia";
import { KorpayAnexarComprovanteDeResidenciaEmpresaFormModel } from "../../../models/forms/korpay-anexar-comprovante-residencia-empresa-form-model";
import { KorpayAnexarContratoSocialFormModel } from "../../../models/forms/korpay-anexar-contrato-social";
import { KorpayAnexarDocumentoComFotoFormModel } from "../../../models/forms/korpay-anexar-documento-com-foto";
import { KorpayAnexarFaturamentoComFotoFormModel } from "../../../models/forms/korpay-anexar-faturamento-com-foto";
import { KorpayCPFFormModel } from "../../../models/forms/korpay-cpf-form-model";
import { KorpayDadosEmpresaModel } from "../../../models/forms/korpay-dados-empresa-model";
import { KorpayDadosPessoaisFormModel } from "../../../models/forms/korpay-dados-pessoais-form-model";
import { KorpayEnderecoEContatoEmpresaFormModel } from "../../../models/forms/korpay-endereco-e-contato-empresa-form-model";
import { KorpayEnderecoEContatoFormModel } from "../../../models/forms/korpay-endereco-e-contato-form-model";
import { KorpayAgradecimento } from "../../../views/components/forms/forms/korpay-agradecimento-form";
import { KorpayAnexarComprovanteDeResidenciaEmpresaForm } from "../../../views/components/forms/forms/korpay-comprovante-residencia-empresa-from";
import { KorpayAnexarComprovanteDeResidenciaForm } from "../../../views/components/forms/forms/korpay-comprovante-residencia-form";
import { KorpayAnexarContratoSocial } from "../../../views/components/forms/forms/korpay-contrato-social-form";
import { KorpayCPFEmpresaForm } from "../../../views/components/forms/forms/korpay-cpf-empresa-form";
import { KorpayCPFForm } from "../../../views/components/forms/forms/korpay-cpf-form";
import { KorpayDadosEmpresaForm } from "../../../views/components/forms/forms/korpay-dados-empresa-form";
import { KorpayDadosPessoaisForm } from "../../../views/components/forms/forms/korpay-dados-pessoais-form";
import { KorpayAnexarDocumentoComFotoForm } from "../../../views/components/forms/forms/korpay-documento-com-foto-form";
import { KorpayEnderecoEContatoEmpresaForm } from "../../../views/components/forms/forms/korpay-endereco-e-contato-empresa-form";
import { KorpayEnderecoEContatoForm } from "../../../views/components/forms/forms/korpay-endereco-e-contato-form";
import { KorpayAnexarFaturamentoComFotoForm } from "../../../views/components/forms/forms/korpay-faturamento-com-foto-form";
import { useIdentidadeClient } from "../../clients";
import { HttpClient } from "../../../data/integration";
import { removeNonAlphanumeric } from "../../../functions/use-cases/mask-functions";
import { KorpayCPFEmpresaFormModel } from "../../../models/forms/korpay-cpf-empresa-form-model";
import { ContinuarCadastroPjModel } from "../../../models/api/abrir-conta-models/korpay-continuar-cadastro-pj-model";
import { KorpayMensagemForm } from "../../../views/components/forms/forms/korpay-mensagem-form";


interface KorpayFormProviderContextValues {
    step?: IFormSteps,
    tag?: string,
    loading: boolean,
    // ----------------
    next: () => void,
    previous: () => void,
    // ----------------
    formCpf?: KorpayCPFFormModel,
    formCpfEmpresa?: KorpayCPFEmpresaFormModel,
    formDadosPessoais?: KorpayDadosPessoaisFormModel,
    formDadosEmpresa?: KorpayDadosEmpresaModel,
    formEnderecoEContato?: KorpayEnderecoEContatoFormModel,
    formEnderecoEContatoEmpresa?: KorpayEnderecoEContatoEmpresaFormModel,
    formAnexarContratoSocial?: KorpayAnexarContratoSocialFormModel,
    formAnexarDocumentoComFoto?: KorpayAnexarDocumentoComFotoFormModel,
    formAnexarComprovanteDeResidencia?: KorpayAnexarComprovanteDeResidenciaFormModel,
    formAnexarFaturamentoComFoto?: KorpayAnexarFaturamentoComFotoFormModel,
    formAnexarComprovanteDeResidenciaEmpresa?: KorpayAnexarComprovanteDeResidenciaEmpresaFormModel,
    // ----------------
    changeTag?: (tag: string) => void,
    // ----------------
    registrarFormDadosEmpresa: (model: KorpayDadosEmpresaModel) => void,
    registrarFormCpf: (model: KorpayCPFFormModel) => void,
    registrarFormCpfEmpresa: (model: KorpayCPFEmpresaFormModel) => void,
    registrarFormAnexarContratoSocial: (model: KorpayAnexarContratoSocialFormModel) => void,
    registrarFormDadosPessoais: (model: KorpayDadosPessoaisFormModel) => void,
    registrarFormEnderecoEContato: (model: KorpayEnderecoEContatoFormModel) => void,
    registrarFormEnderecoEContatoEmpresa: (model: KorpayEnderecoEContatoEmpresaFormModel) => void,
    registrarFormAnexarDocumentoComFoto: (model: KorpayAnexarDocumentoComFotoFormModel) => void,
    registrarFormAnexarComprovanteDeResidencia: (model: KorpayAnexarComprovanteDeResidenciaFormModel) => void,
    registrarFormAnexarFaturamentoComFoto: (model: KorpayAnexarFaturamentoComFotoFormModel) => void,
    registrarFormAnexarComprovanteDeResidenciaEmpresa: (model: KorpayAnexarComprovanteDeResidenciaEmpresaFormModel) => void,

    // ----------------
    send: () => void,
}

const KorpayFormProviderContext = createContext<KorpayFormProviderContextValues>({
    registrarFormAnexarContratoSocial: (model: KorpayAnexarContratoSocialFormModel) => true,
    registrarFormAnexarFaturamentoComFoto: (model: KorpayAnexarFaturamentoComFotoFormModel) => true,
    registrarFormDadosEmpresa: (model: KorpayDadosEmpresaModel) => true,
    registrarFormCpf: (model: KorpayCPFFormModel) => true,
    registrarFormCpfEmpresa: (model: KorpayCPFEmpresaFormModel) => true,
    registrarFormDadosPessoais: (model: KorpayDadosPessoaisFormModel) => true,
    registrarFormEnderecoEContato: (model: KorpayEnderecoEContatoFormModel) => true,
    registrarFormAnexarDocumentoComFoto: (model: KorpayAnexarDocumentoComFotoFormModel) => true,
    registrarFormAnexarComprovanteDeResidencia: (model: KorpayAnexarComprovanteDeResidenciaFormModel) => true,
    registrarFormAnexarComprovanteDeResidenciaEmpresa: (model: KorpayAnexarComprovanteDeResidenciaEmpresaFormModel) => true,
    registrarFormEnderecoEContatoEmpresa: (model: KorpayEnderecoEContatoEmpresaFormModel) => true,
    // ----------------
    next: () => true,
    previous: () => true,
    //-----------------
    send: () => true,
    loading: false
});

export const useKorpayFormProvider = () =>
    useContext(KorpayFormProviderContext);

interface IFormSteps {
    id: string,
    render: EnumFormSteps, mensagem?: string
    title: string, subtitle?: string,
    next?: string, previous?: string,
}


interface IContinueFormModel {
    exists: boolean,
    steps: IFormSteps[]
}

// -- Definindo funcionamento do provider
export const KorpayFormProvider = (props: {
    children: JSX.Element | JSX.Element[]
}) => {
    const [formCpf, setformCpf] = useState<KorpayCPFFormModel | undefined>(undefined)
    const [formDadosPessoais, setformDadosPessoais] = useState<KorpayDadosPessoaisFormModel | undefined>(undefined)
    const [formDadosEmpresa, setformDadoEmpresa] = useState<KorpayDadosEmpresaModel | undefined>(undefined)
    const [formEnderecoEContatoEmpresa, setformEnderecoEContatoEmpresa] = useState<KorpayEnderecoEContatoEmpresaFormModel | undefined>(undefined)
    const [formCpfEmpresa, setformCpfEmpresa] = useState<KorpayCPFEmpresaFormModel | undefined>(undefined)
    const [formEnderecoEContato, setformEnderecoEContato] = useState<KorpayEnderecoEContatoFormModel | undefined>(undefined)
    const [formAnexarFaturamentoComFoto, setformAnexarFaturamentoComFoto] = useState<KorpayAnexarFaturamentoComFotoFormModel | undefined>(undefined)
    const [formAnexarComprovanteDeResidencia, setformAnexarComprovanteDeResidencia] = useState<KorpayAnexarComprovanteDeResidenciaFormModel | undefined>(undefined)
    const [formAnexarDocumentoComFoto, setformAnexarDocumentoComFoto] = useState<KorpayAnexarDocumentoComFotoFormModel | undefined>(undefined)
    const [formAnexarComprovanteDeResidenciaEmpresa, setformAnexarComprovanteDeResidenciaEmpresa] = useState<KorpayAnexarComprovanteDeResidenciaEmpresaFormModel | undefined>(undefined)
    const [formAnexarContratoSocial, setformContratoSocial] = useState<KorpayAnexarContratoSocialFormModel | undefined>(undefined)

    const prod: string = "https://api-staging-guardian.korpay.com.br";

    // ==> Comunicação com API para abertura de conta
    const _httpClient = HttpClient({ baseUrl: prod })

    // ==> Tag indicando tipo de conta (física/jurídica)
    const [tag, setTag] = useState<string | undefined>(undefined)

    const [_formDetails, setFormDetails] = useState<IContinueFormModel>({
        exists: false,
        steps: [{
            id: "6614c78b-1fd7-409f-aee9-ca6dab00442f",
            render: EnumFormSteps.CPF,
            title: "Faca uma aula experimental",
            // subtitle: "insira o CNPJ da sua empresa para continuar"
        }]
    });

    const [step, setStep] = useState<IFormSteps>(_formDetails.steps[0])

    // ==> Função para alterar tag de alerta
    const changeTag = useCallback((tag: string) => setTag(tag), [])

    const getSteps = useCallback(async (cpfCnpj: string) => {
        let req = await _httpClient.GetAsync(`api/v1/identidade/continuar/${removeNonAlphanumeric(cpfCnpj)}`);
        console.clear()
        console.log(req)
        if (req.isValid)
            setFormDetails(req.data as IContinueFormModel)

    }, [_httpClient])

    // --== Enviando Formulário ==-- \\
    const reset = useCallback(() => {
        toast.loading("Sucesso! Sua solcitação foi enviada, estamos te redirecionando para nosso site")
        setTimeout(() => {
            window.location.replace('https://korpay.me');
        }, 4000);
    }, [])

    useEffect(() => {
        if (formCpf && formCpf.cpf)
            getSteps(formCpf!.cpf);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formCpf])

    const postPj = useCallback(async () => {
        const payload: IKorpayAbrirContaPjModel = {
            dadosDocumentosEmpresa: {
                base64ComprovanteDeResidenciaEmpresa: formAnexarComprovanteDeResidenciaEmpresa?.base64ComprovanteDeResidenciaEmpresa,
                base64ContratoSocial: formAnexarContratoSocial?.base64ContratoSocial,
                base64FaturamentoComFoto: formAnexarFaturamentoComFoto?.base64FaturamentoComFoto
            },
            dadosEmpresa: {
                atividadeEconomica: formDadosEmpresa?.atividadeEconomica,
                cnpj: formCpf?.cpf,
                dataFundacao: toValidDate(formDadosEmpresa?.dataFundacao!),
                dataRegistro: toValidDate(formDadosEmpresa?.dataDeRegistro!),
                nomeFantasia: formDadosEmpresa?.nomeFantasia,
                razaoSocial: formDadosEmpresa?.razaoSocial,
            },
            enderecoEContatoEmpresa: {
                celular: formEnderecoEContatoEmpresa?.celular,
                cep: formEnderecoEContatoEmpresa?.cep,
                cidade: formEnderecoEContatoEmpresa?.cidade,
                complemento: formEnderecoEContatoEmpresa?.complemento,
                email: formEnderecoEContatoEmpresa?.email,
                endereco: formEnderecoEContatoEmpresa?.endereco,
                estado: formEnderecoEContatoEmpresa?.estado,
                numero: formEnderecoEContatoEmpresa?.numero,
                pais: formEnderecoEContatoEmpresa?.pais,
            },
            dadosRepresentante: {
                dadosDocumentos: {
                    base64ComprovanteDeResidencia: formAnexarComprovanteDeResidencia?.base64ComprovanteDeResidencia,
                    base64RG: formAnexarDocumentoComFoto?.base64DocumentoComFoto,
                },
                dadosPessoais: {
                    cpfcnpj: formCpfEmpresa?.cpfEmpresa,
                    dataDeNascimento: toValidDate(formDadosPessoais?.dataNascimento!),
                    nome: formDadosPessoais?.nome,
                    profissao: formDadosPessoais?.profissao,
                    senha: formDadosPessoais?.senha,
                    sobrenome: formDadosPessoais?.sobrenome
                },
                enderecoEContato: {
                    celular: formEnderecoEContato?.celular,
                    cep: formEnderecoEContato?.cep,
                    cidade: formEnderecoEContato?.cidade,
                    complemento: formEnderecoEContato?.complemento,
                    email: formEnderecoEContato?.email,
                    endereco: formEnderecoEContato?.endereco,
                    estado: formEnderecoEContato?.estado,
                    numero: formEnderecoEContato?.numero,
                    pais: formEnderecoEContato?.pais,
                }
            }
        } as KorpayAbrirContaPJModel

        if ((await _httpClient
            .PostAsync("api/v1/identidade/pessoa-juridica/abrir-conta", payload)).isValid)
            reset();

    }, [formAnexarComprovanteDeResidenciaEmpresa?.base64ComprovanteDeResidenciaEmpresa, formAnexarContratoSocial?.base64ContratoSocial, formAnexarFaturamentoComFoto?.base64FaturamentoComFoto, formDadosEmpresa?.atividadeEconomica, formDadosEmpresa?.dataFundacao, formDadosEmpresa?.dataDeRegistro, formDadosEmpresa?.nomeFantasia, formDadosEmpresa?.razaoSocial, formCpf?.cpf, formEnderecoEContatoEmpresa?.celular, formEnderecoEContatoEmpresa?.cep, formEnderecoEContatoEmpresa?.cidade, formEnderecoEContatoEmpresa?.complemento, formEnderecoEContatoEmpresa?.email, formEnderecoEContatoEmpresa?.endereco, formEnderecoEContatoEmpresa?.estado, formEnderecoEContatoEmpresa?.numero, formEnderecoEContatoEmpresa?.pais, formAnexarComprovanteDeResidencia?.base64ComprovanteDeResidencia, formAnexarDocumentoComFoto?.base64DocumentoComFoto, formCpfEmpresa?.cpfEmpresa, formDadosPessoais?.dataNascimento, formDadosPessoais?.nome, formDadosPessoais?.profissao, formDadosPessoais?.senha, formDadosPessoais?.sobrenome, formEnderecoEContato?.celular, formEnderecoEContato?.cep, formEnderecoEContato?.cidade, formEnderecoEContato?.complemento, formEnderecoEContato?.email, formEnderecoEContato?.endereco, formEnderecoEContato?.estado, formEnderecoEContato?.numero, formEnderecoEContato?.pais, _httpClient, reset])

    const postPf = useCallback(async () => {

        const payload: IKorpayAbrirContaPfModel = {
            dadosDocumentos: {
                base64ComprovanteDeResidencia: formAnexarComprovanteDeResidencia?.base64ComprovanteDeResidencia,
                base64RG: formAnexarDocumentoComFoto?.base64DocumentoComFoto,
            },
            dadosPessoais: {
                cpfcnpj: formCpf?.cpf,
                dataDeNascimento: toValidDate(formDadosPessoais?.dataNascimento!),
                nome: formDadosPessoais?.nome,
                profissao: formDadosPessoais?.profissao,
                senha: formDadosPessoais?.senha,
                sobrenome: formDadosPessoais?.sobrenome
            },
            enderecoEContato: {
                celular: formEnderecoEContato?.celular,
                cep: formEnderecoEContato?.cep,
                cidade: formEnderecoEContato?.cidade,
                complemento: formEnderecoEContato?.complemento,
                email: formEnderecoEContato?.email,
                endereco: formEnderecoEContato?.endereco,
                estado: formEnderecoEContato?.estado,
                numero: formEnderecoEContato?.numero,
                pais: formEnderecoEContato?.pais,
            }
        }

        if ((await _httpClient
            .PostAsync("api/v1/identidade/pessoa-fisica/abrir-conta", payload)).isValid)
            reset();

    }, [_httpClient, formAnexarComprovanteDeResidencia?.base64ComprovanteDeResidencia, formAnexarDocumentoComFoto?.base64DocumentoComFoto, formCpf?.cpf, formDadosPessoais?.dataNascimento, formDadosPessoais?.nome, formDadosPessoais?.profissao, formDadosPessoais?.senha, formDadosPessoais?.sobrenome, formEnderecoEContato?.celular, formEnderecoEContato?.cep, formEnderecoEContato?.cidade, formEnderecoEContato?.complemento, formEnderecoEContato?.email, formEnderecoEContato?.endereco, formEnderecoEContato?.estado, formEnderecoEContato?.numero, formEnderecoEContato?.pais, reset])

    const putPf = useCallback(() => {

    }, [])

    const putPj = useCallback(async () => {

        const payload: ContinuarCadastroPjModel = {
            cnpj: formCpf?.cpf,
            dadosDocumentos: {
                base64ComprovanteDeResidencia: formAnexarComprovanteDeResidencia?.base64ComprovanteDeResidencia,
                base64RG: formAnexarDocumentoComFoto?.base64DocumentoComFoto,
            },
            dadosDocumentosEmpresa: {
                base64ComprovanteDeResidenciaEmpresa: formAnexarComprovanteDeResidenciaEmpresa?.base64ComprovanteDeResidenciaEmpresa,
                base64ContratoSocial: formAnexarContratoSocial?.base64ContratoSocial,
                base64FaturamentoComFoto: formAnexarFaturamentoComFoto?.base64FaturamentoComFoto
            },
        }

        await _httpClient.PutAsync("api/v1/identidade/pessoa-juridica/continuar-cadastro", payload);

    }, [_httpClient, formAnexarComprovanteDeResidencia?.base64ComprovanteDeResidencia, formAnexarComprovanteDeResidenciaEmpresa?.base64ComprovanteDeResidenciaEmpresa, formAnexarContratoSocial?.base64ContratoSocial, formAnexarDocumentoComFoto?.base64DocumentoComFoto, formAnexarFaturamentoComFoto?.base64FaturamentoComFoto, formCpf?.cpf])

    const send = useCallback(async () => {
        if (_formDetails) {

            if (_formDetails.steps && _formDetails.steps.length > 1)
                // -- Se o cadastro já existir, iremos atualizar, enviando um PUT
                if (_formDetails.exists === true) {
                    // -- Se for uma pessoa física, enviar no endpoint de pessoa física
                    if (isCPF(formCpf?.cpf!)) await putPf()

                    // -- Se for pessoa jurídica, enviar no endpoint de pessoa jurídica
                    else await putPj();
                    reset()
                }
                // -- Caso não exista, iremos criar, enviando um POST
                else {
                    // -- Se for uma pessoa física, enviar no endpoint de pessoa física
                    if (isCPF(formCpf?.cpf!)) await postPf();
                    // -- Se for pessoa jurídica, enviar no endpoint de pessoa jurídica
                    else postPj();
                }
        }

    }, [_formDetails, formCpf?.cpf, postPf, postPj, putPf, putPj, reset])

    const next = useCallback(() => {

        if (_formDetails.steps.filter(x => x.id === step.next)[0]) {
            setStep(_formDetails.steps.filter(x => x.id === step.next)[0]);
        }

    }, [_formDetails, step])

    const previous = useCallback(() => {

        if (_formDetails.steps.filter(x => x.id === step.previous)[0]) {
            setStep(_formDetails.steps.filter(x => x.id === step.previous)[0]);
        } else setStep({
            id: "6614c78b-1fd7-409f-aee9-ca6dab00442f",
            render: EnumFormSteps.CPF,
            title: "Para começar, vamos precisar de alguns dados",
            subtitle: "insira o CNPJ da sua empresa para continuar"
        })

    }, [_formDetails, step])


    useEffect(() => {
        if (_formDetails && _formDetails.steps && _formDetails.steps.length > 1 &&
            step.render === EnumFormSteps.CPF) {
            setStep(_formDetails.steps[0]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [_formDetails])

    useEffect(() => {
        if (step.next && step.render === EnumFormSteps.CPF)
            next();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [step])

    useEffect(() => {
        if (_formDetails)
            next()
    },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [formDadosPessoais, formDadosEmpresa, formEnderecoEContatoEmpresa,
            formCpfEmpresa, formEnderecoEContato, formAnexarFaturamentoComFoto,
            formAnexarComprovanteDeResidencia, formAnexarDocumentoComFoto,
            formAnexarComprovanteDeResidenciaEmpresa, formAnexarContratoSocial])


    // -- Inserindo form CPF
    const registrarFormCpf = useCallback((model: KorpayCPFFormModel) => {
        //getSteps(formCpf!.cpf);
        setformCpf(model);
    }, [])

    // -- Inserindo form dados pessoais
    const registrarFormDadosPessoais = useCallback((model: KorpayDadosPessoaisFormModel) =>
        setformDadosPessoais(model), [])

    // -- Inserindo o Cpf no caso de ser uma pessoa jurídica
    const registrarFormCpfEmpresa = useCallback((model: KorpayCPFEmpresaFormModel) =>
        setformCpfEmpresa(model), [])

    // -- Inserindo form endereço e contato
    const registrarFormEnderecoEContato = useCallback((model: KorpayEnderecoEContatoFormModel) =>
        setformEnderecoEContato(model), [])

    // -- Inserindo form de documento com foto
    const registrarFormAnexarDocumentoComFoto = useCallback((model: KorpayAnexarDocumentoComFotoFormModel) =>
        setformAnexarDocumentoComFoto(model), [])

    // -- Inserindo form de comprovante de residencia
    const registrarFormAnexarComprovanteDeResidencia = useCallback((model: KorpayAnexarComprovanteDeResidenciaFormModel) =>
        setformAnexarComprovanteDeResidencia(model), [])

    // -- Inserindo form de dados da empresa
    const registrarFormDadosEmpresa = useCallback((model: KorpayDadosEmpresaModel) =>
        setformDadoEmpresa(model), [])

    // -- Inserindo form de Comprovante de Faturamento da empresa
    const registrarFormAnexarFaturamentoComFoto = useCallback((model: KorpayAnexarFaturamentoComFotoFormModel) =>
        setformAnexarFaturamentoComFoto(model), [])

    // --== Registrando o endereço e contado da empresa 
    const registrarFormEnderecoEContatoEmpresa = useCallback((model: KorpayEnderecoEContatoEmpresaFormModel) =>
        setformEnderecoEContatoEmpresa(model), [])

    // -- Inserindo form de Comprante de Residencia da Empresa
    const registrarFormAnexarComprovanteDeResidenciaEmpresa = useCallback((model: KorpayAnexarComprovanteDeResidenciaEmpresaFormModel) =>
        setformAnexarComprovanteDeResidenciaEmpresa(model), [])

    // -- Inserindo o Contrato Social
    const registrarFormAnexarContratoSocial = useCallback((model: KorpayAnexarContratoSocialFormModel) =>
        setformContratoSocial(model), [])


    return (
        <KorpayFormProviderContext.Provider value={{
            step, registrarFormCpf, registrarFormDadosPessoais,
            registrarFormEnderecoEContato, registrarFormAnexarDocumentoComFoto,
            tag, changeTag, send, formCpf, formDadosPessoais, formEnderecoEContato,
            formAnexarDocumentoComFoto, formAnexarComprovanteDeResidencia, registrarFormAnexarFaturamentoComFoto, formAnexarFaturamentoComFoto,
            next, previous, formDadosEmpresa, registrarFormDadosEmpresa, registrarFormAnexarComprovanteDeResidenciaEmpresa, formAnexarComprovanteDeResidenciaEmpresa,
            registrarFormAnexarComprovanteDeResidencia, loading: _httpClient.loading,
            registrarFormEnderecoEContatoEmpresa, formEnderecoEContatoEmpresa, registrarFormAnexarContratoSocial, registrarFormCpfEmpresa, formCpfEmpresa,
        }}>
            {props.children}
        </KorpayFormProviderContext.Provider>
    )
}

export const _getForm = (id?: EnumFormSteps): JSX.Element => {

    // -- Formulário de CPF/CNPJ
    if (id === EnumFormSteps.CPF)
        return <KorpayCPFForm id={EnumFormSteps.CPF} />

    // -- Formulário de dados pessoais para pessoa física
    else if (id === EnumFormSteps.DADOS_PESSOAIS)
        return <KorpayDadosPessoaisForm id={EnumFormSteps.DADOS_PESSOAIS} />

    // -- Formulário de endereço e contato de pessoa física
    else if (id === EnumFormSteps.ENDERECO_E_CONTATO)
        return <KorpayEnderecoEContatoForm id={EnumFormSteps.ENDERECO_E_CONTATO} />

    else if (id === EnumFormSteps.ANEXAR_DOCUMENTO_COM_FOTO)
        return <KorpayAnexarDocumentoComFotoForm id={EnumFormSteps.ANEXAR_DOCUMENTO_COM_FOTO} />

    else if (id === EnumFormSteps.ANEXAR_COMPROVANTE_DE_RESIDENCIA)
        return <KorpayAnexarComprovanteDeResidenciaForm id={EnumFormSteps.ANEXAR_COMPROVANTE_DE_RESIDENCIA} />

    else if (id === EnumFormSteps.DADOS_EMPRESA)
        return <KorpayDadosEmpresaForm id={EnumFormSteps.DADOS_EMPRESA} />

    else if (id === EnumFormSteps.DADOS_EMPRESA_ENDERECO)
        return <KorpayEnderecoEContatoEmpresaForm id={EnumFormSteps.DADOS_EMPRESA_ENDERECO} />

    else if (id === EnumFormSteps.DADOS_FATURAMENTO_COM_FOTO)
        return <KorpayAnexarFaturamentoComFotoForm id={EnumFormSteps.DADOS_FATURAMENTO_COM_FOTO} />

    else if (id === EnumFormSteps.DADOS_EMPRESA_RESIDENCIA)
        return <KorpayAnexarComprovanteDeResidenciaEmpresaForm id={EnumFormSteps.DADOS_EMPRESA_RESIDENCIA} />

    else if (id === EnumFormSteps.DADOS_EMPRESA_CONTRATO_SOCIAL)
        return <KorpayAnexarContratoSocial id={EnumFormSteps.DADOS_EMPRESA_CONTRATO_SOCIAL} />

    else if (id === EnumFormSteps.DADOS_EMPRESA_CPF)
        return <KorpayCPFEmpresaForm id={EnumFormSteps.DADOS_EMPRESA_CPF} />

    else if (id === EnumFormSteps.MENSAGEM)
        return <KorpayMensagemForm id={EnumFormSteps.MENSAGEM} />

    else return <KorpayAgradecimento id={EnumFormSteps.AGRADECIMENTO} />
}