const express = require('express');//Set up the express module
const app = express();
const router = express.Router();
const express = require('express');//Set up the express module
const app = express();
const router = express.Router();
const Database = require("@replit/database")


const db = new Database()
db.set("balance", 0).then(() => { });

//db.get("balance").then(value => {});
