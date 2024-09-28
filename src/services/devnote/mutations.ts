import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createDevNote, deleteDevNote, updateDevNote } from "./devnote"
import { CreateDevNoteParams, UpdateDevNoteParams } from "./types"
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

export const useUpdateDevNote = (onClearFormInputs: () => void) => {
    const { showToast } = useDisplayToast();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (postParams: UpdateDevNoteParams) => updateDevNote(postParams),
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