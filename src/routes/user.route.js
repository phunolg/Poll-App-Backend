import { Router } from "express";
import UserController from "../controllers/user.controller.js";

console.log(UserController.getUser);
route.route('/')
    .post(UserController.createUser)
    .get(UserController.getAllUsers);

route.route('/:id')
    .get(UserController.getUser)
    .put(UserController.updateUser)
    .delete(UserController.deleteUser);

export default route;