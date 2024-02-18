export const KorpayLabelRoot = (props: {
    icon?: JSX.Element,
    text?: string,
    margin?: number | string
}) => {
    return (
        <div style={{
            display: "flex", alignContent: 'center',
            alignItems: 'center', gap: "10px"
        }}>
            <div style={{ display: "flex", alignContent: 'center', alignItems: 'center', }}>
                {props.icon}
            </div>
            <div style={{ display: "flex", alignContent: 'center', alignItems: 'center', }}>
                {props.text}
            </div>
        </div>
    )
}