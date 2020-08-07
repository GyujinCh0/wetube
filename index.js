import express from "express";
import logger from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
const app = express();

const PORT = 4000;

const hadleListening=()=>console.log(`Listening on: http://localhost:${PORT}`);
 
const handleHome=(req, res)=>res.send("All Hail to the ffhome");
 
const handProfile=(req,res)=>res.send("You on Profile");

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(logger("dev"));

app.get("/",handleHome);
app.get("/profile",handProfile)
app.listen(PORT,hadleListening);