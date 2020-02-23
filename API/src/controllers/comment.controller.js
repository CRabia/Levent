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
                createdAt: new Date(),
                publicationStatus: false
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
                    content: req.body.content,
                    publicationStatus: req.body.publication
                },
                { new: true }
            );
            console.log(req.body.publication);

            body = { comment, message: "Comment was updated" };
        } catch (error) {
            status = 500;
            body = { message: error.message };
        }

        return res.status(status).json(body);
    }

    /**
     * Return the list of comment per page
     * @param {Request} req
     * @param {Response} res
     */

    static async listPerPage(req, res) {
        let status = 200;
        let body = {};

        try {
            let commentPerPage = parseInt(req.params.commentPerPage, 10);
            let page = parseInt(req.params.page, 10);
            let comments = await Comment.find()
                .select("-__v")
                .limit(commentPerPage)
                .skip(commentPerPage * page);
            let countComment = await Comment.find();
            body = { comments, length: countComment.length, message: "Comment list per page" };
        } catch (error) {
            status = 500;
            body = { message: error.message };
        }

        return res.status(status).json(body);
    }
}
