import { RiUserLine, RiHashtag, RiShirtLine, RiCalendar2Line, RiLockPasswordLine } from 'react-icons/ri'
import { KorpayDadosPessoaisSchema } from "../schemas/korpay-forms-schemas"
import { KorpayFormConfig, KorpayFormRef } from "../base-form/korpay-form"
import { KorpayForm } from "../base-form"
import { Fragment, useRef } from "react"
import { KorpayTextInput } from "../../input"
import { useKorpayFormProvider } from "../../../../services/providers/korpay-form-provider/korpay-form-provider"
import { EnumFormSteps } from "../../../../models/enums/form-steps"
import { RiArrowRightSLine } from 'react-icons/ri'
import { KorpayButton } from "../../button/korpay-button"
import { Fade, Grid } from "@mui/material"
import { KorpayDadosPessoaisFormModel } from "../../../../models/forms/korpay-dados-pessoais-form-model"
import { KorpayTerms } from '../../terms'
import { Theme } from '../../../../functions/themes/korpay-signup-theme'

export const KorpayDadosPessoaisForm = (props: {
    id: EnumFormSteps,
    loading?: boolean
}) => {
    const { step, registrarFormDadosPessoais, formDadosPessoais } = useKorpayFormProvider()
    const config: KorpayFormConfig = {
        nome: formDadosPessoais?.nome, sobrenome: formDadosPessoais?.sobrenome,
        dataNascimento: formDadosPessoais?.dataNascimento, profissao: formDadosPessoais?.profissao,
        senha: "", confimarSenha: ""
    }

    const form = useRef<KorpayFormRef>(null)
    return step?.render === props.id ? (
        <Fade in={step?.render === props.id}>
            <div>
                <KorpayForm spacing={15} paddingBottom={50}  config={config} ref={form} validation={KorpayDadosPessoaisSchema}
                    onSubmit={(values) => { registrarFormDadosPessoais(values as KorpayDadosPessoaisFormModel) }}>

                    <Grid container spacing={2} >
                        <Grid item xs={12} sm={12} md={12} lg={4}>
                            <KorpayTextInput name="nome" icon={<RiUserLine size={24} />} label="Nome" />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={8}>
                            <KorpayTextInput name="sobrenome" icon={<RiHashtag size={24} />} label="Sobrenome" />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={5}>
                            <KorpayTextInput masked={{ mask: "##/##/####" }} name="dataNascimento" label="Data de Nascimento"
                                icon={<RiUserLine size={24} />} />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={7}>
                            <KorpayTextInput name="profissao" 
                                icon={<RiShirtLine size={24} />} label="Profissão" />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={6}>
                            <KorpayTextInput type='password' name="senha" textFieldProps={{ type: "password" }}
                                icon={<RiLockPasswordLine size={24} />} label="Escolha uma senha" />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={6}>
                            <KorpayTextInput type='password' name="confirmarSenha" textFieldProps={{ type: "password" }}
                                icon={<RiLockPasswordLine size={24} />} label="Confirme sua senha" />
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
