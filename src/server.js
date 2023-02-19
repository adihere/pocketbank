// express nodejs way

const express = require('express');//Set up the express module
const app = express()
const port = 3000
const Database = require("@replit/database")
const db = new Database()


// keep alive  - works with http - express?
//var KeepAliveAgent = require('keep-alive-agent');
//let agent = new KeepAliveAgent();

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


app.put('/add', (req, res) => {
  let balance = await db.get("balance");
  balance += req.body.addval;
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
