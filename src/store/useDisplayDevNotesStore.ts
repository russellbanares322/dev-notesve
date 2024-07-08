import { DevNotes } from '@/services/devnote/types'
import { create } from 'zustand'

type DisplayDevNotesStore = {
    selectedDevNotes: DevNotes[] | [],
    onSelectDevNote: (devNote: DevNotes) => void,
    onRemoveDevNote: (devNoteId: string) => void
}

export const useDisplayDevNotesStore = create<DisplayDevNotesStore>((set, get) => ({
    selectedDevNotes: [],
    onSelectDevNote: (devNote)  => {
        const prevSelectedDevNotesValue = get().selectedDevNotes
        const isDevNoteSaved = prevSelectedDevNotesValue.some((note) => note.devnote_id === devNote.devnote_id);
        
        if(!isDevNoteSaved){
            set({
                selectedDevNotes: [...prevSelectedDevNotesValue, devNote]
            })
        }
    },
    onRemoveDevNote: (devNoteId) => set((state) => ({
        selectedDevNotes: state.selectedDevNotes.filter((devNote) => devNote.devnote_id !== devNoteId)
    }))
}))