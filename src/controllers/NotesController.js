import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController";
import { notesService } from "../services/NotesService";

export class NotesController extends BaseController {
    constructor() {
        super('api/notes')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.postNotes)
            .delete('/:noteId', this.deleteNotes)

    }

    async postNotes(request, response, next) {
        try {
            const notesData = request.body
            const userInfo = request.userInfo

            notesData.creatorId = userInfo.id

            const notes = await notesService.postNotes(notesData)
            response.send(notes)
        } catch (error) {
            next(error)
        }
    }

    async deleteNotes(request, response, next) {
        try {
            const creatorId = request.userInfo.id
            const noteId = request.params.noteId
            const notes = await notesService.deleteNotes(noteId, creatorId)
            response.send(notes)
        } catch (error) {
            next(error)
        }
    }
} 