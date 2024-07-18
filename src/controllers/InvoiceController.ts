import { Request, Response } from "express";
import { productService, ProductService } from "../services/ProductService";
import { invoiceService } from "../services/InvoiceService";
import { clientService } from "../services/ClientService";

class InvoiceController {
    // no instanciamos servicio global porque ya lo importamos de InvoiceService

    async handleGetInvoiceData(request: Request, response: Response) {
        let { id } = request.query;
        id = id.toString();

        const factura = await invoiceService.getData(id);
        const productos = await productService.list()

        const productosOrder = factura.productos.map(product => product.id)

        return response.render("invoices/edit", {
            factura: factura,
            productos: productos,

        });
    }

    async handleAddInvoice(request: Request, response: Response) {
        const clientes = await clientService.list();
        const productos = await productService.list();
        return response.render("invoices/add", { clientes, productos })
    }

    async HandleCreateInvoice(request: Request, response: Response) {
        const { num_factura, tipo_factura, total, fecha, cliente_id } = request.body;
        let { productos } = request.body

        try {
            if (typeof productos === "string") {
                const producto = await productService.getData(productos.toString())
                productos = [];
                productos.push(producto)
            } else {
                productos.map(async (product: string) => {
                    const producto = await productService.getData(product.toString())
                    productos.shift()
                    productos.push(producto)
                })
            }

            await invoiceService.create({
                num_factura,
                tipo_factura,
                fecha,
                total,
                cliente_id,
                productos
            }).then(() => {
                request.flash("success", "Factura creada con éxito")
                response.redirect("/invoices")
            });
        } catch (err) {
            request.flash("error", "Error al crear factura", err.toString());
            response.redirect("/invoices")
        }
    }

    async HandleListInvoice(request: Request, response: Response) {

        const facturas = await invoiceService.list();
        const productos = await productService.list();
        const clientes = await clientService.list();

        return response.render("invoices/list", {
            facturas: facturas,
            productos: productos,
            clientes: clientes,
        });
    };

    async handleDeleteInvoice(request: Request, response: Response) {
        const { id } = request.body;
        try {
            await invoiceService.delete(id).then(() => {
                request.flash("success", "Factura eliminada exitosamente");
                response.redirect("/invoices");
            })
        } catch (error) {
            request.flash("error", "Error al eliminar factura");
            response.redirect("/invoices");
        }
    }
    // async update(request:Request, response:Response) {
    //     const{num_factura, tipo_factura, fecha, total, cliente_id, productos} = request.body;
    //     let{productosOrder} = request.body
    //     try {
    //         if(typeof productos === "string"  ){
    //             const producto = await productService.getData(productos)
    //             productos = []
    //             productos.push(producto)
    //         }else{
    //             productos.map(async (product:string) => {
    //                 const producto = await productService.getData(product)
    //                 productos.shift()
    //                 productos.push(producto)
    //             })
    //         }

    //         await invoiceService.update({ num_factura, tipo_factura, fecha, total, cliente_id, productos }).then(() => {
    //             request.flash("success_msg", "orden actualizada correctamente")
    //             response.redirect("./orders")
    //         });

    //     } catch (err) {
    //         request.flash("error_msg", "fallo al actualizar la orden");
    //         response.redirect("./orders")
    //     }

    // }
}

export { InvoiceController }

