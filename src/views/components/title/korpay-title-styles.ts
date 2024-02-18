import { StyleSheet } from 'aphrodite'
import { Theme } from '../../../functions/themes/korpay-signup-theme'

export const styles = StyleSheet.create({
    mainTitle: {
        display: 'none',
        '@media (max-width: 900px)': {
            display: "flex",
            fontSize: "18px",
            textTransform: 'none',
            padding: '0px',
            top: 10,
            left: 5,
            paddingLeft: "2.5px",
            position: "absolute",
            paddingRight: "2.5px",
            paddingTop: '1px',
            marginLeft: "-7px",
            letterSpacing: "0px",
            fontWeight: 900, 
            color: Theme.colors.VerdeAguaEscuro
        }
    },
    title: {
        fontSize: "32px", lineHeight: 1.25,
        fontWeight: 800,
        '@media (max-width: 600px)': {
            fontSize: "22px",
        },
        '@media (max-width: 900px)': {
            marginTop: "40px",
            fontSize: "22px",
        }
    },
    tag: {
        backgroundColor: Theme.colors.VerdeAguaEscuro,
        paddingLeft: '15px', paddingRight: '15px',
        borderRadius: "10px", boxShadow: "0px 2px 5px 1px rgba(0, 0, 0, .1)",
        height: "30px", position: "absolute", display: 'flex', color: Theme.colors.branco,
        justifyContent: 'center', alignContent: 'center', alignItems: 'center',
        fontWeight: 700, fontSize: "14px",
        '@media (max-width: 900px)': {
            marginTop: "45px",
            marginLeft: "-5px"
        }
    },
    desc: {
        fontSize: "12px", lineHeight: 1.25,
        fontWeight: 600,
        '@media (max-width: 600px)': {
            fontSize: "10px",
            color: Theme.colors.cinza,
        }
    },
    backButton: {
        position: "absolute", zIndex: 9999, padding: "0px",
        left: -70, height: "50px", top: 38, aspectRatio: "1/1",
        justifyContent: "center", alignContent: "center",
        alignItems: "center",
        '@media (max-width: 900px)': {
            display: "flex",
            top: -6.8,
            left: -22, flexDirection: "row",
        }
    },
    backIconButton: {
        fontSize: 50,
        color: Theme.colors.VerdeAguaEscuro,
        '@media (max-width: 900px)': {
            marginRight: -10,
            fontSize: 35,
            color: Theme.colors.VerdeAguaEscuro
        }
    },
    waterMark: {
        display: "none",
        zIndex: -1,
        '@media (max-width: 900px)': {
            display: "flex",
            fontSize: "15px",
            textTransform: 'none',
            padding: '0px',
            paddingLeft: "2.5px",
            paddingRight: "2.5px",
            paddingTop: '1px',
            marginLeft: "-7px",
            letterSpacing: "0px",
            fontWeight: 900, color: Theme.colors.VerdeAguaEscuro
        }
    }
})