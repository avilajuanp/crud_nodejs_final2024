import { getCustomRepository } from "typeorm";
import { User } from "../entities/User";
import { UsersRepository } from "../repositories/UsersRepository"


interface IUser {
  id?: string
  name: string;
  email: string;
  telefono: string;
  provincia: string;
  ciudad: string;
  username: string;
  password: string;
}


class UserService {

  async createUser({ name, email, telefono, provincia, ciudad, username, password }: IUser) {
    if (!name || !email || !telefono || !provincia || !ciudad || !username || !password) {
      throw new Error("Por favor rellene todos los campos.");
    }

    const usersRepository = getCustomRepository(UsersRepository);

    const usernameAlreadyExists = await usersRepository.findOne({ username });

    if (usernameAlreadyExists) {
      throw new Error("El nombre de usuario ingresado ya existe");
    }

    const emailAlreadyExists = await usersRepository.findOne({ email });

    if (emailAlreadyExists) {
      throw new Error("El mail de usuario ingresado ya existe");
    }

    const user = usersRepository.create({ name, email, telefono, provincia, ciudad, username, password });
    console.log(user)

    await usersRepository.save(user);

    return user;

  }


  async getDataByUsername(username: string) {
    const usersRepository = getCustomRepository(UsersRepository)
    const user = await usersRepository.find({ where: { username: username } })
    return user
  }

  async deleteUser(id: string) {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository
      .createQueryBuilder()
      .delete()
      .from(User)
      .where("id = :id", { id })
      .execute();

    return user;

  }

  async getUserData(id: string) {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findOne(id);

    return user;
  }

  async listUsers() {
    const usersRepository = getCustomRepository(UsersRepository);

    const users = await usersRepository.find();

    return users;
  }

  async searchUser(search: string) {
    if (!search) {
      throw new Error("Por favor rellene todos los campos");
    }

    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository
      .createQueryBuilder()
      .where("name like :search", { search: `%${search}%` })
      .orWhere("email like :search", { search: `%${search}%` })
      .orWhere("telefono like :search", { search: `%${search}%` })
      .orWhere("provincia like :search", { search: `%${search}%` })
      .orWhere("ciudad like :search", { search: `%${search}%` })
      .orWhere("username like :search", { search: `%${search}%` })
      .getMany();

    return user;

  }

  async updateUser({ id, name, email, telefono, provincia, ciudad, username, password }: IUser) {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository
      .createQueryBuilder()
      .update(User)
      .set({ name, email, telefono, provincia, ciudad, username, password })
      .where("id = :id", { id })
      .execute();

    return user;

  }
}

export { UserService };
export const userService = new UserService()