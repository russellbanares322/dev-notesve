import { DevNotes } from '@/services/devnote/types'
import { create } from 'zustand'

type DisplayDevNotesStore = {
    selectedDevNotes: DevNotes[] | [],
    onSelectDevNote: (devNote: DevNotes) => void,
    onRemoveDevNote: (devNoteId: number) => void,
    currentlyViewingDevNote: number | null;
    onViewDevNote: (devNoteId: number) => void;
}

export const useDisplayDevNotesStore = create<DisplayDevNotesStore>((set, get) => ({
    currentlyViewingDevNote: null,
    onViewDevNote: (devNoteId) => set(() => ({
        currentlyViewingDevNote: devNoteId
    })),
    selectedDevNotes: [],
    onSelectDevNote: (devNote)  => {
        const prevSelectedDevNotesValue = get().selectedDevNotes
        const isDevNoteSaved = prevSelectedDevNotesValue.some((note) => note.devnote_id === devNote.devnote_id);
        
        if(!isDevNoteSaved){
            set({
                selectedDevNotes: [...prevSelectedDevNotesValue, devNote],
                currentlyViewingDevNote: devNote.devnote_id
            })
        }
        set({
            currentlyViewingDevNote: devNote.devnote_id
        })
    },
    onRemoveDevNote: (devNoteId) => set((state) => ({
        selectedDevNotes: state.selectedDevNotes.filter((devNote) => devNote.devnote_id !== devNoteId)
    })),
}))