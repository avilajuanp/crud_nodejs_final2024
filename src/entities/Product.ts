import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, ManyToMany, JoinTable, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Category } from "./Category";

@Entity("products")
class Product {

  @PrimaryColumn()
  id: string;

  @Column()
  nombre: string;

  @Column()
  marca: string;

  @Column()
  precio: number;

  @Column()
  id_category: string

  @ManyToOne(() => Category, categoria => categoria.productos)
  @JoinColumn({ name: 'id_category' })
  category: Category

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Product };