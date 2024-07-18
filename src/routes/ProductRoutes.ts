import { Router } from "express";
import { ProductController } from "../controllers/ProductController";
import { Category } from "../entities/Category";
import { CategoryService } from "../services/CategoryService";
import Auth from "../utils/auth";

const productRouter = Router();
const productController = new ProductController();
const categoryService = new CategoryService();

productRouter.get("/products", Auth.isLoggedIn, productController.handleListProducts);

productRouter.get("/products/add", Auth.isLoggedIn, async (request, response) => {
    const categories: Category[] = await categoryService.listCategories();
    response.render("products/add", { categories });
});
productRouter.post("/products/add-product", productController.handleCreateProduct);

productRouter.get("/products/search", Auth.isLoggedIn, productController.handleSearchProduct);

productRouter.get("/products/edit", Auth.isLoggedIn, productController.handleGetProductData);
productRouter.post("/products/edit-product", productController.handleUpdateProduct);

productRouter.post("/products/delete-product", productController.handleDeleteProduct);

export { productRouter }