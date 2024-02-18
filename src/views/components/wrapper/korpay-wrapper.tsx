import { Grid } from "@mui/material"

interface KorpayWrapperProps {
    children: JSX.Element[] | JSX.Element,
    watermark?: boolean
}

export const KorpayWrapper = (props: KorpayWrapperProps) => {
    return (
        <Grid container xs={12}>
            <div style={{ width: "100%" }}>
                {props.watermark ? <div style={{
                    position: 'absolute', top: 15, left: 15,
                    color: "white", fontWeight: 800,
                }}>Studio MM Pilates</div> : null}
                <div style={{ display: "flex" }}>
                    {props.children}
                </div>
            </div>
        </Grid>
    )
}