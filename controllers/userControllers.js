import routes from "../routes"
export const getJoin = (req, res) =>{ 
    res.render("join",{pageTitle: "Join"});
};
export const postJoin=(req,res)=>{
    const {
        body: {name,email,password,passwordVerify}
    }=req;
    if(password!==passwordVerify){
        res.status(400);
        res.render("join", {pageTitle:"Join"});
    }else{
        //To Do: Rejister User
        //To Do: User Login
        res.redirect(routes.home);
    }
};
export const getLogin = (req, res) => {
    res.render("login",{pageTitle: "Login"});
}
export const postLogin = (req, res) => {
    const {
        body: {email, password}
    }=req;
   res.redirect(routes.home);
}
export const logout = (req, res) => res.render("logout");
export const users =(req,res)=>res.render("users");
export const userDetail =(req,res)=>res.render("UserDetail",{pageTitle:"User Detail"});
export const editProfile =(req,res)=>res.render("editProfile",{pageTitle: "Edit Profile"});
export const chagePassword =(req,res)=>res.render("changePassword",{pageTilte:"ChangePassword"});
