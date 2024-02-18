export const KorpayFormWrapper = (props: {
    children: JSX.Element | JSX.Element[],
    className?: string
}) => {
    return (
        <div style={{ width: "80%"}}>
            {props.children}
        </div>
    )
}