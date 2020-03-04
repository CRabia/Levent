import Event from "../models/Event";
const { validationResult } = require("express-validator/check");

export default class EventController {
    /**
     * Creates an event in a database
     * @param {Request} req
     * @param {Response} res
     */
    static async create(req, res) {
        let status = 200;
        let body = {};
        let errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        try {
            let newEvent = await Event.create({
                title: req.body.title,
                created_on: new Date(),
                publicationStatus: false,
                userId: req.body.userId,
                description: req.body.description,
                addresses: req.body.addresses,
                date: new Date(),
                price: req.body.price,
                website: req.body.website,
                typeOf: req.body.typeOf,
                categoryId: req.body.categoryId
            });

            body = {
                newEvent,
                message: "Event of Levent was created"
            };
        } catch (error) {
            status = 500;
            body = { message: error.message };
        }

        return res.status(status).json(body);
    }

    /**
     * Return the list of all event
     * @param {Request} req
     * @param {Response} res
     */

    static async list(req, res) {
        let status = 200;
        let body = {};

        try {
            let events = await Event.find().select("-__v");
            body = { events, message: "Events list" };
        } catch (error) {
            status = 500;
            body = { message: error.message };
        }

        return res.status(status).json(body);
    }

    /**
     * Find event in database and returns his information
     * @param {Request} req
     * @param {Response} res
     */
    static async details(req, res) {
        let status = 200;
        let body = {};

        try {
            let id = req.params.id;
            let event = await Event.findById(id);
            event ? (body = { event, message: "Event was found" }) : (body = { event, message: "Event was not found" });
        } catch (error) {
            status = 500;
            body = { message: error.message };
        }

        return res.status(status).json(body);
    }

    /**
     * Find event in database and deletes he
     * @param {Request} req
     * @param {Response} res
     */
    static async delete(req, res) {
        let status = 200;
        let body = {};

        try {
            await Event.remove({ _id: req.params.id });
            body = { message: "Event was deleted" };
        } catch (error) {
            status = 500;
            body = { message: error.message };
        }
        return res.status(status).json(body);
    }

    /**
     * Find event in database and updates he
     * @param {Request} req
     * @param {Response} res
     */
    static async update(req, res) {
        let status = 200;
        let body = {};

        try {
            let event = await Event.update(
                { _id: req.params.id },
                {
                    description: req.body.description,
                    title: req.body.title,
                    price: req.body.price,
                    website: req.body.website,
                    typeOf: req.body.typeOf,
                    publicationStatus: req.body.publication,
                    created_on: Date.parse(req.body.created_on),
                    date: Date.parse(req.body.date),
                    pathImage: req.body.pathImage,
                    categoryId: req.body.categoryId,
                    addresses: [req.body.addresses]
                },
                { new: true }
            );

            body = { event, message: "Event was updated" };
        } catch (error) {
            status = 500;
            body = { message: error.message };
        }

        return res.status(status).json(body);
    }

    /**
     * Return the list of event per page
     * @param {Request} req
     * @param {Response} res
     */

    static async listPerPage(req, res) {
        let status = 200;
        let body = {};

        try {
            let eventPerPage = parseInt(req.params.eventPerPage, 10);
            let page = parseInt(req.params.page, 10);
            let events = await Event.find()
                .select("-__v")
                .limit(eventPerPage)
                .skip(eventPerPage * page);
            let countEvent = await Event.find();
            body = { events, length: countEvent.length, message: "Event list per page" };
        } catch (error) {
            status = 500;
            body = { message: error.message };
        }

        return res.status(status).json(body);
    }

    /**
     * Return 4 event
     * @param {Request} req
     * @param {Response} res
     */
    static async listEvent(req, res) {
        let status = 200;
        let body = {};
        try {
            let events = await Event.find()
                .select("-__v")
                .limit(4);
            body = { events, message: "Event" };
        } catch (error) {
            status = 500;
            body = { message: error.message };
        }
        return res.status(status).json(body);
    }

    /**
     * Return the list of event published
     * @param {Request} req
     * @param {Response} res
     */

    static async listEventPublished(req, res) {
        let status = 200;
        let body = {};

        try {
            let events = await Event.find({ publicationStatus: true }).select("-__v");
            body = { events, message: "Event list published" };
        } catch (error) {
            status = 500;
            body = { message: error.message };
        }

        return res.status(status).json(body);
    }
}
