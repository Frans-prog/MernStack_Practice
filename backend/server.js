import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import path from 'path'

import carRoutes from './routes/car.routes.js'


dotenv.config()
const PORT  = process.env.PORT

const  __dirname = path.resolve()

const app  = express()

app.use(express.json())

app.use('/api/cars', carRoutes )

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, "/frontend/dist")))
    
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
    })
}

app.listen(PORT, () => {
    connectDB();
    console.log("Server started at http://localhost:" + PORT)
    
})
