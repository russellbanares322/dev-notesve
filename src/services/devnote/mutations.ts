import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createDevNote } from "./devnote"
import { CreateDevNoteParams } from "./types"
import { useToast } from "@/components/ui/use-toast"

export const useCreateDevNote = (onClearFormInputs: () => void) => {
    const { toast } = useToast();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (postParams: CreateDevNoteParams) => createDevNote(postParams),
        onSuccess: (response) => {
            toast({
                description: response?.successMessage
            })
            onClearFormInputs();
            queryClient.invalidateQueries({ queryKey: ["Devnotes"] })
        }
    })
}