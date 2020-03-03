import expressJwt from "express-jwt";
import User from "../models/User";

function jwt() {
    const secret = "tokenlevent";
    return expressJwt({ secret, isRevoked }).unless({
        path: ["/users/authenticate", "/users/authenticated", "/user", "/comment", "/upload"]
    });
}

const isRevoked = async (req, payload, done) => {
    const user = await User.findById(payload.sub);
    if (!user) {
        return done(null, true);
    }
    done();
};

export default jwt;
