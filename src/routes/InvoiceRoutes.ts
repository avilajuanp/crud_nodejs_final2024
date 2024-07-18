import { Router } from "express";
import { InvoiceController } from "../controllers/InvoiceController";

const invoiceRoutes = Router();
const invoiceController = new InvoiceController();

invoiceRoutes.get("/facturas", invoiceController.HandleListInvoice);
invoiceRoutes.get("/addFactura", invoiceController.handleAddInvoice)
invoiceRoutes.post("/add-factura", invoiceController.HandleCreateInvoice);
invoiceRoutes.get("/editfactura", invoiceController.handleGetInvoiceData);
//invoiceRoutes.post("/edit-factura", invoiceController.update);
invoiceRoutes.post("/delete-factura", invoiceController.handleDeleteInvoice);

export { invoiceRoutes };