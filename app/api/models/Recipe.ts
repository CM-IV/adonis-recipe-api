import { DateTime } from "luxon";
import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import User from "./User";

export default class Recipe extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public user_id: string

  @column()
  public title: string;

  @column()
  public description: string;

  @column()
  public steps: string;

  @column()
  public nutrition: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => User, {
    localKey: "user_id",
  })
  public user: BelongsTo<typeof User>;
}
