import express from 'express'
import mongoose from 'mongoose'
const app = express()
import dotenv from 'dotenv'
import personRoutes from './routes/personRoutes.js'

dotenv.config()

// Config Middlewares

app.use(
    express.urlencoded({extended: true})
)
app.use(express.json())

//Conectando Banco de dados

const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.9rywp7o.mongodb.net/`).then(()=>{
    console.log('Sucesso ao conectar ao banco de dados Mongodb')
}).catch((err)=>{
    console.log('erro ao tentar conectar ao banco de dados', err)
})

//rotas da API


app.use('/person', personRoutes)

app.get('/', (req, res)=>{
    res.json({message: 'oi express'})
    // res.send('enviou')
})

app.listen(3000, () =>{
    console.log('servidor rodando na porta localhost:3000')
})
