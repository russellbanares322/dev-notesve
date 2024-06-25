import { useQuery } from "@tanstack/react-query"
import { getDevNotesByAuthorId } from "./devnote"

export const useGetDevNotesByAuthorId = (author_id: string) => {
    return useQuery({
        queryFn: () => getDevNotesByAuthorId(author_id),
        queryKey: ["Devnotes"]
    })
}