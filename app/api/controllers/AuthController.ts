import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from '../models/User'
import { schema, rules } from "@ioc:Adonis/Core/Validator"
// import Logger from "@ioc:Adonis/Core/Logger";

export default class AuthController {

    public async register({ request, response }: HttpContextContract) {

        const userSchema = schema.create({
            
            email: schema.string({ trim: true }, [
                rules.required(),
                rules.email(),
                rules.unique({ table: "users", column: "email" }),
            ]),
            username: schema.string({ trim: false }, [
                rules.required(),
                rules.unique({ table: "users", column: "username" }),
            ]),
            password: schema.string({ trim: false }, [
                rules.confirmed(),
                rules.required(),
                rules.minLength(5),
            ]),

        });

        const payload = await request.validate({
            schema: userSchema,
            messages: {
              required: "The {{ field }} is required to register a new account.",
              confirmed: "The password fields do not match.",
              "username.unique": "That username is already in use",
              "email.email": "Enter a valid email address",
              "email.unique": "That email is already in use",
              "password.minLength":
                "The minimum characters in your password must be greater than or equal to 5.",
            },
        });

        const user = await User.create(payload);

        // Logger.info('User Details: ', {user: auth.user})

        return response.json(user);

    }

    public async login({ request, response, auth }: HttpContextContract) {
        const username = request.input('username')
        const password = request.input('password')
    
        try {
          const bearer = await auth.use("api").attempt(username, password, {

            expiresIn: "1day"

          });

          return response.send({
            userId: auth.user!.id,
            bearer
          });
        } catch {
          return response.badRequest("Credentials are invalid!");
        }
    }

    public async logout({ response, auth }: HttpContextContract) {
        await auth.use("api").revoke();
    
        response.status(200);
    
        return {
          revoked: true,
        };
    }

}
