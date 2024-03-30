import axios from "axios";
import { User } from "../types/types";

export const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL
});
export const fetchUsers = () => {
    return apiClient.get('/users');
}

export const createUser = (data: User) => {
    return apiClient.post('/users', data);
}

export const updateUser = (id: number, data: User) => {
    return apiClient.put(`/users/${id}`, data);
}

export const deleteUser = (id: number) => {
    return apiClient.delete(`/users/${id}`);
}
export const search = async (q: string, location: string) => {
    const response = await apiClient.get(`db/search/?q=${q}&location=${location}`);
    return response
}

export const ranking = async () => {
    const response = await apiClient.get(`db/ranking`);
    return response
}
export const store = async (id: string) => {
    const response = await apiClient.get(`db/store/?id=${id}`)
    return response
}

export const mypage = async (id: number) => {
    const response = await apiClient.get(`db/mypage/${id}`);
    return response
}

export const profile = async (id: number) => {
    const response = await apiClient.get(`db/mypage/profile/${id}`);
    return response
}

export const put_profile = async (id: number, profile: any) => {
    const response = await apiClient.put(`db/mypage/profile/${id}`, profile);
    return response
}

export const getPrefectures = async () => {
    const response = apiClient.get('/db/prefectures');
    return response
}