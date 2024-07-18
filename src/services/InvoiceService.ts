import { getCustomRepository } from "typeorm";
import { Invoice } from "../entities/Invoice";
import { Product } from "../entities/Product";
import { InvoicesRepository } from "../repositories/InvoicesRepository"

interface IFactura {
  id?:string
  num_factura:number, 
  tipo_factura: string, 
  fecha: Date, 
  total: number, 
  cliente_id: string
  productos: Product[];
  }

  class InvoiceService {

    async create({ num_factura, tipo_factura, fecha, total, cliente_id, productos }: IFactura) {
      if (!num_factura || !tipo_factura || !fecha || !cliente_id || !productos ) {
        throw new Error("Por favor rellene todos los campos.");
      }
  
      const facturasRepository = getCustomRepository(InvoicesRepository);
  
      const numFacturaAlreadyExists = await facturasRepository.findOne({ num_factura });
  
      if (numFacturaAlreadyExists) {
        throw new Error("EL numero de factura ya existe");
      }

      let totalPrecio = 0
        productos.forEach(producto => {
            totalPrecio += producto.precio
        });
  
      const factura = facturasRepository.create({ num_factura, tipo_factura, fecha, total: totalPrecio, cliente_id, productos });
      console.log(factura)
  
      await facturasRepository.save(factura);
  
      return factura;
  
    }
  
    async delete(id: string) {
      const facturasRepository = getCustomRepository(InvoicesRepository);
  
      const factura = await facturasRepository
        .createQueryBuilder()
        .delete()
        .from(Invoice)
        .where("id = :id", { id })
        .execute();
  
      return factura;
  
    }
  
    async getData(id: string) {
      const facturasRepository = getCustomRepository(InvoicesRepository);
  
      const factura = await facturasRepository.findOne(id, {relations: ["cliente", "productos"]});
  
      return factura;
    }
  
    async list() {
      const facturasRepository = getCustomRepository(InvoicesRepository);
  
      const facturas = await facturasRepository.find({relations: ["cliente", "productos"]});
  
      return facturas;
    }
  
    async search(search: string) {
      if (!search) {
        throw new Error("Por favor rellene todos los campos");
      }
  
      const facturasRepository = getCustomRepository(InvoicesRepository);
      // cambiar filtros de busqueda
      const factura = await facturasRepository
        .createQueryBuilder()
        .where("num_factura like :search", { search: `%${search}%` })
        .orWhere("tipo_factura like :search", { search: `%${search}%` })
        .orWhere("fecha like :search", { search: `%${search}%` })
        .orWhere("total like :search", { search: `%${search}%` })
        .orWhere("cliente_id like :search", { search: `%${search}%` })
        .getMany();
  
      return factura;
  
    }
  
    async update({ id, num_factura, tipo_factura, fecha, total, cliente_id }: IFactura) {
      const facturasRepository = getCustomRepository(InvoicesRepository);
  
      const factura = await facturasRepository
        .createQueryBuilder()
        .update(Invoice)
        .set({ num_factura, tipo_factura, fecha, total, cliente_id })
        .where("id = :id", { id })
        .execute();
  
      return factura;
  
    }
  }
  
  export { InvoiceService };
  export const invoiceService = new InvoiceService()

