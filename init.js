import "./db";
import app from "./app";
import dotenv from "dotenv";
dotenv.config();
import "./models/Video";
import "./models/Comment";
const PORT = process.env.PORT || 4000;

const hadleListening = () => console.log(`Listening on: http://loclahost:${PORT}`);

app.listen(PORT, hadleListening);
