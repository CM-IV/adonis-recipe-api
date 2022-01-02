import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Recipes extends BaseSchema {
  protected tableName = "recipes";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid("id").primary();
      table
        .integer("user_id")
        .unsigned()
        .references("users.id")
        .onDelete("CASCADE")
      table.string("title", 150);
      table.string("description", 500);
      table.string("steps", 500);
      table.string("nutrition", 500);
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
