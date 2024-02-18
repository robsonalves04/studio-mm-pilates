import { StyleSheet } from 'aphrodite';

export const styles = StyleSheet.create({
    rightside: {
        display: 'flex',
        height: '100vh',
        padding: '80px',
        '@media (max-width: 900px)': {
            padding: '50px',
        },
    },
    formWrapper: {
        overflow: "auto",
        justifyContent: "center",
        display: "flex",
        padding: "50px",
        paddingTop: "85px",
        height: "100vh",
        '@media (max-width: 900px)': {
            padding: '20px',
        },
    }
});