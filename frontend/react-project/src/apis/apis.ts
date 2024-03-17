import axios from "axios";
import { User } from "../types/types";


const API_BASE_URL = "http://localhost:8080/db/";

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
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
    const response = await axios.get(API_BASE_URL + `search/?q=${q}&location=${location}`);
    return response
}

export const ranking = async () => {
    const response = await axios.get(API_BASE_URL + `ranking`);
    return response
}
export const store = async (id: string) => {
    const response = await axios.get(API_BASE_URL + `store/?id=${id}`)
    return response
}

export const mypage = async (id: number) => {
    const response = await axios.get(API_BASE_URL + `mypage/${id}`);
    return response
}

export const profile = async (id: number) => {
    const response = await axios.get(API_BASE_URL + `mypage/profile/${id}`);
    return response
}

export const put_profile = async (id: number, profile: any) => {
    const response = await axios.put(API_BASE_URL + `mypage/profile/${id}`, profile);
    return response
}
