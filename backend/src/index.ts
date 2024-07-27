import express from "express"
import connectDb from "./db/config"
import * as dotenv from 'dotenv'
const app = express()
dotenv.config()




connectDb().then(() => {
    app.listen(5000, () => {
        console.log("App is working")
    })
}).catch((err) => {
    console.log(err)
})