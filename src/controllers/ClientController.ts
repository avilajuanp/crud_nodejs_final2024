import { Request, Response } from "express";
import { Password } from "../utils/Password";
import { ClientService } from "../services/ClientService";

class ClientController{
  //instanciamos clientService global para todos los métodos
  private clientService: ClientService;
  
  constructor() {
    this.clientService = new ClientService();
    this.handleCreateClient = this.handleCreateClient.bind(this);
    this.handleDeleteClient = this.handleDeleteClient.bind(this);
    this.handleGetClientData = this.handleGetClientData.bind(this);
    this.handleListClients = this.handleListClients.bind(this);
    this.handleSearchClient = this.handleSearchClient.bind(this);
    this.handleUpdateClient = this.handleUpdateClient.bind(this);
  }

  async handleCreateClient(request: Request, response: Response) {
      const { name, email, telefono, dni, direccion } = request.body;
  
      // const createClientService = new ClientService();
  
      try {
        await this.clientService.create({
          name,
          email,
          telefono,
          dni,
          direccion,

        }).then(() => {
          request.flash("success", "Cliente creado con éxito")
          response.redirect("/clients")
          });
        
      } catch (err) {
        request.flash("error", "Error al crear el cliente", err.toString());
        console.log(request.body)
        response.redirect("/clients");
        
      }
  
  }
  async handleDeleteClient(request: Request, response: Response) {
      const { id } = request.body;
  
      // const deleteClientService = new ClientService();
  
      try {
        await this.clientService.delete(id).then(() => {
          request.flash("success", "Cliente eliminado con éxito")
          response.redirect("/clients")
          });
        
      } catch (err) {
        request.flash("error", "Error al eliminar el Cliente", err.toString());
        response.redirect("/clients");
        
      }
  }
  async handleGetClientData(request: Request, response: Response) {
    let { id } = request.query;
    id = id.toString();

    // const getClientDataService = new ClientService();

    const cliente = await this.clientService.getData(id);

    return response.render("clients/edit", {
      cliente: cliente
    });
  }
  async handleListClients(request: Request, response: Response) {
    // const listClientsService = new ClientService();

    const clients = await this.clientService.list();

    return response.render("cliente/index", {
      clients: clients
    });
  }
  async handleSearchClient(request: Request, response: Response) {
    let { search } = request.query;
    search = search.toString();

    // const searchClientService = new ClientService();

    try {
      const clients = await this.clientService.search(search);
      response.render("cliente/search", {
        clients: clients,
        search: search
      });
    } catch (err) {
      request.flash("error", "Error al crear el cliente", err.toString());
        response.redirect("/clients");
      
    }
  }
  async handleUpdateClient(request: Request, response: Response) {
    const { id, name, email, telefono, dni, direccion } = request.body;

    // const updateClientService = new ClientService();

    try {
      await this.clientService.update({ 
        id, 
        name, 
        email, 
        telefono, 
        dni,
        direccion,
      }).then(() => {
        request.flash("success", "Cliente actualizado con éxito")
          response.redirect("/clients")
        
      });
    } catch (err) {
      request.flash("error", "Error al crear el cliente", err.toString());
        response.redirect("/clients");
    }

  }  
}
export {ClientController};