import { dbContext } from "../db/DbContext"
import { Forbidden } from "../utils/Errors"
import { notesService } from "./NotesService"

class BugsService {


    async postBugs(bugsData) {
        const bugs = await dbContext.Bugs.create(bugsData)
        await bugs.populate('creator')
        return bugs
    }

    async getBugs() {
        const bugs = await dbContext.Bugs.find()
        return bugs
    }

    async getBugsById(bugId) {
        const bugs = await dbContext.Bugs.findById(bugId).populate('creator')
        if (!bugs) throw new Error(`No Bugs By This ID ${bugId}`)

        return bugs
    }

    async putBugsById(bugData, creatorId, bugId) {

        const bugToChange = await dbContext.Bugs.findById(bugId)

        if (!bugToChange) throw new Error(`No bug to update at id: ${bugId}`)
        if (creatorId != bugToChange.creatorId) throw new Forbidden("Can't update that, it doesn't belong to you!")

        bugToChange.description = bugData.description ?? bugToChange.description
        bugToChange.title = bugData.title ?? bugToChange.title
        bugToChange.closed ??= bugData.closed

        await bugToChange.save()

        return bugToChange
    }

    async deleteBugsById(bugId, creatorId) {
        const bugToChange = await dbContext.Bugs.findById(bugId)

        if (creatorId != bugToChange.creatorId) throw new Forbidden("Can't update that, it doesn't belong to you!")
        await bugToChange.deleteOne()
        return bugToChange
    }

    async getNotesByBugId(bugId) {
        const notes = await dbContext.Notes.find({ bugId });
        if (!notes) throw new Error(`No Bugs By This ID ${bugId}`)


        return notes;
    }

}

export const bugsService = new BugsService()