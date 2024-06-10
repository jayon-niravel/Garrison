import apiClient from '../http-client'

import { AxiosRequestConfig } from "axios";

const axiosAPI = async<T>(config: AxiosRequestConfig): Promise<[T, null] | [null, any]> => {
  try {
    const { data } = await apiClient.request<T>(config);
    return [data, null];
  } catch (error) {
    return [null, error]
  }
}

export default axiosAPI;