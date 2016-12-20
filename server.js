/*
reference: https://zellwk.com/blog/crud-express-mongodb/

https://mlab.com/login/

username: sqdusername
password: sqd123



*/
const express = require('express');
const bodyParser= require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;

app.set('view engine', 'ejs');

var db;
var connStr1 = 'mongodb://sqddatabaseusername:sqddatabasepassword@ds129018.mlab.com:29018/sqddatabasename';
var connStr2 = 'mongodb://seatingplandatabaseusername:sqd123@ds139278.mlab.com:39278/seatingplandatabase';
MongoClient.connect(connStr2, (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
  //res.sendFile(__dirname + '/index.html')
  db.collection('quotes').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('index.ejs', {quotes: result})
  })
})

app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
})

app.get('/counters', (req, res) => {
  //res.sendFile(__dirname + '/index.html')
  db.collection('counters').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    console.log(result)
    res.render('counters.ejs')
  })
})

app.post('/counters', (req, res) => {
  db.collection('counters').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
})

app.get('/app', (req, res) => {
    res.render('seatingPlans.ejs')
})

app.post('/seatingPlans', (req, res) => {
  db.collection('SeatingPlans').save(req.body, (err, result) => {
    if (err) return console.log(err)

    res.send(JSON.stringify({ success: true }));
  })
})

app.get('/seatingPlans', (req, res) => {
  db.collection('SeatingPlans').find().toArray((err, result) => {
    if (err) return console.log(err)
 
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(result));
  })
})

app.put('/seatingPlans', (req, res) => {
  db.collection('SeatingPlans').update(
	  {
		  id: req.id
	  },
	  {
		  id: req.id,
		  table: req.table
	  },
	  { upsert: true }
  );
  res.send(JSON.stringify({ success: true }));
})

app.delete('/seatingPlans', (req, res) => {
  db.collection('SeatingPlans').remove(
	  {
		  id: req.id
	  },
	  { justOne: true }
  );
  res.send(JSON.stringify({ success: true }));
})