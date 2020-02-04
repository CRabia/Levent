import { Router } from "express";
import UserController from "../controllers/users.controller";
const router = Router();

// Users routes
router.post("/user", UserController.create);
router.get("/users", UserController.list);
router.get("/users/:id", UserController.details);
router.delete("/users/:id", UserController.delete);
router.put("/users/:id", UserController.update);

export default router;
