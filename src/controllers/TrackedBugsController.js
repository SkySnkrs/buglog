import { Auth0Provider } from "@bcwdev/auth0provider";
import { trackedBugsService } from "../services/TrackedBugsService";
import BaseController from "../utils/BaseController";

export class TrackedBugsController extends BaseController {
    constructor() {
        super('api/trackedbugs')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.postTrackedBugs)
    }

    async postTrackedBugs(request, response, next) {
        try {
            const bugsData = request.body
            const userInfo = request.userInfo

            bugsData.creatorId = userInfo.id
            const trackedBugs = await trackedBugsService.postTrackedBugs(bugsData)
            response.send(trackedBugs)
        } catch (error) {
            next(error)
        }
    }

}