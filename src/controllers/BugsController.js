import { Auth0Provider } from "@bcwdev/auth0provider";
import { bugsService } from "../services/BugsService";
import BaseController from "../utils/BaseController";

export class BugsController extends BaseController {
    constructor() {
        super('api/bugs')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.postBugs)
            .get('', this.getBugs)
            .get('/:bugId', this.getBugsById)
            .put('/:bugId', this.putBugsById)
            .delete('/:bugId', this.deleteBugsById)
            .get('/:bugId/notes', this.getNotesByBugId)
            .get('/:bugId/trackedbugs', this.getTrackedBugsById)
    }

    async postBugs(request, response, next) {
        try {
            const bugsData = request.body
            const userInfo = request.userInfo
            bugsData.creatorId = userInfo.id

            const bugs = await bugsService.postBugs(bugsData)

            response.send(bugs)

        } catch (error) {
            next(error)
        }
    }
    async getBugs(request, response, next) {
        try {
            const bugs = await bugsService.getBugs()
            response.send(bugs)
        } catch (error) {
            next(error)
        }
    }

    async getBugsById(request, response, next) {
        try {
            const bugId = request.params.bugId
            const bugs = await bugsService.getBugsById(bugId)
            response.send(bugs)
        } catch (error) {
            next(error)
        }
    }

    async putBugsById(request, response, next) {
        try {
            const bugData = request.body
            const creatorId = request.userInfo.id
            const bugId = request.params.bugId

            const bugs = await bugsService.putBugsById(bugData, creatorId, bugId)
            response.send(bugs)
        } catch (error) {
            next(error)
        }
    }

    async deleteBugsById(request, response, next) {
        try {
            const bugId = request.params.bugId
            const creatorId = request.userInfo.id

            const bugs = await bugsService.deleteBugsById(bugId, creatorId)
            response.send(bugs)
        } catch (error) {
            next(error)
        }
    }

    async getNotesByBugId(request, response, next) {
        try {
            const bugId = request.params.bugId
            const notes = await bugsService.getNotesByBugId(bugId)
            response.send(notes)
        } catch (error) {
            next(error)
        }
    }

    async getTrackedBugsById(request, response, next) {
        try {
            const bugId = request.params.bugId
            const trackedBugs = await bugsService.getTrackedBugsById(bugId)
            response.send(trackedBugs)
        } catch (error) {
            next(error)
        }
    }



}