import { ApiResponse, TPaginationData } from "@/types/types"

export type DevNotes = {
    devnote_id : number
    title: string
    category: string
    content: string
    author_id: string
    date_created: string
}

export type SortDirectionValue = "0" | "1"

export type GetDevNotesByAuthorIdParams = {
    author_id: string,
    sort_direction: SortDirectionValue
    category: string;
    page_size: number;
    page_number: number
}

export type CreateDevNoteParams = {
    title: string,
    category: string,
    content: string,
    author_id: string
}

export type UpdateDevNoteParams = Omit<CreateDevNoteParams, "author_id"> & {
    id: number
}

export type GetDevNotesByAuthorIdResponse = ApiResponse<{
    items: DevNotes[]
} & TPaginationData>

export type CreateDevNoteResponse = ApiResponse<CreateDevNoteParams>
export type UpdateDevNoteResponse = ApiResponse<CreateDevNoteParams>
export type DevNotesCategories = string[]