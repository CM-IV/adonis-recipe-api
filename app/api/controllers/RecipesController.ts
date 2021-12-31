import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Recipe from "../models/Recipe";
import { schema } from "@ioc:Adonis/Core/Validator";
//import Logger from "@ioc:Adonis/Core/Logger";

export default class RecipesController {
  public async show({ params }: HttpContextContract) {
    // Logger.info(JSON.stringify(recipe));

    return Recipe.findOrFail(params.id);
  }

  public async index({ request }: HttpContextContract) {
    const page = request.input("page", 1);

    const limit = request.input("per_page", 5);

    return Recipe.query().paginate(page, limit);
  }

  public async store({ request, response }: HttpContextContract) {
    const recipeSchema = schema.create({
      title: schema.string(),
      description: schema.string(),
      steps: schema.string(),
      nutrition: schema.string(),
    });

    const payload = await request.validate({ schema: recipeSchema });

    await Recipe.create(payload);

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
