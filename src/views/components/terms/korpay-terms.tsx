import { grey } from "@mui/material/colors"

export const KorpayTerms = (props: {
    text?:String,
}) => {return(
    <div style={{
        display:"flex", alignContent: 'center',
        alignItems:'center', gap:"50px", color:"grey" , textAlign:"center",
    }}>
        <div style={{ display: "flex", alignContent: 'center', alignItems:"flex-end", fontSize:"14px", gap:"30px"}}>
                {props.text}
        </div>
    </div>
)

}