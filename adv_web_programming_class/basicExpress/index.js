// Foundation
// import in Node is 'require'
const express = require("express")
const app = express() 
// console.log(process)
//if hosting site else use 3000
const port = process.env.PORT || 3000

//Route Handles
//params( 1. will always be a verb for the client, 2. will be expected response to client from the server)
app.get("/",(req, res)=>{
    // res.end("I am from the backend!!!")
    res.redirect("/home")

})

app.get("/home",(req,res)=>{
    res.send("Iam the redirect")
})

//Listens
app.listen(port, console.log(`Basic Server app runnning on port ${port}`))