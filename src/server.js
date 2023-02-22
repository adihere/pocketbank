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
var server = app.listen(port + 1);
server.keepAliveTimeout = 30000;

const balanceURL = 'https://pocketbank.adityavadaganadam.repl.co/bal';

app.get('/', async (req, res) => {
  let balance = await db.get("balance");
  let respmsg = 'Pocket Money - Bank of AV';
  
  if (typeof balance === undefined || balance == null) {
    respmsg += ' - Your bank balance is empty, add some money!';  
  } else {
      respmsg += ' your balance is ' + balance;    
  }
  
  res.send( respmsg);
})


// subs from balance  - custom amount
app.put('/spent', async (req, res) => {

  var respmsg ='default';
  var spent = 0;
  
  if ( req === null || req === undefined || req.body === undefined || req.body === null  ) {
     respmsg = 'request is null or undefined';
     process.exit(4);
  }
  else {    
    spent = parseInt(req.body.amount);
    respmsg = 'Request is present and amount is ' + spent;    
  }
  
  res.send('From server - PUT request to add:' + spent);
  let balance = await db.get("balance");
  //balancenum = parseInt(balance);
  if (isNaN(balance)) { return 0; }
  
  console.log('change by' + spent);
  balance = balance - spent;
  await db.set("balance", balance);

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

// adds 10 to balance - hard coded
app.put('/add10', async (req, res) => {
  let balance = await db.get("balance");
  balance += 10;
  res.send('Before execution of PUT request at /add' + balance)
  await db.set("balance", balance);
  res.send('After PUT request at /add' + balance)
})

// subs 10 to balance - hard coded
app.put('/sub10', async (req, res) => {
  res.send('Got a PUT request at /sub');
  let balance = await db.get("balance");
  balance -= 10;
  await db.set("balance", balance);

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
