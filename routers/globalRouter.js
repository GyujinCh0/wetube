import express from "express";
import routes from "../routes";
import passport from "passport";
import { home, search } from "../controllers/videoController";
import {
  getJoin,
  getLogin,
  logout,
  postJoin,
  postLogin,
  githubLogin,
  postGithubLogin,
  githubAuthenticate,
  getMe,
  googleLogin,
  googleAuthenticate,
  postGoogleLogin
} from "../controllers/userController";
import {onlyPublic, onlyPrivate} from "../middlewares";

const globalRouter = express.Router();

globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, postJoin, onlyPublic, postLogin);

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);
globalRouter.get(routes.logout,onlyPrivate, logout);

globalRouter.get(routes.github, githubLogin);
globalRouter.get(routes.githubCallback, githubAuthenticate, postGithubLogin);

globalRouter.get(routes.google, googleLogin);
globalRouter.get(routes.googleCallback,googleAuthenticate, postGoogleLogin);

globalRouter.get(routes.me,getMe);

export default globalRouter;
