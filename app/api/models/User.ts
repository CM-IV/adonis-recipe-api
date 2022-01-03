import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
// import { v4 as uuidv4 } from "uuid";
import { column, beforeSave, BaseModel, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Recipe from './Recipe'

export default class User extends BaseModel {

  @column({ isPrimary: true })
  public id: string

  @column()
  public username: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Recipe, {
    foreignKey: "user_id"
  })
  public recipes: HasMany<typeof Recipe>

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
