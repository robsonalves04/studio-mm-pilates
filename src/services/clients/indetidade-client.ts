import { useCallback } from "react"
import { HttpClient } from "../../data/integration/korpay-use-http-client"
import { KorpayAbrirContaPFModel } from "../../models/api/abrir-conta-models/korpay-abrir-conta-model-pf"
import { KorpayAbrirContaPJModel } from "../../models/api/abrir-conta-models/korpay-abrir-conta-model-pj"
import { KorpayContaCriadaModel } from "../../models/api/abrir-conta-models/korpay-conta-criada-model"

export const useIdentidadeClient = () => {
    const { PostAsync, loading } = HttpClient({ baseUrl: "https://api-staging-guardian.korpay.com.br" })

    const AbrirContaPJ = useCallback(
        async (model: KorpayAbrirContaPJModel): Promise<boolean> => {
            var teste = await PostAsync("api/v1/identidade/pessoa-juridica/abrir-conta", model)
            if (teste !== undefined)
                return teste.isValid!;
            return false;
        }, [PostAsync])

    const AbrirContaPF = useCallback(
        async (model: KorpayAbrirContaPFModel): Promise<boolean> => {
            var teste = await PostAsync("api/v1/identidade/pessoa-fisica/abrir-conta", model)
            if (teste !== undefined)
                return teste.isValid!;
            return false;

        }, [PostAsync])

    return {
        AbrirContaPJ,
        AbrirContaPF,
        loading
    }
}


