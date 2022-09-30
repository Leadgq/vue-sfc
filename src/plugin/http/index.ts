import axios, { AxiosRequestConfig } from 'axios';
import { ElMessage } from "element-plus";
export type responseResult<T> = {
    code: number;
    message: string,
    result: T
}
export default class Axios {
    private instance;
    constructor(config: AxiosRequestConfig) {
        this.instance = axios.create(config);
        this.intercept();
    }
    private intercept() {
        this.interceptRequest();
        this.interceptResponse();
    }
    public async request<T, D = responseResult<T>>(config: AxiosRequestConfig): Promise<D> {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await this.instance.request<D>(config);
                resolve(response.data)
            } catch (error) {
                ElMessage.error('网络错误');
                reject(error);
            }
        })
    }
    private interceptRequest() {
        this.instance.interceptors.request.use(function (config) {
            // 在发送请求之前做些什么
            return config;
        }, function (error) {
            // 对请求错误做些什么
            return Promise.reject(error);
        });
    }
    private interceptResponse() {
        this.instance.interceptors.response.use(function (response) {
            // 对响应数据做点什么
            return response;
        }, function (error) {
            // 对响应错误做点什么
            return Promise.reject(error);
        });
    }
}
