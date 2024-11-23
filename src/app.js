import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";


const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

// Routes Import
import  ResturantRouter from './router/Resturant.route.js'
import userRouter from './router/user.router.js'
import categoryRouter from './router/category.route.js'
import foodRouter from './router/foods.route.js'
import orderRouter from './router/order.route.js'

app.use("/api/v1/users", userRouter)
app.use("/api/v1/Restaurant", ResturantRouter)
app.use("/api/v1/Category",categoryRouter)
app.use("/api/v1/foods", foodRouter) 
app.use("/api/v1/order", orderRouter)


export {app}