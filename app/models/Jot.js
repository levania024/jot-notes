import { generateId } from "../utils/GenerateId.js"

export class Jot {

    constructor(data) {
        this.id = generateId()
        this.name = data.name
        this.body = data.body || ''
        this.color = data.color
        this.lastAccessedAt = data.lastAccessedAt == undefined ? new Date() : new Date(data.lastAccessedAt)
        this.createAt = data.createAt == undefined ? new Date() : new Date(data.createAt)
    }

    // NOTE the list of note with the color and the body of the text
    get JotHTMLTemplate() {
        return `
        <div onclick="app.JotsController.setActiveJotFileTemp('${this.id}')" class="m-3 selectable text-light" 
        role="button" style="border-left: 5px solid ${this.color}; padding-left: 10px;">
            <div class="d-flex justify-content-between align-items-center">
                <h4 class="mb-0">${this.name}</h4>
                <p class="mb-0">${this.createAtFormulate}</p>
            </div>
            <p class="mb-0 mt-2 text-truncate">${this.body}</p>
        </div>`
    }

    // NOTE the textarea and with the delete and save button. as will with a date of when it was last create and updated.
    get JotFileTemplate() {
        return `<div class="mt-3">
            <div style="height: 5px; background-color: ${this.color};"></div>
            <h2>${this.name}</h2>
            <p>Date Created on: <span>${this.createAtFormulate}</span> </p>
            <p>Last updated: <span>${this.lastAccessedFullDateAndTime}</span></p>
            <div class="d-flex justify-content-end">
              <img src="path/to/your/delete-icon.png" onclick="app.JotsController.deleteJot('${this.id}')" class="action mx-3" alt="Delete" style="width: 24px; height: 24px;">
              <button onclick="app.JotsController.updateJot('${this.id}')" class="btn btn-success"> <i class="mdi mdi-arrow-down-bold-box"></i> Save</button>
            </div>
          </div>

          <div class="d-flex m-3">
            <textarea onblur="app.JotsController.updateJot('${this.id}')" name="body"
              id="body-${this.id}">${this.body}</textarea>
          </div>`
    }

    // NOTE get function of the date 
    get createAtFormulate() {
        return this.createAt.toLocaleDateString()
    }

    // NOTE get function of the date and time
    get lastAccessedFullDateAndTime() {
        return this.lastAccessedAt.toLocaleString()
    }

    // NOTE  get function of the length of the array
    get NoteCount() {
        return this.JotFileTemplate.length;
    }

}




