import { DevNotes } from '@/services/devnote/types'
import { create } from 'zustand'

type DisplayDevNotesStore = {
    selectedDevNotes: DevNotes[] | [],
    onSelectDevNote: (devNote: DevNotes) => void,
    onRemoveDevNote: (devNoteId: string) => void
}

export const useDisplayDevNotesStore = create<DisplayDevNotesStore>((set) => ({
    selectedDevNotes: [],
    onSelectDevNote: (devNote) => set((state) => ({
        selectedDevNotes: [...state.selectedDevNotes, devNote]
    })),
    onRemoveDevNote: (devNoteId) => set((state) => ({
        selectedDevNotes: state.selectedDevNotes.filter((devNote) => devNote.devnote_id !== devNoteId)
    }))
}))