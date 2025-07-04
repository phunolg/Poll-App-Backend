import { Router } from "express";
import { ObjectId } from "mongodb";

import UserController from "../controllers/user.controller.js";
import ValidateMiddleware from "../middleware/validate.middleware.js";

const route = Router();

route.route('/')
    .get(UserController.getAllUsers)
    .post(ValidateMiddleware.validateCreateUser, UserController.createUser);

route.route('/:id')
    .get(ValidateMiddleware.validateId, UserController.getUser)
    .put(ValidateMiddleware.validateId, UserController.updateUser)
    .delete(ValidateMiddleware.validateId, UserController.deleteUser);

export default route;