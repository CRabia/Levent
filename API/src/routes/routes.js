import { Router } from "express";
import UserController from "../controllers/users.controller";
import AuthController from "../controllers/auth.controller";
import CommentController from "../controllers/comment.controller";
import CategoryController from "../controllers/category.controller";
import FriendController from "../controllers/friend.controller";

const router = Router();
const { check } = require("express-validator/check");

//Auth routes
router.post("/users/authenticate", AuthController.authenticate);
router.post("/users/authenticated", AuthController.isAuthenticated);

// Users routes
router.post(
    "/user",
    [
        check("email")
            .isEmail()
            .withMessage("L'email est incorrect"),
        check("password")
            .isLength({ min: 5 })
            .withMessage("Le mot de passe est trop court (min 5*)"),
        check("firstname")
            .not()
            .isEmpty()
            .withMessage("Merci de saisir votre prénom"),
        check("lastname")
            .not()
            .isEmpty()
            .withMessage("Merci de saisir votre nom")
    ],
    UserController.create
);

router.get("/users", UserController.list);
router.get("/users/:id", UserController.details);
router.delete("/users/:id", UserController.delete);
router.put("/users/:id", UserController.update);

//Comments routes
router.post(
    "/comment",
    [
        check("email")
            .isEmail()
            .withMessage("L'email est incorrect"),
        check("firstname")
            .not()
            .isEmpty()
            .withMessage("Merci de saisir votre prénom"),
        check("lastname")
            .not()
            .isEmpty()
            .withMessage("Merci de saisir votre nom")
    ],
    CommentController.create
);
router.get("/comments", CommentController.list);
router.get("/comments/:id", CommentController.details);
router.delete("/comments/:id", CommentController.delete);
router.put("/comments/:id", CommentController.update);

//Categories routes
router.post("/category", CategoryController.create);
router.get("/categories", CategoryController.list);
router.get("/categories/:id", CategoryController.details);
router.delete("/categories/:id", CategoryController.delete);
router.put("/categories/:id", CategoryController.update);

//Friends routes
router.post("/friend", FriendController.create);
router.get("/friends/:id", FriendController.list);

export default router;
