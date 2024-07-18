import { getCustomRepository } from "typeorm";
import { CategoriesRepository } from "../repositories/CategoriesRepository"
import { Category } from "../entities/Category";


interface ICategory {
  id?: string
  nombre: string;

  }
class CategoryService {
  async createCategory({ nombre, }: ICategory) {
    if (!nombre) {
      throw new Error("Por favor rellene todos los campos.");
    }
    const categoriesRepository = getCustomRepository(CategoriesRepository);
    const categorynameAlreadyExists = await categoriesRepository.findOne({ nombre });

    if (categorynameAlreadyExists) {
      throw new Error("La Categoria ya ha sido creado");
    }

    const category = categoriesRepository.create({ nombre });
    console.log(category)

    await categoriesRepository.save(category);

    return category;
  }

  async deleteCategory(id: string) {
    const categoriesRepository = getCustomRepository(CategoriesRepository);

    const category = await categoriesRepository
      .createQueryBuilder()
      .delete()
      .from(Category)
      .where("id = :id", { id })
      .execute();

    return category;

  }

  async getCategoryData(id: string) {
    const categoriesRepository = getCustomRepository(CategoriesRepository);

    const category = await categoriesRepository.findOne(id);

    return category;
  }

  async listCategories() {
    const categoriesRepository = getCustomRepository(CategoriesRepository);

    const categorias = await categoriesRepository.find();

    return categorias;
  }

  async searchCategory(search: string) {
    if (!search) {
      throw new Error("Por favor rellene todos los campos");
    }

    const categoriesRepository = getCustomRepository(CategoriesRepository);

    const category = await categoriesRepository
      .createQueryBuilder()
      .where("nombre like :search", { search: `%${search}%` })      
      .getMany();

    return category;

  }

  async updateCategory({ id, nombre }: ICategory) {
    const categoriesRepository = getCustomRepository(CategoriesRepository);

    const category = await categoriesRepository
      .createQueryBuilder()
      .update(Category)
      .set({ nombre })
      .where("id = :id", { id })
      .execute();

    return category;

  }
}

export const categoryService = new CategoryService()
export { CategoryService };