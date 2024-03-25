import apiClient from "./api-Client";

const controller = new AbortController;

interface Entity {
    _id:string
}

class Httpservice{
    

    endpoint:string

    constructor(endpoint:string){
       this.endpoint = endpoint

    }


    getall<T>(){
        return apiClient.get<T>(this.endpoint,{
            signal : controller.signal
        })

        
    }

    getById<T>(id: string) {
        const controller = new AbortController();
        const signal = controller.signal;

        return apiClient.get<T>(`${this.endpoint}/${id}`, {
            signal,
        }).then((response) => {
            controller.abort(); // Abort the request after it's completed
            return response;
        })
    }

    create<T>(entity :T){
        return apiClient.post(this.endpoint,entity)
    }
   

    delete(userid: string){
        return apiClient.delete(this.endpoint + "/" + userid)
    }

    update<T extends Entity>(entity: T){
        return apiClient.patch(
            this.endpoint + "/" + entity._id,entity
        )
    }

    getByPage<T>(page: number,search:string) {
        const signal = controller.signal;

        return apiClient.get<T>(this.endpoint, {
            signal,
            params: {
                page,
                pageSize:10,
                search
            }
        })
    }



    async get<T>(params?: Record<string, any>) {
        const controller = new AbortController();
        const signal = controller.signal;
      
        const response = await apiClient.get<T>(this.endpoint, {
          signal,
          params, // Include query parameters here
        });
        controller.abort(); // Abort the request after it's completed
        return response;
      }
}

const apidata = (endpoint:string)=> new Httpservice(endpoint)

export default apidata;