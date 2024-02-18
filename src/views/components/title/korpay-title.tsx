import { Button, Fade, Grid, IconButton } from "@mui/material"
import { RiArrowDropLeftLine } from "react-icons/ri"
import { useKorpayFormProvider } from "../../../services/providers/korpay-form-provider/korpay-form-provider"
import { styles } from "./korpay-title-styles"
import { css } from "aphrodite"
import { Theme } from "../../../functions/themes/korpay-signup-theme"

export const KorpayTitle = (props: {
    title?: string,
    desc?: string,
    tag?: string
}) => {
    const { previous, step} = useKorpayFormProvider()
    return (
        <Grid container>
            <Grid item md={12}>
                <div style={{
                    display: 'flex', flexDirection: 'column', gap: "10px", color: Theme.colors.pretoEsverdeado,
                    marginBottom: '15px', position: 'relative'
                }}>
                    {step?.previous ? <div className={css(styles.backButton)}>
                        <IconButton onClick={() => previous()}>
                            <RiArrowDropLeftLine className={css(styles.backIconButton)}  />
                        </IconButton>
                        <Button onClick={() => previous()} className={css(styles.waterMark)}>Korpay</Button>
                    </div> : <div className={css(styles.mainTitle)}>Korpay</div>}

                    <Fade in={props.tag !== undefined}>
                        <div className={css(styles.tag)}>{props.tag}</div>
                    </Fade>
                    <div style={{
                        display: 'flex', flexDirection: 'column', gap: "10px", color: Theme.colors.pretoEsverdeado,
                        marginBottom: '15px', marginTop: '50px',
                    }}>
                        <div className={css(styles.title)}>
                            {props.title}
                        </div>
                        <div className={css(styles.desc)}>
                            {props.desc}
                        </div>
                    </div>
                </div>
            </Grid>
        </Grid>
    )
}