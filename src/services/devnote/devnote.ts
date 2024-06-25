import { DEV_NOTES } from "@/constants/apiPaths"
import { api } from "../axiosInstance/axiosInstance";

export const getDevNotesByAuthorId =  async (author_id: string) => {
    const config = {
        params: {
            author_id: author_id
        }
    }
    const response = await api.get(`${DEV_NOTES}`, config);
    return response.data
}