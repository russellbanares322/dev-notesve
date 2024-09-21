import { useQuery } from "@tanstack/react-query"
import { getDevNote, getDevNoteCategories, getDevNotesByAuthorId } from "./devnote"
import { useUser } from "@clerk/clerk-react"
import { GetDevNotesByAuthorIdParams } from "./types"

export const useGetDevNotesByAuthorId = (params: GetDevNotesByAuthorIdParams) => {
    return useQuery({
        queryFn: () => getDevNotesByAuthorId(params),
        queryKey: ["Devnotes", params],
        select: (data) => {
            return data?.data?.items?.map((note) => ({
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

export const useGetDevNoteCategories = () => {
    const {user} = useUser()
    
    return useQuery({
        queryFn: () => getDevNoteCategories(user?.id as string),
        queryKey: ["Devnotes"],
        select: (data) => {
            const filteredData = [...new Set(data.map((category: string) => category.toUpperCase()))]

            return ["ALL", ...filteredData] as string[]
        }
    })
}

