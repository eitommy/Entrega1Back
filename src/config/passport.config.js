import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { UserModel } from "../models/user.model.js";

const cookieExtractor = (req) => {
  let token = null;

  if (req && req.cookies) {
    token = req.cookies["coderCookieToken"];
  }

  return token;
};

export const initializePassport = () => {
  passport.use(
    "jwt",
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromExtractors([
          cookieExtractor,
          ExtractJwt.fromAuthHeaderAsBearerToken()
        ]),
        secretOrKey: process.env.JWT_SECRET || "coderSecret"
      },
      async (jwtPayload, done) => {
        try {
          const user = await UserModel.findById(jwtPayload.id).populate("cart");

          if (!user) {
            return done(null, false, { message: "Usuario no encontrado" });
          }

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};
