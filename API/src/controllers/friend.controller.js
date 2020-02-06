import Friend from "../models/Friend";
import User from "../models/User";

export default class FriendController {
  /**
   * Creates a friend in a database
   * @param {Request} req
   * @param {Response} res
   */
  static async create(req, res) {
    let status = 200;
    let body = {};

    try {
      let user = await User.findById(req.body.userId);
      let friend = await User.findById(req.body.friendId);
      if (user && friend) {
        let newFriend = await Friend.create({
          userId: req.body.userId,
          friendId: req.body.friendId,
          status: "not_validate",
          createdAt: new Date()
        });

        body = {
          newFriend,
          message: "Friend was created"
        };
      } else {
        body = {
          message: "Error, friend or user was not find"
        };
      }
    } catch (error) {
      status = 500;
      body = { message: error.message };
    }

    return res.status(status).json(body);
  }

  /**
   * Return friends list of user
   * @param {Request} req
   * @param {Response} res
   */

  static async list(req, res) {
    let status = 200;
    let body = {};

    try {
      let user = await User.findById(req.params.id);
      if (user) {
        let friends = await Friend.find({ userId: req.params.id });
        body = { friends, message: "Friends list of user" };
      } else {
        body = { message: "User was not find" };
      }
    } catch (error) {
      status = 500;
      body = { message: error.message };
    }

    return res.status(status).json(body);
  }

  /**
   * Find friend in database and deletes he
   * @param {Request} req
   * @param {Response} res
   */
  static async delete(req, res) {
    let status = 200;
    let body = {};

    try {
      await Friend.remove({ _id: req.params.id });
      body = { message: "Friend was deleted" };
    } catch (error) {
      status = 500;
      body = { message: error.message };
    }

    return res.status(status).json(body);
  }
}
