import axios from "axios";

export const fetchCategories = userId => {
    return axios.get(`/api/categories/user/${userId}`);
};

export const fetchCategory = categoryId => {
    return axios.get(`/api/categories/${categoryId}`);
};

export const createCategory = category => {
    return axios.post('/api/categories', category);
};

export const updateCategory = category => {
    return axios.patch(`/api/categories/${category._id}`, category);
};

export const deleteCategory = categoryId => {
    return axios.delete(`/api/categories/${categoryId}`);
};