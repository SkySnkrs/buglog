import { dbContext } from "../db/DbContext"
import { Forbidden } from "../utils/Errors"

class NotesService {
    async postNotes(notesData) {
        const notes = await dbContext.Notes.create(notesData)
        await notes.populate('creator')
        return notes
    }

    async deleteNotes(noteId, creatorId) {
        const noteToChange = await dbContext.Notes.findById(noteId)

        if (creatorId != noteToChange.creatorId) throw new Forbidden("Can't delete that, it doesn't belong to you!")

        await noteToChange.deleteOne()
        return noteToChange
    }

}

export const notesService = new NotesService()