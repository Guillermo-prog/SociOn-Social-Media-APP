import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";

//Configuraciones MiddleWare
const __filename = fileURLToPath(import.meta.url); // toPath -> /ruta/a/archivo.js, import.meta.url -> file:///ruta/a/archivo.js
const __dirname = path.dirname(__filename); // directorio del archivo Ej.: /ruta/a

//Enviroment variables in a file .env
dotenv.config();

//CREATION OF THE SERVER
const app = express();

//All the JSON HTTP requests to JS readable objects
app.use(express.json());

//Hide HTTP responses confidential headers
app.use(helmet());

//cross-domain access to resources
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

//HTTP request logger (common format of requests in console)
app.use(morgan("common"));

//Data from JSONS URL format to JS readable
app.use(bodyParser.json({ limit: "30mb", extended: true }));

//Data from forms in URL format to JS readable
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

//Enables other domains to access the application's resources.
app.use(cors());

app.use("/assets", express.static(path.join(__dirname, "public/assets")));

//FILE STORAGE
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

//ROUTES with FILES Management (Need to use upload middelware, so we mantain them in Index.js)
//upload.single("picture") => to grab the picture property of the HTTP req where the image is located and to upload it
app.post("/auth/register", upload.single("picture"), register); //(route, middelware, logicAction=controller)
app.post("/posts", upload.single("picture"), createPost);

//ROUTES
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

//MONGOOSE SETUP
const PORT = process.env.PORT || 6001;

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server started at port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
