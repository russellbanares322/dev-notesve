import { useQuery } from "@tanstack/react-query"
import { getDevNoteCategories, getDevNotesByAuthorId } from "./devnote"

export const useGetDevNotesByAuthorId = (author_id: string) => {
    return useQuery({
        queryFn: () => getDevNotesByAuthorId(author_id),
        queryKey: ["Devnotes"]
    })
}

export const useGetDevNoteCategories = (author_id: string) => {
    return useQuery({
        queryFn: () => getDevNoteCategories(author_id),
        queryKey: ["Devnotes"]
    })
}