import { Fade } from "@mui/material";
import { Fragment, useRef } from "react";
import { RiArrowRightSLine } from "react-icons/ri";
import { EnumFormSteps } from "../../../../models/enums/form-steps";
import { useKorpayFormProvider } from "../../../../services/providers/korpay-form-provider/korpay-form-provider";
import { KorpayButton } from "../../button/korpay-button";
import { KorpayFormRef } from "../base-form/korpay-form";

export const KorpayMensagemForm = (props: {
  id: EnumFormSteps;
  loading?: boolean;
}) => {
  const { step, send,loading, next } = useKorpayFormProvider();

  const mensagem = step?.mensagem;
  const form = useRef<KorpayFormRef>(null);
  return step?.render === props.id ? (
    <Fade in={step.render === props.id}>
      <div>
            <div
              style={{
                marginBottom: "30px",
                backgroundColor: "#EAEAEA",
                maxWidth:"100%",
                borderRadius: 10,
                padding: 30,
                letterSpacing:0.8,
                lineHeight:1.2,
                fontSize:15,
                fontWeight:600,
                color:"#858585"
              }}
            >
              {mensagem}
            </div>
        {step?.next===null ? null : (

          <KorpayButton
            position="end"
            loading={loading}
            onClick={next}
            /* onClick={()  => form.current?.onKorpayFormSubmit()}*/ color="#034754"
            iconProps={{
              icon: <RiArrowRightSLine size={35} />,
              position: "end",
            }}
            text="continuar"
          />
        )}

      </div>
    </Fade>
  ) : (
    <Fragment></Fragment>
  );
};
