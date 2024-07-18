import { Router } from "express";
import { ClientController } from "../controllers/ClientController";

const clientRouter = Router()
const clientController = new ClientController()

clientRouter.get("/clientes", clientController.handleListClients);

clientRouter.get("/addCliente", (request, response) => {
  response.render("cliente/add")
});

clientRouter.post("/add-cliente", clientController.handleCreateClient);
clientRouter.get("/editCliente", clientController.handleGetClientData);
clientRouter.post("/edit-cliente", clientController.handleUpdateClient);
clientRouter.post("/delete-cliente", clientController.handleDeleteClient);
clientRouter.get("/searchCliente", clientController.handleSearchClient);

export { clientRouter }