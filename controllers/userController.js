import passport from "passport";
import routes from "../routes";
import User from "../models/User";

export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Join" });
};

export const postJoin = async (req, res, next) => {
  const {
    body: { name, email, password, password2 },
  } = req;
  if (password !== password2) {
    res.status(400);
    res.render("join", { pageTitle: "Join" });
  } else {
    // To Do: Register User
    // To Do: Log user in``
    try {
      const user = await User({
        name,
        email,
      });
      await User.register(user, password);
      next();
    } catch (error) {
      console.log(error);
      res.redirect(routes.home);
    }
  }
};
// 6.8 comments 참조
export const getLogin = (req, res) => res.render("login", { pageTitle: "Log In" });

export const postLogin = passport.authenticate("local", {
  failureRedirect: routes.login,
  successRedirect: routes.home,
});

export const githubLogin = passport.authenticate("github");

export const githubLoginCallback = async (_, __, profile, cb) => {
  const {
    _json: { id, name , avatar_url: avatarUrl, email },
  } = profile;
  console.log(profile);
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.githubId=id;
      user.avatarUrl=avatarUrl;
      user.save();
      return cb(null, user);
    }
    const newUser = User.create({
      githubId: id,
      email,
      name,
      avatarUrl,
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

export const githubAuthenticate = passport.authenticate("github", {
  failureRedirect: routes.login,
});

export const postGithubLogin = (req, res) => {
  res.redirect(routes.home);
};

export const googleLogin = passport.authenticate("google", { scope: ["profile", "email"] });

export const googleLoginCallback = async (_, __, profile, cb) => {
  const {
    _json: { sub: id, name, picture: avatarUrl, email },
  } = profile;
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.googleId=id;
      user.avatarUrl=avatarUrl;
      user.save();
      return cb(null, user);
    }
    const newUser = User.create({
      googleId: id,
      email,
      name,
      avatarUrl,
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

export const googleAuthenticate = passport.authenticate("google", {
  failureRedirect: routes.login,
});

export const postGoogleLogin = (req, res) => {
  res.redirect(routes.home);
};

export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};

export const getMe = (req, res) => {
  res.render("userDetail", { pageTitle: "User Detail", user: req.user });
};

export const userDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const user = await User.findById(id);
    res.render("userDetail", { pageTitle: "User Detail", user });
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const editProfile = (req, res) => res.render("editProfile", { pageTitle: "Edit Profile" });
export const changePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "Change Password" });
