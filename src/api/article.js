// 引入 axios
import axios from "axios";

let base = 'http://localhost:8080';

export const getArticleById =(articleId)=>{
    return axios({
        method:'post',
        url: `${base}/article/getArticleById/articleId/${articleId}`,
    })
}

export const getUserinfoById =(id)=>{
    return axios({
        method:'post',
        url:`${base}/user/getUserinfoById/${id}`
    })
}
