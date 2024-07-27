import { DevNotes } from '@/services/devnote/types'
import { create } from 'zustand'

type DisplayDevNotesStore = {
    selectedDevNotes: DevNotes[] | [],
    onSelectDevNote: (devNote: DevNotes) => void,
    onRemoveDevNote: (devNoteId: number, index: number) => void,
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
    onRemoveDevNote: (devNoteId, index) => {
        const selectedDevNotesValue = get().selectedDevNotes
        const selectedDevNotesLength = selectedDevNotesValue.length 
        const isSelectedDevNotesEmpty = selectedDevNotesLength === 0;

        // For getting the new viewed dev note
        const firstDevNote = index === 0;
        const indexOfNoteThatWillBeRemoved = selectedDevNotesLength === 2 && firstDevNote ? index + 1 : index - 1;
        const newViewingDevNote = selectedDevNotesValue[indexOfNoteThatWillBeRemoved]?.devnote_id;

        // For filtering previously selected devnotes that were being displayed
        const filteredSelectedDevNotes = selectedDevNotesValue.filter((note) => note.devnote_id !== devNoteId)
        set({
            currentlyViewingDevNote: isSelectedDevNotesEmpty ? null : newViewingDevNote,
            selectedDevNotes:  filteredSelectedDevNotes,
        })
    },
}))