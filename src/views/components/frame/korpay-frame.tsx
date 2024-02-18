export const KorpayFrame = (props :{
    image ?: any
}) => {
    return <div style={{
        background: `url(${props.image})`,
        width: "100%", backgroundPosition: 'center', height: "100%",
        backgroundRepeat: 'no-repeat', backgroundSize: "cover"
    }} />
}