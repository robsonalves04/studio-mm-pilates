import { useKorpayFormProvider } from "../../../../services/providers/korpay-form-provider/korpay-form-provider"
import { KorpayFormConfig, KorpayFormRef } from "../base-form/korpay-form"
import { KorpayCPFFormModel } from "../../../../models/forms/korpay-cpf-form-model"
import { EnumFormSteps } from "../../../../models/enums/form-steps"
import { KorpayCPFSchema } from "../schemas/korpay-forms-schemas"
import { KorpayButton } from "../../button/korpay-button"
import { RiArrowRightSLine } from 'react-icons/ri'
import { KorpayTextInput } from "../../input"
import { RiUserLine } from 'react-icons/ri'
import { KorpayForm } from "../base-form"
import { Fragment, useCallback, useRef, useState } from "react"
import { Fade } from "@mui/material"
import { Theme } from "../../../../functions/themes/korpay-signup-theme"

export const KorpayCPFForm = (props: {
    id: EnumFormSteps,
    loading?: boolean,
}) => {
    const { step, registrarFormCpf, formCpf, loading } = useKorpayFormProvider()
    const form = useRef<KorpayFormRef>(null)
    const config: KorpayFormConfig = { cpf: formCpf?.cpf }
    
   


    return step?.render === props.id ? (
        <Fade in={step?.render === props.id}>
            <div>
                <KorpayForm spacing={25}  paddingBottom={50} config={config} ref={form}
                    validation={KorpayCPFSchema} onSubmit={(values) => {
                        registrarFormCpf(values as KorpayCPFFormModel)
                    }}>
                        
                    <KorpayTextInput masked={{
                        mask:        //mascara de pessoa fisica ->"###.###.###-##",
                         "##.###.###/####-##"
                    }} name="cpf" label="CNPJ"
                   
                        icon={<RiUserLine size={24} />} />
                    <KorpayButton loading={loading} position="end" onClick={() => form.current?.onKorpayFormSubmit()} color={Theme.colors.VerdeAguaEscuro} iconProps={{
                        icon: <RiArrowRightSLine size={35} />, position: 'end'
                    }} text="Continuar" />
                </KorpayForm>
            </div>
        </Fade>
    ) : <Fragment></Fragment>
}
