import { KorpayFormConfig, KorpayFormRef } from "../base-form/korpay-form"
import { KorpayForm } from "../base-form"
import { Fragment, useCallback, useEffect, useRef, useState } from "react"
import { KorpayFileInput } from "../../input"
import { useKorpayFormProvider } from "../../../../services/providers/korpay-form-provider/korpay-form-provider"
import { EnumFormSteps } from "../../../../models/enums/form-steps"
import { RiArrowRightSLine } from 'react-icons/ri'
import { KorpayButton, KorpayButtonRef } from "../../button/korpay-button"
import { Fade, Grid } from "@mui/material"
import { KorpayAnexarDocumentoComFotoFormModel } from "../../../../models/forms/korpay-anexar-documento-com-foto"
import { KorpayAnexoCPFSchema} from "../schemas/korpay-forms-schemas"
import { KorpayFileInputRef } from "../../input/korpay-file-input"
import { Theme } from "../../../../functions/themes/korpay-signup-theme"

const config: KorpayFormConfig = { base64DocumentoComFoto: "" }

export const KorpayAnexarDocumentoComFotoForm = (props: {
    id: EnumFormSteps,
    loading?: boolean
}) => {
    const { step, registrarFormAnexarDocumentoComFoto } = useKorpayFormProvider()
    
    
    const form = useRef<KorpayFormRef>(null)
   
    const fileInputRef = useRef<KorpayFileInputRef>(null)
    
  
    
    const [disable, setDisable] = useState(true);
    const fileSubmit = useCallback((enable: boolean) => {
        setDisable(enable)
    }, [])

    return step?.render === props.id ? (
        <Fade in={step?.render === props.id}>
            <div>
                <KorpayForm spacing={15} paddingBottom={50}  config={config} ref={form} validation={KorpayAnexoCPFSchema}
                    onSubmit={(values) => {
                        registrarFormAnexarDocumentoComFoto(values as KorpayAnexarDocumentoComFotoFormModel)
                    }}>
                    <Grid container spacing={2} >
                        <Grid item xs={12}>
                            <KorpayFileInput onChange={fileSubmit} name="base64DocumentoComFoto"
                                desc="busque o arquivo do seu CPF em seu computador e envie clicando aqui" ref={fileInputRef}/>
                        </Grid>
                    </Grid>

                    <KorpayButton position="end" disabled={disable} onClick={() => form.current?.onKorpayFormSubmit()} color={Theme.colors.VerdeAguaEscuro} iconProps={{
                        icon: <RiArrowRightSLine size={35} />,
                        position: 'end'
                    }} text="Continuar" />
                </KorpayForm>
            </div>
        </Fade>
    ) : <Fragment></Fragment>
}
