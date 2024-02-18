import { Button, Grid, IconButton } from "@mui/material"
import { ChangeEvent, ForwardedRef, forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react"
import { RiUploadCloudFill, RiDeleteBin7Line } from 'react-icons/ri'
import { KorpayFormConfig } from "../forms/base-form/korpay-form"
import { useFormikContext } from "formik"
import { readFile } from "../../../functions/utils/korpay-image-functions"
import { css } from "aphrodite"
import { styles } from './korpay-file-input-styles'
import { toast } from "react-hot-toast"
import { Theme } from "../../../functions/themes/korpay-signup-theme"

export interface KorpayFileInputRef {
    testar: () => boolean,
    onClick: () => void,
    disable?: () => void
}

export interface KorpayFileInputProps {
    desc?: string,
    name?: string,
    onChange?: (enable: boolean) => void,
    onClick?: (enable: boolean) => void
}


export const KorpayFileInput = forwardRef((props: KorpayFileInputProps, ref: ForwardedRef<KorpayFileInputRef>) => {
    const form = useFormikContext<KorpayFormConfig>()
    const [file, setFile] = useState<File | undefined>(undefined);
    const fileRef = useRef<HTMLInputElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (props.onChange && !file) {
            props.onChange(true);
        }
        if (file && props.onChange) {

            if (validateSize(file))
                props.onChange(true)

            else if (validateType(file))
                props.onChange(true)

            else props.onChange(false)

        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [file, props])

    const handleClick = () => {
        fileRef.current?.click()
    }

    const validateSize = useCallback(
        (file: File): boolean => {
            if (file.size > 7000000) {
                toast.error("Lembrando o arquivo deve ter menos de 8mb")
                return true;
            } else 
                return false;

        }, [])

    const validateType = useCallback((file: File): boolean => {
        let type = file?.type;
        if ((type === "image/png" || type === "image/jpg" || type === "image/jpeg" ||
            type === "application/pdf")) {
            return false;
        }
        else {
            toast.error("Tipo de arquivo inválido")
            return true;
        }

    }, [])


    const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
         

            setFile(e.target.files[0])

            if (e.target.files[0]) {
                form.setFieldValue(props.name!,
                    await readFile(e.target.files[0]!));
            }
        }
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Button fullWidth variant="contained" onClick={() => handleClick()} sx={{
                    aspectRatio: "1.5/1", borderRadius: "8px", display: 'flex',
                    padding: "15px", backgroundColor: `${Theme.colors.cinzaClaro}`, boxShadow: "none",
                    textTransform: "none", "&:hover": {
                        backgroundColor: `${Theme.colors.cinzaClaro}`,
                    }
                }}>
                    <div style={{
                        borderRadius: '8px', border: `4px dashed ${Theme.colors.VerdeAguaEscuro}`,
                        width: "100%", height: '100%', display: "flex", flexDirection: 'column',
                        alignContent: 'center', alignItems: "center", justifyContent: 'center'
                    }}>
                        <RiUploadCloudFill className={css(styles.icon)} color={Theme.colors.VerdeAguaEscuro} />
                        <span className={css(styles.title)} >Procurar arquivo</span>
                        <span className={css(styles.desc)}>{props.desc}</span>
                    </div>

                    <input ref={inputRef} hidden
                        value={form.values[props.name!]} />

                    <input ref={fileRef}
                        hidden onChange={handleChange}
                        multiple type="file" required accept=".jpeg , .png , .pdf, .jpg" />

                </Button>
            </Grid>


            <Grid item xs={12}>
                <div style={{
                    borderRadius: '10px', backgroundColor: `${Theme.colors.cinzaClaro}`, padding: "20px",
                    paddingTop: "10px", paddingBottom: "10px",
                    maxWidth: "100%", display: "flex", flexDirection: 'row',
                    alignContent: 'center', alignItems: "center", justifyContent: 'space-between'
                }}>
                    {file ? (
                        exportfile = file.size,




                        file.type !== "image/png" && file.type !== "image/jpeg" && file.type !== "image/jpg"

                            ? (<span className={css(styles.label)}>Esse Não é um arquivo valido- {(file.type)} </span>) :
                            file.size > 7000000 ? (<span className={css(styles.label)}>Esse arquivo é grande demais- {(file.size / (1000000)).toPrecision(1)} Mb</span>
                            ) :
                                <a className={css(styles.label)} href={URL.createObjectURL(file)} rel='noreferrer' target='_blank'>{file.name} - {(file.size / (1000000)).toPrecision(1)} Mb</a>) :
                        <span className={css(styles.label)}>Nenhum arquivo selecionado</span>}



                    <IconButton onClick={() => setFile(undefined)}>
                        <RiDeleteBin7Line />
                    </IconButton>
                </div>
            </Grid>
        </Grid>
    )
})


export let exportfile: any
export let filetype: any
export var tipo = document.getElementById(filetype);