
const credentials = {
    host: 'localhost',
    port: 5435,
    database: 'postgres',
    user: 'todo_dev',
    password: 'todo_dev12'
}
const {Client} = require('pg');
const conn = new Client({credentials})

conn.connect()
    .then(console.log(`Connnected to the database`))
    .catch(err => console.log(`Connection Error to datatbase : `,err))

//Route Handlers
//When we go to a certain route, what happens?
app.get("/", (req, res) => {
    res.send('server running');
})

//CRUD
//READ-------------------------------------------------------------------
app.get("/api/todos",(req, res)=>{
    res.send('api running');
})

//Listener  means ports

app.listen(port, console.log(`Todo app with express on port${port})`) );

module.exports = conn;