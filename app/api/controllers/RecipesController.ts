import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Recipe from "../models/Recipe";
import { schema } from "@ioc:Adonis/Core/Validator";
//import Logger from "@ioc:Adonis/Core/Logger";

export default class RecipesController {
  public async show({ params }: HttpContextContract) {

    const recipe = await Recipe.findOrFail(params.id);

    return recipe.toJSON();
  }

  public async index({ request }: HttpContextContract) {
    const page = request.input("page", 1);

    const limit = request.input("per_page", 5);

    const recipes = await Recipe.query().paginate(page, limit);

    return recipes.toJSON();
  }

  public async store({ request, response, auth }: HttpContextContract) {

    const recipeSchema = schema.create({
      title: schema.string(),
      description: schema.string(),
      steps: schema.string(),
      nutrition: schema.string(),
    });

    const payload = await request.validate({ schema: recipeSchema });

    await Recipe.create({

      user_id: auth.user!.id,
      title: payload.title,
      description: payload.description,
      steps: payload.steps,
      nutrition: payload.nutrition

    });

    return response.created();
  }

  public async update({ response, params, request }: HttpContextContract) {
    const recipe = await Recipe.findOrFail(params.id);

    const recipeSchema = schema.create({
      title: schema.string(),
      description: schema.string(),
      steps: schema.string(),
      nutrition: schema.string(),
    });

    const payload = await request.validate({ schema: recipeSchema });

    recipe.title = payload.title;
    recipe.description = payload.description;
    recipe.steps = payload.steps;
    recipe.nutrition = payload.nutrition;

    recipe.save();

    return response.json({ recipe });
  }

  public async destroy({ params, response }: HttpContextContract) {
    const recipe = await Recipe.findOrFail(params.id);

    recipe.delete();

    response.status(200);

    return `Recipe with ID ${params.id} was deleted!`;
  }
}
