import { Request, Response } from "express";
import { UserService } from "../services/UserService"
import { Password } from "../utils/Password";

class UserController {
  private userService: UserService;
  constructor() {
    this.userService = new UserService();
    this.handleCreateUser = this.handleCreateUser.bind(this);
    this.handleDeleteUser = this.handleDeleteUser.bind(this);
    this.handleGetUserData = this.handleGetUserData.bind(this);
    this.handleListUsers = this.handleListUsers.bind(this);
    this.handleSearchUser = this.handleSearchUser.bind(this);
    this.handleUpdateUser = this.handleUpdateUser.bind(this);
  }

  async handleCreateUser(request: Request, response: Response) {
    const { name, email, telefono, provincia, ciudad, username, password } = request.body;

    // const createUserService = new UserService();

    try {
      await this.userService.createUser({
        name,
        email,
        telefono,
        provincia,
        ciudad,
        username,
        password: await Password.encryptPassword(password)
      }).then(() => {
        request.flash("success", "Usuario creado exitosamente")
        response.redirect("/users")
      });

    } catch (err) {
      request.flash("error", "Error al crear el usuario", err.toString());
      console.log(request.body)
      response.redirect("/users");

    }

  }
  async handleDeleteUser(request: Request, response: Response) {
    const { id } = request.body;

    // const deleteUserService = new UserService();

    try {
      await this.userService.deleteUser(id).then(() => {
        request.flash("success", "Usuario eliminado exitosamente")
        response.redirect("/users")
      });

    } catch (err) {
      request.flash("error", "Error al eliminar el usuario", err.toString());
      response.redirect("/users");

    }
  }
  async handleGetUserData(request: Request, response: Response) {
    let { id } = request.query;
    id = id.toString();

    // const getUserDataService = new UserService();

    const user = await this.userService.getUserData(id);

    return response.render("users/edit", {
      user: user
    });
  }
  async handleListUsers(request: Request, response: Response) {
    // const listUsersService = new UserService();

    const users = await this.userService.listUsers();

    return response.render("users/list", {
      users: users
    });
  }
  async handleSearchUser(request: Request, response: Response) {
    let { search } = request.query;
    search = search.toString();

    // const searchUserService = new UserService();

    try {
      const users = await this.userService.searchUser(search);
      response.render("users/search", {
        users: users,
        search: search
      });
    } catch (err) {
      request.flash("error", "Error al crear el usuario", err.toString());
      response.redirect("/users");

    }
  }
  async handleUpdateUser(request: Request, response: Response) {
    const { id, name, email, telefono, provincia, ciudad, username, password } = request.body;

    // const updateUserService = new UserService();

    try {
      await this.userService.updateUser({
        id,
        name,
        email,
        telefono,
        provincia,
        ciudad,
        username,
        password: await Password.encryptPassword(password)
      }).then(() => {
        request.flash("success", "Usuario actualizado exitosamente")
        response.redirect("/users")

      });
    } catch (err) {
      request.flash("error", "Error al crear el usuario", err.toString());
      response.redirect("/users");
    }

  }
}
export { UserController };