import {MigrationInterface, QueryRunner} from "typeorm";

export class NewEntitie1678798788329 implements MigrationInterface {
    name = 'NewEntitie1678798788329'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cliente" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "telefono" varchar NOT NULL, "dni" varchar NOT NULL, "direccion" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "factura" ("id" varchar PRIMARY KEY NOT NULL, "num_factura" integer NOT NULL, "tipo_factura" varchar NOT NULL, "fecha" datetime NOT NULL, "total" integer NOT NULL, "cliente_id" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "factura_productos_products" ("facturaId" varchar NOT NULL, "productsId" varchar NOT NULL, PRIMARY KEY ("facturaId", "productsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_dd7cba7d091a4ce53678da190c" ON "factura_productos_products" ("facturaId") `);
        await queryRunner.query(`CREATE INDEX "IDX_3ca88e708b9ca7d77fb1f95c56" ON "factura_productos_products" ("productsId") `);
        await queryRunner.query(`CREATE TABLE "temporary_factura" ("id" varchar PRIMARY KEY NOT NULL, "num_factura" integer NOT NULL, "tipo_factura" varchar NOT NULL, "fecha" datetime NOT NULL, "total" integer NOT NULL, "cliente_id" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "FK_3133acb853019429bf0a231b6b5" FOREIGN KEY ("cliente_id") REFERENCES "cliente" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_factura"("id", "num_factura", "tipo_factura", "fecha", "total", "cliente_id", "created_at", "updated_at") SELECT "id", "num_factura", "tipo_factura", "fecha", "total", "cliente_id", "created_at", "updated_at" FROM "factura"`);
        await queryRunner.query(`DROP TABLE "factura"`);
        await queryRunner.query(`ALTER TABLE "temporary_factura" RENAME TO "factura"`);
        await queryRunner.query(`DROP INDEX "IDX_dd7cba7d091a4ce53678da190c"`);
        await queryRunner.query(`DROP INDEX "IDX_3ca88e708b9ca7d77fb1f95c56"`);
        await queryRunner.query(`CREATE TABLE "temporary_factura_productos_products" ("facturaId" varchar NOT NULL, "productsId" varchar NOT NULL, CONSTRAINT "FK_dd7cba7d091a4ce53678da190ce" FOREIGN KEY ("facturaId") REFERENCES "factura" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_3ca88e708b9ca7d77fb1f95c56e" FOREIGN KEY ("productsId") REFERENCES "products" ("id") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("facturaId", "productsId"))`);
        await queryRunner.query(`INSERT INTO "temporary_factura_productos_products"("facturaId", "productsId") SELECT "facturaId", "productsId" FROM "factura_productos_products"`);
        await queryRunner.query(`DROP TABLE "factura_productos_products"`);
        await queryRunner.query(`ALTER TABLE "temporary_factura_productos_products" RENAME TO "factura_productos_products"`);
        await queryRunner.query(`CREATE INDEX "IDX_dd7cba7d091a4ce53678da190c" ON "factura_productos_products" ("facturaId") `);
        await queryRunner.query(`CREATE INDEX "IDX_3ca88e708b9ca7d77fb1f95c56" ON "factura_productos_products" ("productsId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_3ca88e708b9ca7d77fb1f95c56"`);
        await queryRunner.query(`DROP INDEX "IDX_dd7cba7d091a4ce53678da190c"`);
        await queryRunner.query(`ALTER TABLE "factura_productos_products" RENAME TO "temporary_factura_productos_products"`);
        await queryRunner.query(`CREATE TABLE "factura_productos_products" ("facturaId" varchar NOT NULL, "productsId" varchar NOT NULL, PRIMARY KEY ("facturaId", "productsId"))`);
        await queryRunner.query(`INSERT INTO "factura_productos_products"("facturaId", "productsId") SELECT "facturaId", "productsId" FROM "temporary_factura_productos_products"`);
        await queryRunner.query(`DROP TABLE "temporary_factura_productos_products"`);
        await queryRunner.query(`CREATE INDEX "IDX_3ca88e708b9ca7d77fb1f95c56" ON "factura_productos_products" ("productsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_dd7cba7d091a4ce53678da190c" ON "factura_productos_products" ("facturaId") `);
        await queryRunner.query(`ALTER TABLE "factura" RENAME TO "temporary_factura"`);
        await queryRunner.query(`CREATE TABLE "factura" ("id" varchar PRIMARY KEY NOT NULL, "num_factura" integer NOT NULL, "tipo_factura" varchar NOT NULL, "fecha" datetime NOT NULL, "total" integer NOT NULL, "cliente_id" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "factura"("id", "num_factura", "tipo_factura", "fecha", "total", "cliente_id", "created_at", "updated_at") SELECT "id", "num_factura", "tipo_factura", "fecha", "total", "cliente_id", "created_at", "updated_at" FROM "temporary_factura"`);
        await queryRunner.query(`DROP TABLE "temporary_factura"`);
        await queryRunner.query(`DROP INDEX "IDX_3ca88e708b9ca7d77fb1f95c56"`);
        await queryRunner.query(`DROP INDEX "IDX_dd7cba7d091a4ce53678da190c"`);
        await queryRunner.query(`DROP TABLE "factura_productos_products"`);
        await queryRunner.query(`DROP TABLE "factura"`);
        await queryRunner.query(`DROP TABLE "cliente"`);
    }

}
