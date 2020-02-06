import User from "../models/User";
import jwt from "jsonwebtoken";

export default class AuthController {
    /**
     * Authentificate user
     * @param {Request} req
     * @param {Response} res
     */
    static async authenticate(req, res) {
        let status = 200;
        let body = {};

        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });

            //console.log(user.password === password);

            if (user && user.password === password) {
                const token = jwt.sign(
                    {
                        sub: user._id
                    },
                    "tokenlevent"
                );

                body = {
                    user,
                    token,
                    message: "User was authenticated"
                };
            } else {
                status = 401;
                body = {
                    message: "Erreur d'email ou mot de passe."
                };
            }
        } catch (error) {
            status = 500;
            body = {
                message: "User not authenticated"
            };
        }

        return res.status(status).json(body);
    }
}
