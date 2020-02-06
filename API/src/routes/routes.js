import { Router } from "express";
import UserController from "../controllers/users.controller";
import AuthController from "../controllers/auth.controller";
import CommentController from "../controllers/comment.controller";
import CategoryController from "../controllers/category.controller";
const router = Router();

//Auth routes
router.post("/users/authenticate", AuthController.authenticate);

// Users routes
router.post("/user", UserController.create);
router.get("/users", UserController.list);
router.get("/users/:id", UserController.details);
router.delete("/users/:id", UserController.delete);
router.put("/users/:id", UserController.update);

//Comments routes
router.post("/comment", CommentController.create);
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

export default router;
