import User from "../models/User";

class UserController {
  /**
   * Creates a User in a database
   * @param {Request} req
   * @param {Response} res
   */
  static async create(req, res) {
    let status = 200;
    let body = {};

    try {
      let newUser = await User.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password
      });

      body = {
        newUser,
        message: "Users of Levent was created"
      };
    } catch (error) {
      status = 500;
      body = { message: error.message };
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
      let users = await User.findById(id);
      let posts = await Post.find({ userId: id });
      body = { users, posts, message: "User was found" };
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
      let user = await User.findById({ _id: req.params.id });
      await user.update({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email
      });

      body = { user, message: "User was updated" };
    } catch (error) {
      status = 500;
      body = { message: error.message };
    }

    return res.status(status).json(body);
  }
}
export default UserController;
