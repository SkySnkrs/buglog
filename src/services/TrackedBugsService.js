import { dbContext } from "../db/DbContext"
import { Forbidden } from "../utils/Errors"

class TrackedBugsService {

    async postTrackedBugs(bugsData) {
        const trackedBugs = await dbContext.TrackedBugs.create(bugsData)
        await trackedBugs.populate('tracker')
        await trackedBugs.populate('bug')
        return trackedBugs
    }

    async deleteTrackedBugs(trackedBugId, userInfo) {

        const trackedBugsToDelete = await dbContext.TrackedBugs.findById(trackedBugId)

        if (userInfo != trackedBugsToDelete.accountId) throw new Forbidden("Can't delete that, it doesn't belong to you!")
        await trackedBugsToDelete.deleteOne()
        return trackedBugsToDelete

    }

}

export const trackedBugsService = new TrackedBugsService()