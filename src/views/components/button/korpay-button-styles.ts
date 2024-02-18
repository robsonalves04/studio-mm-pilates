import { StyleSheet } from 'aphrodite'
import { KorpayButtonProps } from './korpay-button-props'
import { Theme } from '../../../functions/themes/korpay-signup-theme'

export const styles = (props: KorpayButtonProps) => StyleSheet.create({
    button: {
        backgroundColor: props.color,
        height: "70.35px", width: '176px',
        fontWeight: 500, borderRadius: "8px",
        textTransform: "capitalize", fontSize: "22px",
        ":hover": {
            backgroundColor: Theme.colors.verdeEscuro
        },
        '@media (max-width: 600px)': {
            height: "55.35px",
            width: '135px',
        },
    },
    buttonText: {
        fontSize: "18px",
        '@media (max-width: 600px)': {
            fontSize: "14px",
            paddingLeft: "6px"
        },
    },
    buttonIcon: {
        height: "100%", display: "flex", alignContent: "center",
        alignItems: "center", justifyContent: "flex-end",
        '@media (max-width: 600px)': {
            width: "25px"
        },
    }
})