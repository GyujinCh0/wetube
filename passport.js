import passport from "passport";
import GithubStrategy from "passport-github";
import passportGoogle from "passport-google-oauth20";
import { githubLoginCallback, googleLoginCallback } from "./controllers/userController";
import User from "./models/User";
import routes from "./routes";

const GoogleStrategy = passportGoogle.Strategy;

passport.use(User.createStrategy());

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: `http://localhost:4000${routes.githubCallback}`,
    },
    githubLoginCallback
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `http://localhost:4000${routes.googleCallback}`,
    },
    googleLoginCallback
  )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});
