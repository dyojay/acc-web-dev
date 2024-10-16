// foundation
//import
const express = require("express");
const app = express();
app.use(express.json());

// let fname= "Devante"
// let money= "$20,000"
const port = process.env.port || 3000

app.get( "/", (req,res)=>{
    res.redirect("/home")
})

app.get("/home",(req,res)=>{
    res.send("I am the home redirect")
})

app.get("/about",(req,res)=>{
res.send("I am the about ")

})

app.get("/contact",(req,res)=>{
    res.send("I am the contact ")
})

app.get("/name/:fname/bank/:money", (req, res) => {
    const { fname, money } = req.params;
    console.log(req.params);
    
    res.send(
        ? isNaN(money))res.send("Nope")
        : (`My name is ${fname} and I have $${money}`);
    });
app.get("/fruit/:doggy",(req,res)=>{
    console.log(req.params.doggy)
    res.end(`I am the ${req.params.doggy}`)
}) 
// route handler
//name<name> / bank <money>
app.get("*",(req,res)=>{
    res.send(" No Matching Route! ")
})
app.listen(port, console.log(`Basic Server app ${port}`));