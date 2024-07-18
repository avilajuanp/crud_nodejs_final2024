import { Router } from "express";
import { UserController } from "../controllers/UserController";
import Auth from "../utils/auth";

const userRoutes = Router()
const userController = new UserController()

userRoutes.get("/users", userController.handleListUsers);

userRoutes.get("/users/add", (request, response) => {
  response.render("users/add");
});
userRoutes.post("/users/add-user", userController.handleCreateUser);

userRoutes.get("/users/search", Auth.isLoggedIn, userController.handleSearchUser);

userRoutes.get("/users/edit", Auth.isLoggedIn, userController.handleGetUserData);
userRoutes.post("/users/edit-user", userController.handleUpdateUser);

userRoutes.post("/users/delete-user", userController.handleDeleteUser);

export { userRoutes }
