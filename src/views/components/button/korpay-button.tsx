import { LoadingButton } from "@mui/lab"
import { css } from "aphrodite"
import { ForwardedRef, forwardRef, useCallback, useImperativeHandle, useRef, useState } from "react"
import { KorpayFileInputRef } from "../input/korpay-file-input"
import { KorpayButtonProps } from "./korpay-button-props"
import { styles } from "./korpay-button-styles"


export interface KorpayButtonRef{
    disable?: (enable : boolean) => void
}

export const KorpayButton = forwardRef((props: KorpayButtonProps, ref : ForwardedRef<KorpayButtonRef>) => {
    const classes = styles(props)

    let disable = false;

    if(props.disabled && props.disabled === true)
        disable = true;

    return (
        <div style={{ display: 'flex', width: "100%", justifyContent: props.position }}>
            <LoadingButton  disabled={disable} loading={props.loading} onClick={props.onClick} className={css(classes.button)} variant="contained">
                <div style={{
                    display: "flex", width: "100%", flexDirection: props.iconProps?.position === "end" ? "row" :
                        "row-reverse", alignContent: "center", alignItems: "center",
                    justifyContent: "space-between"
                }}>
                    <div className={css(classes.buttonText)} >
                        {props.text}
                    </div>
                    {props.iconProps !== undefined ? <div
                        className={css(classes.buttonIcon)}> {props.iconProps.icon} </div> : null}
                </div>
            </LoadingButton>
        </div>

    )
})
