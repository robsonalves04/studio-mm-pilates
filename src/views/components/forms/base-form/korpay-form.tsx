import * as yup from "yup";
import { forwardRef, ForwardedRef, useImperativeHandle, useCallback, useEffect } from "react"
import { FormikConfig, FormikProps, FormikProvider, useFormik } from "formik";
import toast from "react-hot-toast";

// -- Interface de referência
export interface KorpayFormRef {
    onKorpayFormSubmit: () => void;
    options: FormikProps<KorpayFormConfig>;
}

// -- Interface de inicialização
export interface KorpayFormConfig {
    [key: string]: any
}

// -- Propriedades do componente
interface KorpayFormProps {
    children?: JSX.Element | JSX.Element[];
    spacing?: number,
    padding?: number,
    margin?: string,
    paddingBottom?: number
    onSubmit: (values: KorpayFormConfig) => void;
    config: KorpayFormConfig;
    formikProps?: { config: FormikConfig<string[]> };
    validation?: yup.AnyObjectSchema ;
    validade?: yup.AnyObjectSchema;
}

export const KorpayForm = forwardRef(<T extends KorpayFormConfig>(props: KorpayFormProps,
    ref: ForwardedRef<KorpayFormRef>) => {
    const formik: FormikProps<KorpayFormConfig> = useFormik<KorpayFormConfig>({
        initialValues: props.config as T,
        enableReinitialize: true,
        validationSchema: props.validation,
        ...props.formikProps || {},
        onSubmit: (values) => {
            props.onSubmit(values)
        }
    })

    const submitForm = useCallback(() => {
        if (!formik.isValid)
            toast.error(`${formik.errors[getFirstPropNameWithValue(formik.errors)]}`)
        formik.handleSubmit()
    }, [formik])

    // useEffect(() => {
    //     if (!formik.isValid)
    //         toast.error(`${formik.errors[getFirstPropNameWithValue(formik.errors)]}`)
    // }, [formik.errors, formik.isValid, props.config])

    useImperativeHandle(ref, () => ({
        onKorpayFormSubmit: submitForm,
        options: formik
    }));

    return (
        <form onSubmit={formik.handleSubmit}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: props.spacing, padding:props.padding ,margin:props.margin, paddingBottom:props.paddingBottom }}>
                <FormikProvider value={formik}>
                    {props.children}
                </FormikProvider>
            </div>
        </form>
    )
});

function getFirstPropNameWithValue(obj: any): string {
    for (const prop in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, prop) && obj[prop]) {
            return prop;
        }
    }
    return "!";
}