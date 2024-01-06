import axios from "axios";
export class CategoryService {
     constructor(){
        this.url = "https://catprdapi.azurewebsites.net/api/Category";
     }

      getCategories(){
         const response =  axios.get(this.url);
        
         return response;
     }
      getCategory(id){
        const response =  axios.get(`${this.url}/${id}`);
        return response;
     }
      postCategory(cat){
        const response =  axios.post(`${this.url}`, cat, {
            headers: {
                'Content-Type':'application/json'
            }
        });
        return response;
     }
      putCategory(id,cat){
        const response =  axios.post(`${this.url}/${id}`, cat, {
            headers: {
                'Content-Type':'application/json'
            }
        });
        return response;
     }
      deleteCategory(id){
        const response =  axios.delete(`${this.url}/${id}`);
        return response;
     }
} 