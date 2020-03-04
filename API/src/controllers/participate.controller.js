import Participate from "../models/Participate";

export default class ParticipateController {
    /**
     * Creates a participation in a database
     * @param {Request} req
     * @param {Response} res
     */
    static async create(req, res) {
        let status = 200;
        let body = {};

        try {
            let newParticipation = await Participate.create({
                userId: req.body.userId,
                eventId: req.body.eventId
            });

            body = {
                newParticipation,
                message: "Participation was created"
            };
        } catch (error) {
            status = 500;
        }

        return res.status(status).json(body);
    }

    /**
     * Return the list of participation by User
     * @param {Request} req
     * @param {Response} res
     */

    static async listByUser(req, res) {
        let status = 200;
        let body = {};

        try {
            let id = req.params.userId;
            let participations = await Participate.find({ userId: id }).select("-__v");
            body = { participations, message: "Participations list" };
        } catch (error) {
            status = 500;
            body = { message: error.message };
        }

        return res.status(status).json(body);
    }

    /**
     * Find participation
     * @param {Request} req
     * @param {Response} res
     */

    static async findParticipation(req, res) {
        let status = 200;
        let body = {};

        try {
            let userId = req.params.userId;
            let eventId = req.params.eventId;
            let participation = await Participate.find({ userId: userId, eventId: eventId }).select("-__v");
            body = { participation, message: "Participation" };
        } catch (error) {
            status = 500;
            body = { message: error.message };
        }

        return res.status(status).json(body);
    }

    /**
     * Find participation in database and deletes it
     * @param {Request} req
     * @param {Response} res
     */
    static async delete(req, res) {
        let status = 200;
        let body = {};

        try {
            await Participate.remove({ _id: req.params.id });
            body = { message: "Participation was deleted" };
        } catch (error) {
            status = 500;
            body = { message: error.message };
        }

        return res.status(status).json(body);
    }
}
