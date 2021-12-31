import Factory from "@ioc:Adonis/Lucid/Factory";
import Recipe from "../../app/api/models/Recipe";

export const UserFactory = Factory.define(Recipe, ({ faker }) => {
  return {
    title: faker.lorem.words(3),
    description: faker.lorem.sentences(2),
    steps: faker.lorem.sentences(3),
    nutrition: faker.lorem.sentences(2),
  };
}).build();
