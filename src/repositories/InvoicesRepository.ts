import { Repository, EntityRepository } from "typeorm";
import { Invoice } from "../entities/Invoice";

@EntityRepository(Invoice)
class InvoicesRepository extends Repository<Invoice>{ }

export { InvoicesRepository };