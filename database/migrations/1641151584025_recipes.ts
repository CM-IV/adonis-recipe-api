import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Recipes extends BaseSchema {
  protected tableName = "recipes";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table.uuid("user_id").references("users.id").onDelete("CASCADE");
      table.string("title", 150).notNullable();
      table.string("description", 500).notNullable();
      table.string("steps", 500).notNullable();
      table.string("nutrition", 500).notNullable();
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
