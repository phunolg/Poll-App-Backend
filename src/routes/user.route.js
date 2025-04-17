import { Router } from "express";
import UserController from "../controllers/user.controller.js";
import ValidateMiddleware from "../middleware/validate.middleware.js";

const route = Router();

route.route('/')
    .post(ValidateMiddleware.validateCreateUser, UserController.createUser)
    .get(UserController.getAllUsers);

route.route('/:id')
    .get(ValidateMiddleware.validateId, UserController.getUser)
    .put(ValidateMiddleware.validateId, UserController.updateUser)
    .delete(ValidateMiddleware.validateId, UserController.deleteUser);

export default route;