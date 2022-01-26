const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mysql = require('mysql');

require('dotenv').config();

const app = express();
const port = 5000;

// Parsing middleware
//parse application

app.use(bodyParser.urlencoded({extended : false}));

//parse json
app.use(bodyParser.json());

//static files
app.use(express.static('public'));

//Templating engine
app.engine('hbs',exphbs({extname: '.hbs'}));
app.set('view engine', 'hbs');

///Connection pool
const pool = mysql.createPool({
    connectionLimit : 100,
    host: 'localhost',
    user: 'root',
//    password: process.env["DB_PASS"],
    database: 'skriptjezici'
});
///db connect
pool.getConnection((err,connection)=>{
    if(err) throw err; //not connected
    console.log('connected as ID ' + connection.threadId);
})

const routes = require('./serv/routes/user');
app.use('/',routes);


app.listen(port,()=> console.log(`Listening on port ${port}`));