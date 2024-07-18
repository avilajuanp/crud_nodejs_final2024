import { Request, Response } from "express";
import { categoryService } from "../services/CategoryService";
import { ProductService } from "../services/ProductService"

class ProductController{
  //instanciamos ProductService global para todos los métodos
  private productService: ProductService;
  constructor() {
    this.productService = new ProductService();
    this.handleCreateProduct = this.handleCreateProduct.bind(this);
    this.handleDeleteProduct = this.handleDeleteProduct.bind(this);
    this.handleGetProductData = this.handleGetProductData.bind(this);
    this.handleListProducts = this.handleListProducts.bind(this);
    this.handleSearchProduct = this.handleSearchProduct.bind(this);
    this.handleUpdateProduct = this.handleUpdateProduct.bind(this);
  }

    async handleCreateProduct(request: Request, response: Response) {
        const { nombre, marca, precio, id_category } = request.body;
    
        // const createProductService = new ProductService();
    
        try {
          await this.productService.create({
            nombre,
            marca,
            precio,
            id_category
          }).then(() => {
            request.flash("success", "Producto creado exitosamente")
            response.redirect("/products")
          });
        } catch (err) {
          request.flash("error", "Error al crear el producto", err.toString());
          response.redirect("/products");
        }
    
    }

    // async handleAddProduct(request: Request, response:Response) {
    //   const category = await categoryService.listCategories();
    //   return response.render("products/addproduct", { category })
    // }

    async handleDeleteProduct(request: Request, response: Response) {
        const { id } = request.body;
    
        // const deleteProductService = new ProductService();
    
        try {
          await this.productService.delete(id).then(() => {
            request.flash("success", "Producto eliminado exitosamente")
            response.redirect("/products")
          });
        } catch (err) {
          request.flash("error", "Error al crear el producto", err.toString());
          response.redirect("/products");
          
        }
    }

    async handleGetProductData(request: Request, response: Response) {
      let { id } = request.query;
      id = id.toString();
  
      // const getProductDataService = new ProductService();
  
      const product = await this.productService.getData(id);
      const category = await categoryService.listCategories()
  
      return response.render("products/edit", {
        product: product,
        category: category
      });
    }

    async handleListProducts(request: Request, response: Response) {
      // const listProductsService = new ProductService();
  
      const products = await this.productService.list();
  
      return response.render("products/list", {
        products: products
      });
    }

    async handleSearchProduct(request: Request, response: Response) {
      let { search } = request.query;
      search = search.toString();

      console.log(search)
  
      // const searchProductService = new ProductService();
  
      try {
        const products = await this.productService.search(search);
        const category = await categoryService.listCategories()
        response.render("products/search", {
          products: products,
          category: category,
          search: search
        });
      } catch (err) {
        request.flash("error", "Error al buscar el producto", err.toString());
          response.redirect("/products");
        
      }
    }

    async handleUpdateProduct(request: Request, response: Response) {
      const { id, nombre, marca, precio, id_category } = request.body;
  
      // const updateProductService = new ProductService();
  
      try {
        await this.productService.update({ id, nombre, marca, precio, id_category }).then(() => {
          request.flash("success", "Producto modificado exitosamente")
            response.redirect("/products")
          });
        } catch (err) {
          request.flash("error", "Error al actualizar el producto", err.toString());
          response.redirect("/products");
          
        }
  
    }  
}
export {ProductController};
