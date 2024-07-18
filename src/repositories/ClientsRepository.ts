import { Repository, EntityRepository } from "typeorm";
import { Client } from "../entities/Client";

@EntityRepository(Client)
class ClientsRepository extends Repository<Client>{ }

export { ClientsRepository };