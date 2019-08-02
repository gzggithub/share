import axios from 'axios';
import api from './api';
var qs = require('qs');
/*配置支持cookie (不要轻易加，会引发跨域提示)*/ 
// axios.defaults.withCredentials = true;
/*设置请求头的类型*/
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
/*设置请求头的token*/
// axios.defaults.headers.common['Authorization'] = sessionStorage.token;

/*机构分享*/
export const getOrgDetailInfo = params => {
    return axios.get(api.getOrgDetailInfo, {params: params});
}

/*课程分享*/
export const getCourseDetailInfo = params => {
    return axios.get(api.getCourseDetailInfo, {params: params});
}

/*资讯分享*/
export const getNewsDetail = params => {
    return axios.get(api.getNewsDetail, {params: params});
}

/*
* 创建Post x-www-form-urlencode请求参数, 参数转字符串
* */
function createPostParams(obj) {
    return qs.stringify(obj);
}
