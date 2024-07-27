import express from "express"
import connectDb from "./db/config"
const app = express()





connectDb().then(() => {
    app.listen(5000, () => {
        console.log("App is working")
    })
}).catch((err) => {
    console.log(err)
})