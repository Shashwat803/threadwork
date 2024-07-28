import express from "express"
import connectDb from "./db/config"
import * as dotenv from 'dotenv'
import postRoute from './routes/postRoute'
const app = express()
dotenv.config()


app.use(express.urlencoded({ extended: true })) // Parse URL-encoded bodies
app.use(express.json()) // Parse JSON bodies

app.use('/api/v1', postRoute)


connectDb().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`App is running on ${process.env.PORT}`)
    })
}).catch((err) => {
    console.log(err)
})