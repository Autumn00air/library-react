import request from "@/utils/request";
import qs from "qs";
//qs 是一个 JavaScript 库，用于解析和字符串化查询字符串。它在处理嵌套对象和数组时，提供了一些额外的功能
//从xhr到fetch，再到axios，前端的请求方式在不断的演进
//下面是对图书的增删改查的请求，其中request是一独立的axios实例
export const getBookList = (params) => {
    //qs.stringify(params)将对象序列化成URL的形式，以&进行拼接
    return request.get(`/api/books?${qs.stringify(params)}`);
};

export const bookUpdate = (id, params) => {
    return request.put(`/api/books/${id}`, params);
};

export const bookAdd = (params) => {
    return request.post("/api/books", params);
};

export const getBookDetail = (id) => {
    return request.get(`/api/books/${id}`);
};

export const bookDelete = (id) => {
    return request.delete(`/api/books/${id}`);
};
