import { Router } from "express";
import { ProductController } from "./controllers/ProductController";

const router = Router();

const productController = new ProductController();

router.get("/", (request, response) => {
  response.render("./login/signin");
});

router.get("/home", (request, response) => {
  response.render("home");
});

// productRouter.get("/products", Auth.isLoggedIn, productController.handleListProducts);

// // productRouter.get("/addProduct", Auth.isLoggedIn, productController.handleAddProduct);
// productRouter.get("/products/add", async (request, response) => {
//   const categories: Category[] = await categoryService.listCategories();
//   response.render("products/add", { categories });
// });
// productRouter.post("/add-product", productController.handleCreateProduct);
// productRouter.get("/searchProduct", Auth.isLoggedIn, productController.handleSearchProduct);
// productRouter.get("/editProduct", Auth.isLoggedIn, productController.handleGetProductData)
// productRouter.post("/edit-product", productController.handleUpdateProduct);
// productRouter.post("/delete-product", productController.handleDeleteProduct);

export { router };

