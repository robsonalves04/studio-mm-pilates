import { KorpayDadosEmpresaSchema } from "../schemas/korpay-forms-schemas"
import { KorpayFormConfig, KorpayFormRef } from "../base-form/korpay-form"
import { KorpayForm } from "../base-form"
import { Fragment, useRef } from "react"
import { KorpayTextInput } from "../../input"
import { useKorpayFormProvider } from "../../../../services/providers/studio-form-provider/studio-form-provider"
import { EnumFormSteps } from "../../../../models/enums/form-steps"
import { RiArrowRightSLine } from 'react-icons/ri'
import { KorpayButton } from "../../button/korpay-button"
import { Fade, Grid } from "@mui/material"
import {
    RiBuildingLine, RiSuitcaseLine, RiArticleLine, RiCalendarLine,
} from 'react-icons/ri'
import { KorpayDadosEmpresaModel } from '../../../../models/forms/korpay-dados-empresa-model'
import { KorpayTerms } from "../../terms"
import { Theme } from "../../../../functions/themes/korpay-signup-theme"

export const KorpayDadosEmpresaForm = (props: {
    id: EnumFormSteps,
    loading?: boolean
}) => {
    const { step, registrarFormDadosEmpresa, formDadosEmpresa } = useKorpayFormProvider()
    const config: KorpayFormConfig = {
        razaoSocial: formDadosEmpresa?.razaoSocial, nomeFantasia: formDadosEmpresa?.nomeFantasia,
        dataFundacao: formDadosEmpresa?.dataFundacao, atividadeEconomica: formDadosEmpresa?.atividadeEconomica,
        dataDeRegistro: formDadosEmpresa?.dataDeRegistro
    }
    const form = useRef<KorpayFormRef>(null)
    return step?.render === props.id ? (
        <Fade in={step?.render === props.id}>
            <div>
                <KorpayForm spacing={15} paddingBottom={150} config={config} ref={form}
                    validation={KorpayDadosEmpresaSchema} onSubmit={(values) => {
                        registrarFormDadosEmpresa(values as KorpayDadosEmpresaModel)
                    }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={12} lg={6}>
                            <KorpayTextInput name="razaoSocial"
                                icon={<RiBuildingLine size={24} />}   label="Razão Social"  />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={6}>
                            <KorpayTextInput name="nomeFantasia"    
                                icon={<RiSuitcaseLine size={24} />} label="Nome Fantasia" />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <KorpayTextInput name="atividadeEconomica"
                                icon={<RiArticleLine size={24} />} label="Atividade Econômica" />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={6}>
                            <KorpayTextInput masked={{ mask: "##/##/####" }} name="dataFundacao" 
                                icon={<RiCalendarLine size={24} />} label="Data de Fundação" />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={6}>
                            <KorpayTextInput masked={{ mask: "##/##/####" }} name="dataDeRegistro"
                                icon={<RiCalendarLine size={24} />} label="Data de Registro" />
                        </Grid>
                       
                    </Grid>
                        
                        <KorpayButton position="end" onClick={() => form.current?.onKorpayFormSubmit()} color={Theme.colors.VerdeAguaEscuro} iconProps={{
                        icon: <RiArrowRightSLine size={35} />, position: 'end'
                    }} text="Continuar" />
                </KorpayForm>

            <Grid paddingBottom={5}> 
                <KorpayTerms text={"Ao continuar você aceita ser contatado pela Korpay para receber orientações, dicas e ofertas, por meio dos canais oficiais do banco."}></KorpayTerms>
            </Grid>
            </div>
        </Fade>
    ) : <Fragment></Fragment>
}
