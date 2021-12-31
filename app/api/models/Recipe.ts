import { DateTime } from "luxon";
import { v4 as uuidv4 } from "uuid";
import { BaseModel, beforeCreate, column } from "@ioc:Adonis/Lucid/Orm";

export default class Recipe extends BaseModel {
  public static selfAssignPrimaryKey = true;

  @column({ isPrimary: true })
  public id: string;

  @column()
  public title: string;

  @column()
  public description: string;

  @column()
  public steps: string;

  @column()
  public nutrition: string;

  @beforeCreate()
  public static assignUuid(recipe: Recipe) {
    recipe.id = uuidv4();
  }

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
