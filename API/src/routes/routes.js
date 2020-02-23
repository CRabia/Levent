import { Router } from "express";
import UserController from "../controllers/users.controller";
import AuthController from "../controllers/auth.controller";
import CommentController from "../controllers/comment.controller";
import CategoryController from "../controllers/category.controller";
import FriendController from "../controllers/friend.controller";
import EventController from "../controllers/event.controller";

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
router.get("/users/:userPerPage/:page", UserController.listPerPage);
router.get("/user/:id", UserController.details);
router.delete("/users/:id", UserController.delete);
router.put("/users/:id", UserController.update);
router.get("/search/user", UserController.search);

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
            .withMessage("Merci de saisir votre nom"),
        check("content")
            .not()
            .isEmpty()
            .withMessage("Merci de saisir votre message")
    ],
    CommentController.create
);
router.get("/comments", CommentController.list);
router.get("/comments/:id", CommentController.details);
router.get("/comments/:commentPerPage/:page", CommentController.listPerPage);
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

//Events routes
router.post(
    "/event",
    [
        check("title")
            .not()
            .isEmpty()
            .withMessage("Merci de saisir correctement le titre"),
        check("description")
            .not()
            .isEmpty()
            .withMessage("Merci de saisir correctement la description"),
        check("website")
            .not()
            .isEmpty()
            .withMessage("Merci de saisir correctement l'url du site"),
        check("price")
            .not()
            .isEmpty()
            .isNumeric()
            .withMessage("Merci de saisir correctement le prix"),
        check("addresses")
            .not()
            .isEmpty()
            .withMessage("Merci de saisir correctement l'adresse")
    ],
    EventController.create
);
router.get("/events", EventController.list);
router.get("/events/:id", EventController.details);
router.delete("/events/:id", EventController.delete);
router.put("/events/:id", EventController.update);

export default router;
