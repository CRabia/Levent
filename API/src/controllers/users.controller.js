import User from "../models/User";
const { validationResult } = require("express-validator/check");

export default class UserController {
    /**
     * Creates a User in a database
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
            let newUser = await User.create({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: req.body.password,
                created_on: new Date()
            });

            body = {
                newUser,
                message: "Users of Levent was created"
            };
        } catch (error) {
            status = 500;
            body = {
                errors: [{ param: "email", msg: "Cet email a déjà été utilisé." }]
            };
        }

        return res.status(status).json(body);
    }

    /**
     * Return the list of all user
     * @param {Request} req
     * @param {Response} res
     */

    static async list(req, res) {
        let status = 200;
        let body = {};

        try {
            let users = await User.find().select("-email -__v");
            body = { users, message: "Users list" };
        } catch (error) {
            status = 500;
            body = { message: error.message };
        }

        return res.status(status).json(body);
    }

    /**
     * Find user in database and returns his information
     * @param {Request} req
     * @param {Response} res
     */
    static async details(req, res) {
        let status = 200;
        let body = {};

        try {
            let id = req.params.id;
            let user = await User.findById(id);
            user ? (body = { user, message: "User was found" }) : (body = { user, message: "User was not found" });
        } catch (error) {
            status = 500;
            body = { message: error.message };
        }

        return res.status(status).json(body);
    }

    /**
     * Find user in database and deletes he
     * @param {Request} req
     * @param {Response} res
     */
    static async delete(req, res) {
        let status = 200;
        let body = {};

        try {
            await User.remove({ _id: req.params.id });
            body = { message: "User was deleted" };
        } catch (error) {
            status = 500;
            body = { message: error.message };
        }

        return res.status(status).json(body);
    }

    /**
     * Find user in database and updates he
     * @param {Request} req
     * @param {Response} res
     */
    static async update(req, res) {
        let status = 200;
        let body = {};

        try {
            let user = await User.update(
                { _id: req.params.id },
                {
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    email: req.body.email
                },
                { new: true }
            );

            body = { user, message: "User was updated" };
        } catch (error) {
            status = 500;
            body = { message: error.message };
        }

        return res.status(status).json(body);
    }
}
