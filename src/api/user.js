import request from "@/utils/request";
import qs from "qs";
//log out 注销
//log in 登录
//sign in 登录
//sign up 注册

// 获取User数据的API
//除了下面这个登出用户的必须要同步，其它的都是异步请求
export const setLogout = async () => {
    await request.get(`/api/logout`);
};

export const getUserList = (params) => {
    return request.get(`/api/users?${qs.stringify(params)}`);
};

export const getUserDetail = (id) => {
    return request.get(`/api/users/${id}`);
};

export const userDelete = (id) => {
    return request.delete(`/api/users/${id}`);
};

export const userAdd = (params) => {
    return request.post("/api/users", params);
};

export const userUpdate = (id, params) => {
    return request.put(`/api/users/${id}`, params);
};
