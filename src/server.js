// express nodejs way
const express = require('express');//Set up the express module
const app = express()
const port = 3000
const Database = require("@replit/database")
const db = new Database()

// ADD CORS 
var cors = require('cors');
app.use(cors());

// keep alive  - express
var server = app.listen(port+1);
server.keepAliveTimeout = 30000;


app.get('/', (req, res) => {
  res.send('Pocket Money - Bank of AV!')
})


app.get('/bal', async (req, res) => {
  //db.get("balance").then(value => { const balance = value; });
  //await db.set("balance", 10);
  let balance = await db.get("balance");
  res.send('Hello Balance!' + balance);
})


app.put('/setbal', (req, res) => {
  res.send('Got a PUT request at /setbal');
  db.set("balance", 100).then(() => { });
})


app.put('/add10', async (req, res) => {
  let balance = await db.get("balance");
  balance += 10;
  res.send('Before execution of PUT request at /add' + balance)
  await db.set("balance", balance);
  res.send('After PUT request at /add' + balance)
})

app.put('/sub', (req, res) => {
  res.send('Got a PUT request at /sub')
})



app.listen(port, () => {
   
  console.log(`Example app listening on port ${port}`)
})
