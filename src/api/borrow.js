import request from "@/utils/request";
import qs from "qs";

// Borrow API
export const getBorrowList = (params) => {
    return request.get(`/api/borrows?${qs.stringify(params)}`);
};

export const getBorrowDetail = (id) => {
    return request.get(`/api/borrows/${id}`);
};

export const borrowAdd = (params) => {
    return request.post(`/api/borrows`, params);
};

export const borrowDelete = (id) => {
    return request.delete(`/api/borrows/${id}`);
};
export const borrowUpdate = (id, params) => {
    return request.post(`/api/borrows/${id}`, params);
};

export const borrowBack = (id) => {
    return request.put(`/api/borrows/back/${id}`);
};
