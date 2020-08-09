export const join = (req, res) => res.render("Join",{pageTitle: "Join"});
export const login = (req, res) => res.render("Login",{pageTitle: "Login"});
export const logout = (req, res) => res.render("Logout");
export const users =(req,res)=>res.render("Users");
export const userDetail =(req,res)=>res.render("User Detail",{pageTitle:"User Detail"});
export const editProfile =(req,res)=>res.render("Edit Profile",{pageTitle: "Edit Profile"});
export const chagePassword =(req,res)=>res.render("change Password",{pageTilte:"ChangePassword"});
