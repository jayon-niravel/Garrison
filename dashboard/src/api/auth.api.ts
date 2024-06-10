import axiosAPI from '../helpers/axiosConfig';

class AuthAPIService {
    
    async signup(payload: any) {
        let url = `/auth/signup`;
        return axiosAPI<any>({ method: "post", url: url, data: JSON.stringify(payload)})
    }
    async signin(payload: any) {
        let url = `/auth/sign_in`;
        return axiosAPI<any>({ method: "post", url: url, data: JSON.stringify(payload)})
    }    
}

export default new AuthAPIService();