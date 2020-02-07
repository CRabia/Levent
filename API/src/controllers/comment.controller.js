import Comment from "../models/Comment";

export default class CommentController {
    /**
     * Creates a Comment in a database
     * @param {Request} req
     * @param {Response} res
     */
    static async create(req, res) {
        let status = 200;
        let body = {};

        try {
            let newComment = await Comment.create({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                content: req.body.content,
                createdAt: new Date()
            });
            body = {
                newComment,
                message: "Comment was created"
            };
        } catch (error) {
            status = 500;
            body = { message: error.message };
        }

        return res.status(status).json(body);
    }

    /**
     * Return the list of all comment
     * @param {Request} req
     * @param {Response} res
     */

    static async list(req, res) {
        let status = 200;
        let body = {};

        try {
            let comments = await Comment.find().select("-__v");
            body = { comments, message: "Comments list" };
        } catch (error) {
            status = 500;
            body = { message: error.message };
        }

        return res.status(status).json(body);
    }

    /**
     * Find comment in database and returns his information
     * @param {Request} req
     * @param {Response} res
     */
    static async details(req, res) {
        let status = 200;
        let body = {};

        try {
            let id = req.params.id;
            let comment = await Comment.findById(id);
            body = { comment, message: "Comment was found" };
        } catch (error) {
            status = 500;
            body = { message: error.message };
        }

        return res.status(status).json(body);
    }

    /**
     * Find comment in database and deletes he
     * @param {Request} req
     * @param {Response} res
     */
    static async delete(req, res) {
        let status = 200;
        let body = {};

        try {
            await Comment.remove({ _id: req.params.id });
            body = { message: "Comment was deleted" };
        } catch (error) {
            status = 500;
            body = { message: error.message };
        }

        return res.status(status).json(body);
    }

    /**
     * Find comment in database and updates he
     * @param {Request} req
     * @param {Response} res
     */
    static async update(req, res) {
        let status = 200;
        let body = {};

        try {
            let comment = await Comment.findOneAndUpdate(
                { _id: req.params.id },
                {
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    email: req.body.email,
                    content: req.body.content
                },
                { new: true }
            );

            body = { comment, message: "Comment was updated" };
        } catch (error) {
            status = 500;
            body = { message: error.message };
        }

        return res.status(status).json(body);
    }
}
