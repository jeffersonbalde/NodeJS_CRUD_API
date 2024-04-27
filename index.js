const express = require("express");
const mongoose = require('mongoose');
const app = express();

const Product = require("./models/product.model.js");

app.use(express.json());

app.get("/", (req,res) => {
    res.send("Hello Worlds");
})

app.get("/api/products", async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.get("/api/product/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// CREATE API
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

// UPDATE API
app.put("/api/product/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);

        if(!product) {
            return res.status(404).json({message: "Product not found"});
        }

        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// DELETE API
app.delete("/api/product/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);

        if(!product) {
            return res.status(404).json({message: "Product not found"});
        }

        res.status(200).json({message: "Product deleted successfully"});
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