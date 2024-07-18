import { getCustomRepository } from "typeorm";
import { Client } from "../entities/Client";
import { ClientsRepository } from "../repositories/ClientsRepository"

interface ICliente {
    id?:string
    name: string;
    email: string;
    telefono: string;
    dni: string;
    direccion: string;
  }

  class ClientService {

    async create({ name, email, telefono, dni, direccion,  }: ICliente) {
      if (!name || !email || !telefono || !dni || !direccion ) {
        throw new Error("Por favor rellene todos los campos.");
      }
  
      const clientesRepository = getCustomRepository(ClientsRepository);
  
      const dniAlreadyExists = await clientesRepository.findOne({ dni });
  
      if (dniAlreadyExists) {
        throw new Error("El dni de usuario ingresado ya existe");
      }
  
      const emailAlreadyExists = await clientesRepository.findOne({ email });
  
      if (emailAlreadyExists) {
        throw new Error("El mail de usuario ingresado ya existe");
      }
  
      const cliente = clientesRepository.create({ name, email, telefono, dni, direccion, });
  
      await clientesRepository.save(cliente);
  
      return cliente;
  
    }
  
    async delete(id: string) {
      const clienteRepository = getCustomRepository(ClientsRepository);
  
      const cliente = await clienteRepository
        .createQueryBuilder()
        .delete()
        .from(Client)
        .where("id = :id", { id })
        .execute();
  
      return cliente;
  
    }
  
    async getData(id: string) {
      const clienteRepository = getCustomRepository(ClientsRepository);
  
      const cliente = await clienteRepository.findOne(id);
  
      return cliente;
    }
  
    async list() {
      const clienteRepository = getCustomRepository(ClientsRepository);
  
      const clientes = await clienteRepository.find();
  
      return clientes;
    }
  
    async search(search: string) {
      if (!search) {
        throw new Error("Por favor rellene todos los campos");
      }
  
      const clienteRepository = getCustomRepository(ClientsRepository);
  
      const cliente = await clienteRepository
        .createQueryBuilder()
        .where("name like :search", { search: `%${search}%` })
        .orWhere("email like :search", { search: `%${search}%` })
        .orWhere("telefono like :search", { search: `%${search}%` })
        .orWhere("dni like :search", { search: `%${search}%` })
        .orWhere("direccion like :search", { search: `%${search}%` })
        .getMany();
  
      return cliente;
  
    }
  
    async update({ id, name, email, telefono, dni, direccion }: ICliente) {
      const clientesRepository = getCustomRepository(ClientsRepository);
  
      const cliente = await clientesRepository
        .createQueryBuilder()
        .update(Client)
        .set({ name, email, telefono, dni, direccion })
        .where("id = :id", { id })
        .execute();
  
      return cliente;
  
    }
  }
  
  export { ClientService };
  export const clientService = new ClientService()