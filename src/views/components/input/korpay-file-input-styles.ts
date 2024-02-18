import { StyleSheet } from "aphrodite";
import { Theme } from "../../../functions/themes/korpay-signup-theme";

export const styles = StyleSheet.create({
    title: {
        fontWeight: 600,
        fontSize: "35px",
        color: Theme.colors.cinzaEsverdeado,
        '@media (max-width: 600px)': {
            fontSize: "16px",
        }
    },
    icon: {
        fontSize: "100px",
        '@media (max-width: 600px)': {
            fontSize: "50px",
        }
    },
    desc: {
        width: "50%", fontWeight: 500,
        fontSize: "12px", color: Theme.colors.cinza,
        '@media (max-width: 600px)': {
            display: 'none'
        }
    },
    label: {
        width: "80%", fontWeight: 500,
        fontSize: "16px", color: Theme.colors.cinza,
        '@media (max-width: 600px)': {
            fontSize: "10px",
            fontWeight: 700,
        }
    },
})