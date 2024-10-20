import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createDevNote, deleteDevNote, updateDevNote } from "./devnote"
import { CreateDevNoteParams, UpdateDevNoteParams } from "./types"
import { useDisplayToast } from "@/hooks"
import { QueryError } from "@/types/types"

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
        onError:(response: QueryError) => {
            const formattedErrorDescription = response?.response?.data?.errorMessage?.replace(/"/g, '')as string
            showToast("error", "Failed to create note", formattedErrorDescription)
        }
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
        onError:(response: QueryError) => {
            showToast("error", "Failed to create note", response?.response?.data?.errorMessage)
        }
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