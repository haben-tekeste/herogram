import express from "express"
import cors from 'cors'
import helmet from "helmet"
import 'dotenv/config'
// import authRouter from "./src/routes/auth"
import authRouter from "./src/routes/auth.js"
import fileRouter from './src/routes/file.js'
import { isAuth } from "./src/middlewares/isAuth.js"
import mongoose from "mongoose"
import { errorHandler } from "./src/middlewares/error-handler.js"

const app = express()

app.use(express.json())

app.use(cors())
app.use(helmet())

app.use(authRouter)
app.use(isAuth)
app.use(fileRouter)

app.use((error, req, res, next) => {
    console.log(error)
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({ message });
});

  const start = async () => {
   
    try {
      await mongoose.connect(process.env.MONGO_URI);
    } catch (error) {
      console.error(error);
    }
    app.listen(process.env.PORT || 4000, () => {
      console.log("server running");
    });
  };

start()