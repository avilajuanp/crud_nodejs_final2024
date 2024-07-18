import { Request, Response } from "express";
import { CategoryService } from "../services/CategoryService"

class CategoryController{
  //instanciamos CategoryService global para todos los métodos
  private categoryService: CategoryService;
  constructor() {
    this.categoryService = new CategoryService();
    this.handleCreateCategory = this.handleCreateCategory.bind(this);
    this.handleDeleteCategory = this.handleDeleteCategory.bind(this);
    this.handleGetCategoryData = this.handleGetCategoryData.bind(this);
    this.handleListCategories = this.handleListCategories.bind(this);
    this.handleSearchCategory = this.handleSearchCategory.bind(this);
    this.handleUpdateCategory = this.handleUpdateCategory.bind(this);
  }

    async handleCreateCategory(request: Request, response: Response) {
        const { nombre } = request.body;
    
        // const createCategoryService = new CategoryService();

        try {
          await this.categoryService.createCategory({  
            nombre
          }).then(() => {
            request.flash("success", "Categoría creada con éxito")
            response.redirect("/categories")
          });
        } catch (err) {
          request.flash("error", "Error al crear la categoría", err.toString());
          response.redirect("/categories");
        }
    
    }

    async handleDeleteCategory(request: Request, response: Response) {
        const { id } = request.body;
    
        // const deleteCategoryService = new CategoryService();
    
        try {
          await this.categoryService.deleteCategory(id).then(() => {
            request.flash("success", "Categoría eliminada con éxito")
            response.redirect("/categories")
          });
        } catch (err) {
          request.flash("error", "Error al eliminar la categoría", err.toString());
          response.redirect("/categories");
        };
    }

    async handleGetCategoryData(request: Request, response: Response) {
      let { id } = request.query;
      id = id.toString();
  
      // const getCategoryDataService = new CategoryService();
  
      const category = await this.categoryService.getCategoryData(id);
  
      return response.render("categories/edit", {
        category: category
      });
    }

    async handleListCategories(request: Request, response: Response) {
      // const listCategoriesService = new CategoryService();
  
      const categories = await this.categoryService.listCategories();
  
      return response.render("categories/list", {
        categories: categories
      });
    }
    
    async handleSearchCategory(request: Request, response: Response) {
      let { search } = request.query;
      search = search.toString();
  
      // const searchCategoryService = new CategoryService();
  
      try {
        const categories = await this.categoryService.searchCategory(search);
        response.render("categories/search", {
          categories: categories,
          search: search
        });
      } catch (err) {
        request.flash("error", "Error al buscar la categoría", err.toString());
          response.redirect("/categories");
      };
    }

    async handleUpdateCategory(request: Request, response: Response) {
      const { id, nombre } = request.body;
  
      // const updateCategoryService = new CategoryService();
  
      try {
        await this.categoryService.updateCategory({ id, nombre }).then(() => {
          request.flash("success", "Categoría modificada con éxito")
            response.redirect("/categories")
          });
        } catch (err) {
          request.flash("error", "Error al actualizar la categoría", err.toString());
          response.redirect("/categories");
        };
  
    }  
}
export {CategoryController};
