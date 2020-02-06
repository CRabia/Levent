import jsonwebtoken from "jsonwebtoken";
import User from "../models/User";
export default class Auth {
    static auth(roles) {
        return async (req, res, next) => {
            try {
                const token = req.headers.authorization.replace(/Bearer /g, "");
                const decryptToken = jsonwebtoken.decode(token, "tokenlevent");
                const user = await User.findById(decryptToken.sub);

                if (user && user.user_role == 10) {
                    next();
                } else if (user && roles.includes(user.user_role)) {
                    next();
                } else {
                    res.status(401).json({ message: "Unauthorized" });
                }
            } catch (error) {
                res.status(403).json({ message: "Error" });
            }
        };
    }
}
