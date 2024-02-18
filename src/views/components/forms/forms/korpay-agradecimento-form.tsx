import { Fade } from "@mui/material"
import { Fragment, useRef } from "react"
import { RiArrowRightSLine } from 'react-icons/ri'
import { EnumFormSteps } from "../../../../models/enums/form-steps"
import { KorpayDadosEmpresaModel } from '../../../../models/forms/korpay-dados-empresa-model'
import { useKorpayFormProvider } from "../../../../services/providers/studio-form-provider/studio-form-provider"
import { KorpayButton } from "../../button/korpay-button"
import { KorpayForm } from "../base-form"
import { KorpayFormConfig, KorpayFormRef } from "../base-form/korpay-form"
import { KorpayDadosEmpresaSchema } from "../schemas/korpay-forms-schemas"
import { Theme } from "../../../../functions/themes/korpay-signup-theme"

export const KorpayAgradecimento = (props: {
    id: EnumFormSteps,
    loading?: boolean
}) => {
    const { step, send, registrarFormDadosEmpresa, formDadosEmpresa, loading } = useKorpayFormProvider()
    const config: KorpayFormConfig = {
        razaoSocial: formDadosEmpresa?.razaoSocial, nomeFantasia: formDadosEmpresa?.nomeFantasia,
        dataFundacao: formDadosEmpresa?.dataFundacao, atividadeEconomica: formDadosEmpresa?.atividadeEconomica
        , dataRegistro: formDadosEmpresa?.dataDeRegistro
    }
    const form = useRef<KorpayFormRef>(null)
    return step?.render === props.id ? (
        <Fade in={step?.render === props.id}>
            <div>
                <KorpayForm spacing={15}  paddingBottom={50} config={config} ref={form}
                    validation={KorpayDadosEmpresaSchema} onSubmit={(values) => {
                        registrarFormDadosEmpresa(values as KorpayDadosEmpresaModel)
                    }}>
                    <KorpayButton position="end" loading={loading} onClick={send} /* onClick={()  => form.current?.onKorpayFormSubmit()}*/ color={Theme.colors.VerdeAguaEscuro}  iconProps={{
                        icon: <RiArrowRightSLine size={35} />, position: 'end'
                    }} text="Enviar" />
                </KorpayForm>
            </div>
        </Fade>
    ) : <Fragment></Fragment>
}