import { useQuery } from "@tanstack/react-query"
import { getDevNote, getDevNoteCategories, getDevNotesByAuthorId } from "./devnote"

export const useGetDevNotesByAuthorId = (author_id: string) => {
    return useQuery({
        queryFn: () => getDevNotesByAuthorId(author_id),
        queryKey: ["Devnotes", author_id],
        select: (data) => {
            return data.map((note) => ({
                ...note,
                category: note.category.toUpperCase()
            }))
        }
    })
}

export const useGetDevNote = (devnote_id: string) => {
    return useQuery({
        queryFn: () => getDevNote(devnote_id),
        queryKey: ["Devnotes", devnote_id]
    })
}


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

