import { dbContext } from "../db/DbContext"

class TrackedBugsService {
    async postTrackedBugs(bugsData) {
        const trackedBugs = await dbContext.TrackedBugs.create(bugsData)
        await trackedBugs.populate('tracker')
        await trackedBugs.populate('bug')
        return trackedBugs
    }

}

export const trackedBugsService = new TrackedBugsService()