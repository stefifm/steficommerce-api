import express from 'express'
import './config/mongoose'
import productRoutes from './routes/products.routes'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())


app.use(productRoutes)


app.listen(4000)
console.log("Server on port", 4000)