require(`dotenv`).config()
const cors = require("cors")
const fruits = require("./fruits.json")
const express = require("express")
const app = express()
const port = process.env.PORT

app.use(cors())
app.use(express.json())

app.get("/", (req,res) => {
    res.send("Hello Fruit API")
})

app.get("/fruits", (req,res) => {
    res.send(fruits)
})

const getFruitIndex = name => {
    return fruits.findIndex((fruit) => fruit.name.toLowerCase() == name.toLowerCase())
}

app.post("/fruits", (req,res) => {
    const fi = getFruitIndex(req.body.name)
    if(fi > -1){
        res.status(409).send("The fruit already exists")
    }else{
        const ids = fruits.map((fruit) =>fruit.id)
        let maxId = Math.max(...ids)
        maxId++
        req.body.id = maxId
        fruits.push(req.body)
        res.status(201).send(req.body)
    }
})

app.delete("/fruits/:name", (req,res) => {
    const fi = getFruitIndex(req.params.name)
    if(fi == -1){
        res.status(404).send("Fruit can not be found")
    }else{
        fruits.splice(fi,1)
        res.status(200).send("Fruit deleted")
    }
})

app.get("/fruits/:name", (req,res) => {
    const name = req.params.name.toLowerCase()
    const fruit = fruits.find(fruit => fruit.name.toLowerCase() == name)
    if(!fruit){
        res.status(404).send("Fruit doesn't exist")
    }else{
        res.send(fruit)
    }
})

app.listen(port, () => {
    console.log(`Server is now listening on port ${port}`)
})