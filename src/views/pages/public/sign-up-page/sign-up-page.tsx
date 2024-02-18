import background from '../../../../assets/images/backgroundImage.jpg'
import { KorpayWrapper } from "../../../components/wrapper"
import { KorpayFrame } from "../../../components/frame";
import { Grid } from "@mui/material";
import { KorpayTitle } from '../../../components/title';
import { _getForm, useKorpayFormProvider } from '../../../../services/providers/studio-form-provider/studio-form-provider';
import { styles } from './sign-up-page-styles';
import { css } from 'aphrodite';
import { StudioOnboard } from '../../../components/forms/form-onboard/studio-onboard-form';


export const SignUpPage = () => {
    const { step, tag } = useKorpayFormProvider()

    return (
        <KorpayWrapper watermark>
            <Grid xs={0} sm={0} md={0} lg={4} >
                <KorpayFrame image={background} />
            </Grid>
            <Grid xs={12} sm={12} md={12} lg={8} className={css(styles.formWrapper)} >
                <Grid sm={12} md={8}>
                    <KorpayTitle tag={tag} title={step?.title}
                        desc={step?.subtitle} />

                        < StudioOnboard />
                        


                       

                    {/* Formulário Atual */}
                    {/* {_getForm(step?.render)} */}

                </Grid>
            </Grid>
        </KorpayWrapper>
    )
} 
