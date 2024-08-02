import { useMutation } from "@tanstack/react-query"
import { createDevNote } from "./devnote"
import { CreateDevNoteParams } from "./types"
import { useToast } from "@/components/ui/use-toast"

export const useCreateDevNote = () => {
    const {toast} = useToast();

    return useMutation({
        mutationFn: (postParams: CreateDevNoteParams) => createDevNote(postParams),
        onSuccess: (response) => {
            toast({
                title: "Success",
                description: response
            })
        }
    })
}