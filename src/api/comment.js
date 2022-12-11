// 引入 axios
import axios from "axios";

let base = 'http://localhost:8080';

export const getCommentReply =(articleId)=>{
    return axios({
        method:'post',
        url:`${base}/comment/getCommentReply/${articleId}`,
    })
}