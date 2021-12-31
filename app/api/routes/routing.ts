/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes.
*/

import Route from "@ioc:Adonis/Core/Route";
import HealthCheck from "@ioc:Adonis/Core/HealthCheck";

Route.group(() => {
  //Get by UUID
  //Get all and paginate result
  //Create new recipe
  Route.resource("/recipes", "RecipesController").only([
    "show",
    "index",
    "store",
  ]);

  /*     BEGIN TESTS      */
  //Health check
  //Make sure to configure .env values
  Route.get("health", async ({ response }) => {
    const report = await HealthCheck.getReport();

    return report.healthy ? response.ok(report) : response.badRequest(report);
  });

  //OK
  Route.get("test", async ({ response }) => {
    response.json({
      message: "ok",
    });

    return response.status(200);
  });
  /*     END TESTS      */
}).prefix("/api");
