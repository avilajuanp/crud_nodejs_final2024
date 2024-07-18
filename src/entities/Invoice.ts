import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn, ManyToOne, JoinColumn, ManyToMany, JoinTable } from "typeorm";
import { v4 as uuid } from "uuid";
import { Client } from "./Client";
import { Product } from "./Product";

@Entity("factura")
class Invoice {

  @PrimaryColumn()
  id:string;

  @Column()
  num_factura: number;

  @Column()
  tipo_factura: string;

  @Column()
  fecha: Date;

  @Column()
  total: number;
  
  @Column()
  cliente_id: string;

  @ManyToOne(() => Client, cliente => cliente.facturas)
  @JoinColumn({ name: 'cliente_id'})
  cliente: Client;

  @ManyToMany(() => Product,{
    cascade: true
  })
  @JoinTable()
  productos: Product[]; 

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

export { Invoice };