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
                    message: "Votre email ou votre mot de passe est incorrect."
                };
            }
        } catch (error) {
            status = 500;
            body = {
                message: "User is not authenticated"
            };
        }

        return res.status(status).json(body);
    }

    /**
     * Know if user is authentificated
     * @param {Request} req
     * @param {Response} res
     */
    static async isAuthenticated(req, res) {
        try {
            var authorization = req.headers.authorization.split(" ")[1],
                decoded;
            decoded = jwt.verify(authorization, "tokenlevent");
        } catch (e) {
            return res
                .status(401)
                .send({ user: null, msg: "User is not authenticated" });
        }
        const user = await User.findById(decoded.sub).select(
            "-email -__v -password -lastname"
        );
        return res.status(200).json({
            user: user,
            msg: "User is authenticated"
        });
    }
}
