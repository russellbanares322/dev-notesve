import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createDevNote, deleteDevNote } from "./devnote"
import { CreateDevNoteParams } from "./types"
import { useDisplayToast } from "@/hooks"

export const useCreateDevNote = (onClearFormInputs: () => void) => {
    const { showToast } = useDisplayToast();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (postParams: CreateDevNoteParams) => createDevNote(postParams),
        onSuccess: (response) => {
            showToast("success","Successfully created note", response?.successMessage)
            onClearFormInputs();
            queryClient.invalidateQueries({ queryKey: ["Devnotes"] })
        },
    })
}

export const useDeleteDevNote = (closeDialog: () => void) => {
    const { showToast } = useDisplayToast();
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (devnote_id: number) => deleteDevNote(devnote_id),
        onSuccess: (response) => {
            showToast("success", response, null);
            queryClient.invalidateQueries({ queryKey: ["Devnotes"] })
            closeDialog()
        }
    })
}