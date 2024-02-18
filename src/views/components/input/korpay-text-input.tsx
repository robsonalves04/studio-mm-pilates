import { FilledInputProps, IconButton, InputAdornment, InputProps, OutlinedInput, OutlinedInputProps, SxProps, TextField, TextFieldProps } from "@mui/material"
import { useFormikContext } from "formik";
import { ForwardedRef, forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react"
import { renderToString } from 'react-dom/server';
import { KorpayFormConfig } from "../forms/base-form/korpay-form";
import { KorpayLabelRoot } from "../label/korpay-label";
import { KorpayMask } from "../../../functions/use-cases/mask-functions";
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";
import { Theme } from "../../../functions/themes/korpay-signup-theme";

// -- Propriedades do componente
interface KorpayTextInputProps {
    label?: string, textFieldProps?: TextFieldProps,
    icon?: JSX.Element, name?: string,
    type?: "text" | "password" | "date" | "number",
    isNumber?: boolean,
    masked?: {
        mask?: string, alternativemMask?: string
    }
}

interface textTypeProps {
    type?: "text" | "password" | "date" |"number",
    onClick: () => void,
    active: boolean
}

export interface KorpayTextInputRef {
    masked?: {
        alternativeMaskMatch?: boolean
    }
}

export const KorpayTextInput = forwardRef((props: KorpayTextInputProps, ref: ForwardedRef<KorpayTextInputRef>) => {
    const labelRef = useRef<HTMLLabelElement>(null);
    const [alternativeMaskMatch, setAlternativeMaskMatch] = useState<boolean>(false)
    const [active, setActive] = useState(false)

    useImperativeHandle(ref, () => ({
        masked: {
            alternativeMaskMatch: alternativeMaskMatch
        }
    }))

    const form = useFormikContext<KorpayFormConfig>()
    const _labelIconContent = renderToString(KorpayLabelRoot({
        icon: props.icon, text: props.label
    }));

    useEffect(() => {
        labelRef.current!.innerHTML = _labelIconContent;
    }, [_labelIconContent, props.icon, props.label])

    const handleFocus = useCallback(() => {
        if (props.label)
            labelRef.current!.textContent = props.label
    }, [props.label])

    const handleBlur = useCallback((event: React.FocusEvent<HTMLInputElement>) => {
        if (props.label) labelRef.current!.innerHTML = _labelIconContent;
    }, [_labelIconContent, props.label]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (props.masked) {
            const maskedValue = KorpayMask(props.masked?.mask!, event.target.value, props.masked?.alternativemMask);
            form.setFieldValue(props.name!, maskedValue);
        } else form.setFieldValue(props.name!, event.target?.value);
    };

    const setFormValue = useCallback(() => {
        form.setFieldValue(props.name!, form.values[props.name!]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [form.values[props.name!]])

    useEffect(() => { setFormValue() },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [form.values[props.name!]])

    return (
        <TextField id={props.name} InputLabelProps={{
            ref: labelRef, style: {
                paddingLeft: "0.15rem", display: 'flex',
                alignItems: 'center',
            },
        }} InputProps={{
            
            ...typeField({
                type: props.type,
                active: active,
                onClick: () => setActive(!active)
            }),
        }} label={props.label} variant="outlined" fullWidth sx={styles} onChange={handleChange}
            value={form.values[props.name!]} name={props.name}
            onFocus={handleFocus} onBlur={handleBlur} {...props.textFieldProps}
        />
    )
})


const typeField =(props: textTypeProps): Partial<FilledInputProps>
    | Partial<OutlinedInputProps> | Partial<InputProps>=> {
    if (props.type === "password")
        return {
            type: props.active ? 'text' : 'password',
            endAdornment: (
                <IconButton onClick={() => props.onClick()}>
                    {props.active ? <RiEyeLine /> : <RiEyeCloseLine />}
                </IconButton>
            )
        }
    else if (props.type === "date") {
        return {
            inputMode:"numeric" ,type:"string"
        }
    }
    else if (props.type === "number") {
        return{
            type: "number", inputMode:"numeric", 
        }
    }
    else return {}
}


const styles: SxProps = {
    backgroundColor: Theme.colors.brancoArroxeado,
    borderRadius: '10px',
    WebkitAppearance: 'none',
    "& .MuiOutlinedInput-root": {
        color: Theme.colors.cinzaAzulado,
        "& fieldset": {
            borderRadius: "10px",
            border: 'none',
        },
        "&.Mui-focused": {
            transition: '.09s',
            color: Theme.colors.VerdeAguaEscuro,
            fontWeight: 800,
        },
        "&.Mui-focused fieldset": {
            borderColor: Theme.colors.vermelho,
            transition: '.09s',
            border: `3px solid ${Theme.colors.VerdeAguaEscuro}`,
        }
    },
    "& label.Mui-focused": {
        color: Theme.colors.VerdeAguaEscuro,
        fontWeight: 600
    },
    "& label": {
        color: Theme.colors.cinzaAzulado,
        fontWeight: 500,
    }
   
} 