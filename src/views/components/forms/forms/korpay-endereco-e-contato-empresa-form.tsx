import { KorpayFormConfig, KorpayFormRef } from "../base-form/korpay-form"
import { KorpayEnderecoEContatoEmpresaSchema, } from "../schemas/korpay-forms-schemas"
import { KorpayForm } from "../base-form"
import { Fragment, useRef } from "react"
import { KorpayTextInput } from "../../input"
import { useKorpayFormProvider } from "../../../../services/providers/korpay-form-provider/korpay-form-provider"
import { EnumFormSteps } from "../../../../models/enums/form-steps"
import { RiArrowRightSLine, RiPhoneLine } from 'react-icons/ri'
import { KorpayButton } from "../../button/korpay-button"
import { Fade, Grid } from "@mui/material"
import { Theme } from "../../../../functions/themes/korpay-signup-theme"
import {
    RiMap2Line, RiHashtag, RiMapPin2Line,
    RiGlobalLine, RiFlagLine, RiAsterisk, RiHome6Line, RiAtLine
} from 'react-icons/ri'
import { KorpayEnderecoEContatoEmpresaFormModel } from "../../../../models/forms/korpay-endereco-e-contato-empresa-form-model"

export const KorpayEnderecoEContatoEmpresaForm = (props: {
    id: EnumFormSteps,
    loading?: boolean
}) => {
    const { step, registrarFormEnderecoEContatoEmpresa, formEnderecoEContatoEmpresa } = useKorpayFormProvider()
    const form = useRef<KorpayFormRef>(null)
    const config: KorpayFormConfig = {
        endereco: formEnderecoEContatoEmpresa?.endereco,
        cidade: formEnderecoEContatoEmpresa?.cidade, estado: formEnderecoEContatoEmpresa?.estado,
        pais: formEnderecoEContatoEmpresa?.pais, cep: formEnderecoEContatoEmpresa?.cep,
        numero: formEnderecoEContatoEmpresa?.numero, complemento: formEnderecoEContatoEmpresa?.complemento,
        celular: formEnderecoEContatoEmpresa?.celular, email: formEnderecoEContatoEmpresa?.email
    }
    return step?.render === props.id ? (
        <Fade in={step?.render === props.id}>
            <div>

                <KorpayForm spacing={15} paddingBottom={50} config={config} ref={form} validation={KorpayEnderecoEContatoEmpresaSchema}

                    onSubmit={(values) => {
                        registrarFormEnderecoEContatoEmpresa(values as KorpayEnderecoEContatoEmpresaFormModel)
                    }}>
                    <Grid container spacing={2} >
                        <Grid item xs={12} md={12}>
                            <KorpayTextInput name="endereco" icon={<RiMapPin2Line size={24} />} label="Endereço" />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <KorpayTextInput name="bairro" icon={<RiMap2Line size={24} />} label="Bairro" />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <KorpayTextInput name="cidade" icon={<RiMap2Line size={24} />} label="Cidade" />
                        </Grid>
                        <Grid item xs={6} md={2}>
                            <KorpayTextInput name="estado" icon={<RiFlagLine size={24} />} label="Estado" />
                        </Grid>
                        <Grid item xs={6} md={2}>
                            <KorpayTextInput name="pais" icon={<RiGlobalLine size={24} />} label="País" />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <KorpayTextInput masked={{ mask: "#####-###" }} name="cep" icon={<RiAsterisk size={24} />} label="CEP" />
                        </Grid>

                        <Grid item xs={6} md={4}>
                            <KorpayTextInput name="numero" icon={<RiHashtag size={24} />} label="Número" />
                        </Grid>
                        <Grid item xs={12} md={4}>

                            <KorpayTextInput name="complemento" icon={<RiHome6Line size={24} />} label="Complemento" />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <KorpayTextInput name="email" icon={<RiAtLine size={24} />} label="E-mail" />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <KorpayTextInput masked={{ mask: " (##) ####-####" }} name="celular" icon={<RiPhoneLine size={24} />} label="Telefone" />
                        </Grid>
                    </Grid>
                    <KorpayButton position="end" onClick={() => form.current?.onKorpayFormSubmit()} color={Theme.colors.VerdeAguaEscuro} iconProps={{
                        icon: <RiArrowRightSLine size={35} />,
                        position: 'end'
                    }} text="Continuar" />
                </KorpayForm>
            </div>
        </Fade>
    ) : <Fragment></Fragment>
}
