//Foundation
//Where is all my stuff coming from?
//What do I need to run my server
//
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const logger = require('morgan');
app.use(logger('dev'));

// if deployed do not use the logger
if(!process.env.NODE_ENV || process.env.NODE_ENV === "production") {
    const logger = require('morgan');
    app.use(logger('dev'));
}



app.get("api/todos", (req, res) =>{
let query = `SELECT * FROM todo;`
conn.query(query)
    .then(data => res.send(rows))
    .catch(err => console.log("Error reading data",err))
})


//When working with a databsae you need to know three things
//connection
const conn = require('./pgconnection');
//blueprints
// const credentials ={
//     password:"todo_dev12"
// }
