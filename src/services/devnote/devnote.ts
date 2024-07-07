import { DEV_NOTES } from "@/constants/apiPaths"
import { api } from "../axiosInstance/axiosInstance";
import { DevNotes, DevNotesCategories } from "./types";

export const getDevNotesByAuthorId =  async (author_id: string): Promise<DevNotes[]> => {
    const config = {
        params: {
            author_id: author_id
        }
    }

    const response = await api.get(`${DEV_NOTES}`, config)

    return response.data
}

export const getDevNoteCategories = async (author_id: string): Promise<DevNotesCategories> => {
    const config = {
        params: {
            author_id: author_id
        }
    }

    const response = await api.get(`${DEV_NOTES}/categories`, config);

    return response.data
}