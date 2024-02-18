import axios, { AxiosRequestConfig } from "axios";
import { Options, makeUseAxios } from "axios-hooks";
//import LRU from 'lru-cache';

import { useCallback } from "react";
import toast from "react-hot-toast";

type RequestParams = AxiosRequestConfig & {
    authorize?: boolean;
};

const _contentType: string = 'application/json';

export interface ApiBaseProps {
    config?: string | AxiosRequestConfig,
    opcoes?: Options,
    baseUrl?: string
}

const WebRequester = (params: {
    baseURL?: string
}) => {
    const createRequest = makeUseAxios({
        axios: axios.create({
            baseURL: params.baseURL,
            timeout: (300 * 1000)
        }),
        //cache: new LRU({ max: 10 })
    })
    return {
        createRequest
    }
}

export interface HttpResponseMessage<T = any> {
    data?: T;
    status?: number;
    statusText?: string;
    errors?: string[];
    sucess?: string[];
    headers?: any;
    config?: AxiosRequestConfig;
    request?: any;
    isValid?: boolean,
}

export const HttpClientFactory = (props?: ApiBaseProps) => {
    const { config, opcoes } = props || {};
    let _authorization: string | undefined = undefined;
    const [{ loading }, sendAsync] = WebRequester({
        baseURL: props?.baseUrl
    }).createRequest(config || "", opcoes);
    const SendAsync = useCallback(async (config: RequestParams) => {
        if (config.authorize)
            _authorization = ""; //-- Local Storage Token;
        try {
            return {
                ...(await sendAsync({
                    ...config,
                    headers: {
                        'Content-Type': _contentType,
                        Authorization: config.authorize ? `Bearer ${_authorization}` : undefined
                    }
                })),
                isValid: true,
            } as HttpResponseMessage
        }
        catch (e: any) {
            try {
                toast.error(e.response.data.errors.errors[0]);
                return {
                    isValid: false,
                    errors: e.response.data.errors.errors
                } as HttpResponseMessage
            } catch (e: any) {
                toast.error("Ops! Houve um problema ao enviar sua requisição, por favor, tente novamente mais tarde ;)");
                return {
                    isValid: true,
                } as HttpResponseMessage
            }
        }
    }, [])

    return {
        loading,
        SendAsync,
    }
}


export const StatusCodeValid = (status: number): boolean => {
    if (status == 200)
        return true;
    else return false;
}

export const HttpClient = (params: {
    baseUrl: string
}) => {
    const { SendAsync, loading, ...etc } = HttpClientFactory({
        baseUrl: params.baseUrl
    });

    const PostAsync = useCallback(
        async (path: string, model: any, auth: boolean = false):
            Promise<HttpResponseMessage> => {
            return await SendAsync({
                url: `${params.baseUrl}/${path}`,
                method: 'POST',
                authorize: auth,
                data: JSON.stringify(model)
            }) as HttpResponseMessage;

        }, [SendAsync, params.baseUrl])

    const GetAsync = useCallback(
        async (path: string, auth: boolean = false):
            Promise<HttpResponseMessage> => {
            return await SendAsync({
                url: `${params.baseUrl}/${path}`,
                method: 'GET',
                authorize: auth,
            }) as HttpResponseMessage
        }, [SendAsync, params.baseUrl])

    const PutAsync = useCallback(
        async (path: string, model: any, auth: boolean = false):
            Promise<HttpResponseMessage> => {
            return SendAsync({
                url: `${params.baseUrl}/${path}`,
                method: 'PUT',
                data: JSON.stringify(model),
                authorize: auth,
            }) as Promise<HttpResponseMessage>
        }, [SendAsync, params.baseUrl])

    const DeleteAsync = useCallback(
        async (path: string, auth: boolean = false):
            Promise<HttpResponseMessage> => {
            return SendAsync({
                url: `${params.baseUrl}/${path}`,
                method: 'DELETE',
                authorize: auth,
            }) as Promise<HttpResponseMessage>
        }, [SendAsync, params.baseUrl])
    const PatchAsync = useCallback(
        async (path: string, model: any, auth: boolean = false):
            Promise<HttpResponseMessage> => {
            return SendAsync({
                url: `${params.baseUrl}/${path}`,
                method: 'PATCH',
                data: JSON.stringify(model),
                authorize: auth,
            }) as Promise<HttpResponseMessage>
        }, [SendAsync, params.baseUrl])
    return {
        PostAsync,
        GetAsync,
        PutAsync,
        DeleteAsync,
        PatchAsync,
        loading
    }
}

export const SerializeAndResponseAsync = async <T>(req: HttpResponseMessage<T>): Promise<T | undefined> => {

    debugger;

    console.log("Requisição", req)

    if (req !== undefined) {
        if (req.isValid == true) {
            req.data as T
        }
        else {
            return undefined;
        }
    }
}