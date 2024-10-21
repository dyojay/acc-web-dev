// FOundation
const express =require("express")
const app = express()
const port = process.env.PORT || 3000;
const data = require("./fakeData.json" )
let newId= 3;

//####################################################
// built in body-parser
app.use(express.json())
//if url-encoded
app.use(express.urlencoded({extended:true}));
 //####################################################


//   ROUTE  handlers
app.get("/", (req, res) =>{
    res.redirect("/api/items");
});


// 
// Read
// Route-/ api/items, GET method
app.get("/api/items",(req, res)=>{

 // Get data from db
// using JSON 
// We want all data to comebback EVERYTHING  back
// We will send it back in an array objects
res.send(data);

});

// Create-/ api/items, POST method 
app.post("/api/items",(req,res)=>{

    // Get data from client
    // db sends something back
    // json -> client    
    let newItems ={
        id:++newId,
        descriptio:"Clean My Room",
        // description:req.body.descritpion,
        is_complete:false
    };
    let items = [...data, newId]
    // send back one thing( which is what was done witht the db)
    // -  The object sent back wil be data / receipt from db 
    res.json(items);
})
    //Listener
app.listen(port, console.log(`Bucket List server port ${port}`));