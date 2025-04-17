import { Router } from "express";
import UserController from "../controllers/user.controller.js";

const route = Router();
route.route('/')
    .post(UserController.createUser)
    .get(UserController.getAllUsers);

route.route('/:id')
    .get(UserController.getUser)
    .put(UserController.updateUser)
    .delete(UserController.deleteUser);

export default route;