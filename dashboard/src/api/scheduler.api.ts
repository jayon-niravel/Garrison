import axiosAPI from '../helpers/axiosConfig';

const token:any = sessionStorage.getItem('token');
const header = {
    "Authorization": `Bearer ${token}`
    }

class SchedulerAPIService {

    async list() {
        let url = `/task/list`;
        return axiosAPI<any>({headers: header, method: "get", url: url})
    }
    async create(payload: any) {
        let url = `/task/create`;
        return axiosAPI<any>({ headers: header, method: "post", url: url, data: JSON.stringify(payload)})
    }    
    async delete(payload: any) {
        let url = `/task/delete`;
        return axiosAPI<any>({ headers: header, method: "delete", url: url, data: JSON.stringify(payload)})
    }
    async get(payload: any) {
        let url = `/task/get`;
        return axiosAPI<any>({ headers: header, method: "post", url: url, data: JSON.stringify(payload)})
    }      
    async edit(payload: any) {
        let url = `/task/update`;
        return axiosAPI<any>({ headers: header, method: "patch", url: url, data: JSON.stringify(payload)})
    }            
}

export default new SchedulerAPIService();