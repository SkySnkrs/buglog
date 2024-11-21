import { dbContext } from "../db/DbContext"

class NotesService {
    async postNotes(notesData) {
        const notes = await dbContext.Notes.create(notesData)
        await notes.populate('creator')
        return notes
    }

}

export const notesService = new NotesService()