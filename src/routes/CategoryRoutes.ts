import { Router } from "express";
import { CategoryController } from "../controllers/CategoryController";
import Auth from "../utils/auth";

const categoryRoutes = Router()
const categoryController = new CategoryController()

categoryRoutes.get("/categories", Auth.isLoggedIn, categoryController.handleListCategories)
categoryRoutes.get("/categories/add", Auth.isLoggedIn, (request, response) => {
    response.render("categories/add");
  });
categoryRoutes.post("/categories/add-category", categoryController.handleCreateCategory);
categoryRoutes.get("/categories/search", Auth.isLoggedIn, categoryController.handleSearchCategory);
categoryRoutes.post("/categories/edit-category", categoryController.handleUpdateCategory);
categoryRoutes.get("/categories/edit", Auth.isLoggedIn, categoryController.handleGetCategoryData);
categoryRoutes.post("/categories/delete-category", categoryController.handleDeleteCategory);

export { categoryRoutes }
