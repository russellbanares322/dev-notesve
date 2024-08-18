import { DEV_NOTES } from "@/constants/apiPaths"
import { api } from "../axiosInstance/axiosInstance";
import { CreateDevNoteParams, CreateDevNoteResponse, DevNotes, DevNotesCategories } from "./types";

export const getDevNotesByAuthorId = async (author_id: string): Promise<DevNotes[]> => {
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

export const getDevNote = async  (devnote_id: string): Promise<DevNotes> => {
    const response = await api.get(`${DEV_NOTES}/${devnote_id}`);

    return response.data
}

export const createDevNote = async (postParams: CreateDevNoteParams): Promise<CreateDevNoteResponse> => {
    const body = postParams;

    const response = await api.post(DEV_NOTES, body);

    return response.data;
}

export const deleteDevNote = async (devnote_id: string) => {
    const response = await api.delete(`${DEV_NOTES}/${devnote_id}`);

    return response.data
}