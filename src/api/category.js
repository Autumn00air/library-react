import request from "@/utils/request";
import qs from "qs";

//请求分类的API   
export const getCategoryList = (params) => {
    return request.get(`/api/categories?${qs.stringify(params)}`);
};

export const categoryAdd = (params) => {
    return request.post("/api/categories", params);
};

export const categoryUpdate = (id, params) => {
    return request.put(`/api/categories/${id}`, params);
};

export const categoryDelete = (id) => {
    return request.delete(`/api/categories/${id}`);
};
