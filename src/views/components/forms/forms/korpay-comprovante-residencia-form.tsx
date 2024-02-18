import { KorpayFormConfig, KorpayFormRef } from "../base-form/korpay-form"
import { KorpayForm } from "../base-form"
import { useCallback, useEffect, useRef, useState } from "react"
import { KorpayFileInput } from "../../input"
import { useKorpayFormProvider } from "../../../../services/providers/studio-form-provider/studio-form-provider"
import { EnumFormSteps } from "../../../../models/enums/form-steps"
import { RiArrowRightSLine } from 'react-icons/ri'
import { KorpayButton, KorpayButtonRef } from "../../button/korpay-button"
import { Fade, Grid } from "@mui/material"
import { KorpayAnexarComprovanteDeResidenciaFormModel } from "../../../../models/forms/korpay-anexar-comprovante-residencia"
import { KorpayAnexoComprovanteDeResidenciaSchema } from "../schemas/korpay-forms-schemas"
import { KorpayFileInputRef } from "../../input/korpay-file-input"
import { Theme } from "../../../../functions/themes/korpay-signup-theme"

const config: KorpayFormConfig = { base64ComprovanteDeResidencia: "" }

export const KorpayAnexarComprovanteDeResidenciaForm = (props: {
    id: EnumFormSteps,
    loading?: boolean
}) => {
    const { step, registrarFormAnexarComprovanteDeResidencia } = useKorpayFormProvider()
    const form = useRef<KorpayFormRef>(null)
    const fileInputRef = useRef<KorpayFileInputRef>(null)

    const [disable, setDisable] = useState(true);
    const fileSubmit = useCallback((enable: boolean) => {
        setDisable(enable)
    }, [])

   
    
    return (
        <Fade in={step?.render === props.id}>
            <div>
                <KorpayForm spacing={15} paddingBottom={50} config={config} ref={form} validation={KorpayAnexoComprovanteDeResidenciaSchema}
                    onSubmit={(values) => {
                        registrarFormAnexarComprovanteDeResidencia(values as KorpayAnexarComprovanteDeResidenciaFormModel)
                    }}>

                    <Grid container spacing={2} >
                        <Grid item xs={12} md={12}>
                            <KorpayFileInput onChange={fileSubmit} name="base64ComprovanteDeResidencia" ref={fileInputRef}
                                desc="busque o arquivo do seu comprovante de residência em seu computador e envie clicando aqui" />
                        </Grid>
                    </Grid>
                    <KorpayButton position="end" disabled={disable} onClick={() => form.current?.onKorpayFormSubmit()} color={Theme.colors.VerdeAguaEscuro} iconProps={{
                        icon: <RiArrowRightSLine size={35} />,
                        position: 'end'
                    }} text="Continuar" />
                </KorpayForm>
            </div>
        </Fade>
    )
}
