import axios from 'axios';
import api from './api';
var qs = require('qs');
/*配置支持cookie (不要轻易加，会引发跨域提示)*/ 
// axios.defaults.withCredentials = true;

/*获取机构类型*/
export const getAllOrgType = params => {
  return axios.get(api.getAllOrgType, {params: params});
}

/*获取上传文件token*/
export const getToken = params => {
  return axios.get(api.getToken, {params: params});
}
/*机构注册*/
export const saveOrg = data => {
  return axios.post(api.saveOrg, createPostParams(data));
}

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

/*上传文件*/
export const uploadFile = formdata => {
  return axios.post(api.uploadFile, formdata);
}

/*
* 创建Post x-www-form-urlencode请求参数, 参数转字符串
* */
function createPostParams(obj) {
  return qs.stringify(obj);
}
