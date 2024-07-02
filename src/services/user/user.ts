import { USERS } from "@/constants/apiPaths"
import { api } from "../axiosInstance/axiosInstance"
import { CreateUserBody } from "./types"

export const createUser = async(createUserBody: CreateUserBody) => {

    const response = await api.post(USERS, createUserBody);

    return response.data
}