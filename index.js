const express = require('express')
const app = express()

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const gameRouter = require('./routes/game')

app.use(gameRouter)

app.listen(1234,()=>{
    console.log("rodando")
})