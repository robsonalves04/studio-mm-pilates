export interface KorpayButtonProps {
    text?: string,
    onClick?: () => void,
    color?: string,
    iconProps?: { icon: JSX.Element, position: "end" | "start", onClick?: () => void },
    position?: "end" | "start",
    loading?:boolean
    disabled?:boolean
}