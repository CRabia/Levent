import Category from "../models/Category";

export default class CategoryController {
    /**
     * Creates a category in a database
     * @param {Request} req
     * @param {Response} res
     */
    static async create(req, res) {
        let status = 200;
        let body = {};

        try {
            let newcategory = await Category.create({
                label: req.body.label,
                description: req.body.description
            });

            body = {
                newcategory,
                message: "Category was created"
            };
        } catch (error) {
            status = 500;
            body = { message: error.message };
        }

        return res.status(status).json(body);
    }

    /**
     * Return the list of all category
     * @param {Request} req
     * @param {Response} res
     */

    static async list(req, res) {
        let status = 200;
        let body = {};

        try {
            let categories = await Category.find().select("-__v");
            body = { categories, message: "Category list" };
        } catch (error) {
            status = 500;
            body = { message: error.message };
        }

        return res.status(status).json(body);
    }

    /**
     * Find category in database and returns his information
     * @param {Request} req
     * @param {Response} res
     */
    static async details(req, res) {
        let status = 200;
        let body = {};

        try {
            let id = req.params.id;
            let category = await Category.findById(id);
            body = { category, message: "Category was found" };
        } catch (error) {
            status = 500;
            body = { message: error.message };
        }

        return res.status(status).json(body);
    }

    /**
     * Find category in database and deletes he
     * @param {Request} req
     * @param {Response} res
     */
    static async delete(req, res) {
        let status = 200;
        let body = {};

        try {
            await Category.remove({ _id: req.params.id });
            body = { message: "Category was deleted" };
        } catch (error) {
            status = 500;
            body = { message: error.message };
        }

        return res.status(status).json(body);
    }

    /**
     * Find category in database and updates he
     * @param {Request} req
     * @param {Response} res
     */
    static async update(req, res) {
        let status = 200;
        let body = {};

        try {
            let category = await Category.findOneAndUpdate(
                { _id: req.params.id },
                {
                    label: req.body.label,
                    description: req.body.description
                },
                { new: true }
            );

            body = { category, message: "Category was updated" };
        } catch (error) {
            status = 500;
            body = { message: error.message };
        }

        return res.status(status).json(body);
    }
}
