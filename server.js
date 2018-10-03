const express = require('express')
const path = require('path')
const mongoose = require('mongoose')

// Connect to DB
mongoose.connect('mongodb://localhost/node_marabuamt')
var db = mongoose.connection

//Check connection
db.once('open', function(){
	console.log('connected to MongoDB');
})

//Check for DB errors
db.on('error',function(err){
	console.log(err);
})
//Init app
const app = express()
const port = 3000

//Bring in the models
var Marabus = require('./models/marabu')
//Load view engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// Home route
app.get('/', function(req, res) {
	Marabus.find({}, function(err, marabus){
		if(err){
			console.log('err');
		}else{
			res.render('index',{
			title: 'Marabuamt yeah',
			marabus: marabus
			})
		}
	})
})

// Add article route
app.get('/add', (req, res) => res.render('add',{
	title: 'Add stuff'
}))

app.post('/add', function(req,res) {
	console.log('Abgeschickt');
	return;
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
