import { DEV_NOTES } from "@/constants/apiPaths"
import { api } from "../axiosInstance/axiosInstance";
import { CreateDevNoteParams, CreateDevNoteResponse, DevNotes, DevNotesCategories, GetDevNotesByAuthorIdParams, GetDevNotesByAuthorIdResponse, UpdateDevNoteParams, UpdateDevNoteResponse } from "./types";

export const getDevNotesByAuthorId = async (params: GetDevNotesByAuthorIdParams): Promise<GetDevNotesByAuthorIdResponse> => {
    const config = {
        params: {
            author_id: params.author_id,
            sort_direction: params.sort_direction,
            category: params.category,
            page_size: params.page_size,
            page_number: params.page_number
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

export const updateDevNote = async (postParams: UpdateDevNoteParams): Promise<UpdateDevNoteResponse> => {
    const body = {
        id: postParams.id,
        title: postParams.title,
        category: postParams.category,
        content: postParams.content
    };

    const response = await api.put(`${DEV_NOTES}/${postParams.id}`, body);

    return response.data;
}



export const deleteDevNote = async (devnote_id: number) => {
    const response = await api.delete(`${DEV_NOTES}/${devnote_id}`);

    return response.data
}