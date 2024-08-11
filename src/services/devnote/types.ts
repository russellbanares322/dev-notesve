import { ApiResponse } from "@/types/types"

export type DevNotes = {
    devnote_id : number
    title: string
    category: string
    content: string
    author_id: string
    date_created: string
}

export type CreateDevNoteParams = {
    title: string,
    category: string,
    content: string,
    author_id: string
}

export type CreateDevNoteResponse = ApiResponse<CreateDevNoteParams>
export type DevNotesCategories = string[]