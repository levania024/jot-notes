import { AppState } from "../AppState.js";
import { jotsService } from "../services/JotsService.js";
import { getFormData } from "../utils/FormHandler.js";
import { setHTML } from "../utils/Writer.js";
import { Pop } from "../utils/Pop.js";

export class JotsController {
    // NOTE application that will load to the page.
    constructor() {
        console.log('load jot of note');
        AppState.on('jotNote', this.drawJotNote);
        AppState.on('jotNote', this.noteCount);
        AppState.on('activeJotNote', this.drawJotFileTemplate);

        jotsService.loadJots()
        this.noteCount()
    }

    // NOTE function that calls the array of object and display it at the page.
    drawJotNote() {
        const Jot = AppState.jotNote
        console.log('draw note to page', Jot);
        let jotHTML = ''
        Jot.forEach(Jot => jotHTML += Jot.JotHTMLTemplate)
        setHTML('jot-note', jotHTML)
    }

    // NOTE function with a if statement that will display the active note or display the default image and text.
    drawJotFileTemplate() {
        const Jot = AppState.activeJotNote
        if (Jot) {
            console.log(Jot)
            setHTML('Jot-created-Note', `
                <div class="mt-3" style="border-left: 5px solid ${Jot.color}; padding-left: 10px;">
                    <h2>${Jot.name}</h2>
                    <p>Date Created on: <span>${new Date(Jot.lastAccessedDate).toLocaleDateString()}</span></p>
                    <p>Last updated: <span>${new Date(Jot.lastAccessedFullDateAndTime).toLocaleString()}</span></p>
                    <div class="d-flex justify-content-end mb-3">
                        <button class="btn btn-danger mx-3" onclick="app.JotsController.deleteJot('${Jot.id}')"><i class="mdi mdi-delete"></i> Delete</button>
                        <button class="btn btn-success" onclick="app.JotsController.updateJot('${Jot.id}')"><i class="mdi mdi-arrow-down-bold-box"></i> Save</button>
                    </div>
                </div>
                <div class="d-flex">
                    <textarea name="body" id="body-${Jot.id}" class="form-control">${Jot.body}</textarea>
                </div>
            `)
        } else {
            setHTML('Jot-created-Note', this.DefaultTemplate())
        }
    }

    // NOTE default template as a function that will be used when the condition is not met.
    DefaultTemplate() {
        return `<p>No note selected. Please choose a note or create a new one.</p>`
    }


    setActiveJotFileTemp(jotFileID) {
        console.log(`load note to the page ${jotFileID}`);
        jotsService.setActiveJotFileTemp(jotFileID)
    }

    updateJot(jotId) {
        const textareaElm = document.getElementById(`body-${jotId}`)
        // @ts-ignore
        const updatedBody = textareaElm.value
        jotsService.updateJot(jotId, { body: updatedBody })
        Pop.success('Note updated successfully!')
    }

    createJot() {
        event.preventDefault()
        const form = event.target
        const jotData = getFormData(form)
        console.log('Creating jot', jotData)
        try {
            const newJot = jotsService.createJot(jotData)
            this.setActiveJotFileTemp(newJot.id)
            this.drawJotNote()
            this.noteCount()
        } catch (error) {
            Pop.error(error)
        }
    }

    deleteJot(jotId) {
        const wantToDelete = window.confirm('Are you sure you want to delete this note?')

        if (!wantToDelete) return

        jotsService.deleteJot(jotId)
        this.drawJotNote()
        this.drawJotFileTemplate()
        this.noteCount()
    }

    noteCount() {
        const noteLength = AppState.jotNote.length
        setHTML('note-length', noteLength.toString())
        return noteLength
    }
}