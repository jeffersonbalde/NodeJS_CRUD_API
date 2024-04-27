const express = require("express");
const mongoose = require('mongoose');
const app = express();

const Product = require("./models/product.model.js");

app.use(express.json());

app.get("/", (req,res) => {
    res.send("Hello Worlds");
})

app.post("/api/products", async (req,res) => {
    // console.log(req.body)
    // res.send(req.body)

    try {
        const product = await Product.create(req.body)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

mongoose.connect('mongodb+srv://jeffersonbalde13:WgoaNK134gfCECyo@cluster0.vm2kxe6.mongodb.net/Node-API?retryWrites=true&w=majority&appName=Cluster0')
.then(() => {   
    console.log("Connected to database")

    app.listen("3000", () => {
        console.log("server is running on port 3000");
    })
})
.catch(() => {
    console.log("Connection failed")
})