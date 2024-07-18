import { useQuery } from "@tanstack/react-query"
import { getDevNoteCategories, getDevNotesByAuthorId } from "./devnote"

export const useGetDevNotesByAuthorId = (author_id: string) => {
    return useQuery({
        queryFn: () => getDevNotesByAuthorId(author_id),
        queryKey: ["Devnotes", author_id]
    })
}

// export const useGetDevNote = () => {
// }


export const useGetDevNoteCategories = (author_id: string) => {
    return useQuery({
        queryFn: () => getDevNoteCategories(author_id),
        queryKey: ["Devnotes"],
        select: (data) => {
            const filteredData = [...new Set(data.map((category: string) => category.toUpperCase()))]

            return filteredData as string[]
        }
    })
}

