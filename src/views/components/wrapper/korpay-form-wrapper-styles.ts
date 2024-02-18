import { IStyles } from "../../../functions/types/korpay-makestyles"

export const useStyle = (): IStyles => {
    return {
        formWrapper: {
            height: '100%',
            display: 'flex',
            alignItems: 'start',
            justifyContent: 'center',
            width: "100%"
        },
        formBox: {
            width: "100%"
        }
    }
}