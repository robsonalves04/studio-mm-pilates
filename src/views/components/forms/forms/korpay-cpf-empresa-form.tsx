import { Fade } from "@mui/material"
import { Fragment, useRef } from "react"
import { RiArrowRightSLine, RiUserLine } from 'react-icons/ri'
import { EnumFormSteps } from "../../../../models/enums/form-steps"
import { KorpayCPFEmpresaFormModel } from "../../../../models/forms/korpay-cpf-empresa-form-model"
import { useKorpayFormProvider } from "../../../../services/providers/studio-form-provider/studio-form-provider"
import { KorpayButton } from "../../button/korpay-button"
import { KorpayTextInput } from "../../input"
import { KorpayForm } from "../base-form"
import { KorpayFormConfig, KorpayFormRef } from "../base-form/korpay-form"
import { KorpayCPFEmpresaSchema } from "../schemas/korpay-forms-schemas"
import { Theme } from "../../../../functions/themes/korpay-signup-theme"


export const KorpayCPFEmpresaForm = (props: {
    id: EnumFormSteps,
    loading?: boolean,
}) => {
    const { step, registrarFormCpfEmpresa, formCpfEmpresa } = useKorpayFormProvider()
    const form = useRef<KorpayFormRef>(null)
    const config: KorpayFormConfig = { cpfEmpresa: formCpfEmpresa?.cpfEmpresa }
    
    return step?.render === props.id ? (
        <Fade in={step?.render === props.id}>
            <div>
                <KorpayForm spacing={25}  paddingBottom={50} config={config} ref={form}  validation={KorpayCPFEmpresaSchema}
                       onSubmit={(values) => {
                        registrarFormCpfEmpresa(values as KorpayCPFEmpresaFormModel)
                    }}>
                        
                        <KorpayTextInput masked={{
                        mask: "###.###.###-##",
                    }} name="cpfEmpresa" label="CPF"
                   
                        icon={<RiUserLine size={24} />} />
                    <KorpayButton position="end" onClick={() => form.current?.onKorpayFormSubmit()} color={Theme.colors.VerdeAguaEscuro} iconProps={{
                        icon: <RiArrowRightSLine size={35} />, position: 'end'
                    }} text="Continuar" />
                </KorpayForm>
            </div>
        </Fade>
    ) : <Fragment></Fragment>
}
