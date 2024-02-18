import { KorpayAnexoFaturalmentoSchema } from "../schemas/korpay-forms-schemas"
import { KorpayFormConfig, KorpayFormRef } from "../base-form/korpay-form"
import { KorpayForm } from "../base-form"
import { Fragment, useCallback, useEffect, useRef, useState } from "react"
import { KorpayFileInput } from "../../input"
import { useKorpayFormProvider } from "../../../../services/providers/korpay-form-provider/korpay-form-provider"
import { EnumFormSteps } from "../../../../models/enums/form-steps"
import { RiArrowRightSLine } from 'react-icons/ri'
import { KorpayButton, KorpayButtonRef } from "../../button/korpay-button"
import { Fade, Grid } from "@mui/material"
import { KorpayAnexarFaturamentoComFotoFormModel } from "../../../../models/forms/korpay-anexar-faturamento-com-foto"
import { KorpayFileInputRef } from "../../input/korpay-file-input"
import { Theme } from "../../../../functions/themes/korpay-signup-theme"

const config: KorpayFormConfig = { base64FaturamentoComFoto: "" }

export const KorpayAnexarFaturamentoComFotoForm = (props: {
    id: EnumFormSteps,
    loading?: boolean
}) => {
    const { step, registrarFormAnexarFaturamentoComFoto } = useKorpayFormProvider()
    const form = useRef<KorpayFormRef>(null)
    const fileInputRef = useRef<KorpayFileInputRef>(null)
   
    const [disable, setDisable] = useState(true);
    const fileSubmit = useCallback((enable: boolean) => {
        setDisable(enable)
    }, [])

    return step?.render === props.id ? (
        <Fade in={step.render === props.id}>
            <div>
                <KorpayForm spacing={15} paddingBottom={50} config={config} ref={form} validation={KorpayAnexoFaturalmentoSchema}
                    onSubmit={(values) => {
                        registrarFormAnexarFaturamentoComFoto(values as KorpayAnexarFaturamentoComFotoFormModel)
                    }}>

                    <Grid container spacing={2} >
                        <Grid item xs={12}>
                            <KorpayFileInput onChange={fileSubmit}
                                name="base64FaturamentoComFoto" ref={fileInputRef}
                                desc="asdasdasd o arquivo de seu Faturamento no computador e envie clicando aqui " />
                        </Grid>
                    </Grid>

                    <KorpayButton disabled={disable} position="end"
                        onClick={() => form.current?.onKorpayFormSubmit()} color={Theme.colors.VerdeAguaEscuro}
                        iconProps={{
                            icon: <RiArrowRightSLine size={35} />,
                            position: 'end'
                        }} text="Continuar" />

                </KorpayForm>
            </div>
        </Fade>
    ) : <Fragment></Fragment>
}
