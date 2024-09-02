import { AppState } from "../AppState.js";
import { Jot } from "../models/Jot.js";
import { loadState, saveState } from "../utils/Store.js";

class JotsService {
    loadJots() {
        const savedJots = loadState('jots', [Jot])
        if (savedJots) {
            AppState.jotNote = savedJots
        }
    }

    createJot(jotData) {
        const newJot = new Jot(jotData)
        AppState.jotNote.push(newJot)
        AppState.activeJotNote = newJot
        AppState.emit('jotNote')
        AppState.emit('activeJotNote')
        this.saveJots()
        return newJot
    }

    setActiveJotFileTemp(jotFormID) {
        const foundJot = AppState.jotNote.find(jotNote => jotNote.id == jotFormID)
        AppState.activeJotNote = foundJot
        AppState.emit('activeJotNote')
    }

    updateJot(jotId, updatedData) {
        const jotIndex = AppState.jotNote.findIndex(jot => jot.id == jotId)
        if (jotIndex !== -1) {
            AppState.jotNote[jotIndex] = new Jot({ ...AppState.jotNote[jotIndex], ...updatedData, updatedAt: new Date() })
            AppState.emit('jotNote')
            if (AppState.activeJotNote && AppState.activeJotNote.id == jotId) {
                AppState.activeJotNote = AppState.jotNote[jotIndex]
                AppState.emit('activeJotNote')
            }
            this.saveJots()
        }
    }

    deleteJot(jotId) {
        AppState.jotNote = AppState.jotNote.filter(jot => jot.id !== jotId)
        AppState.emit('jotNote')
        if (AppState.activeJotNote && AppState.activeJotNote.id == jotId) {
            AppState.emit('activeJotNote')
        }
        this.saveJots()
    }

    saveJots() {
        saveState('jots', AppState.jotNote)
    }
}

export const jotsService = new JotsService()
