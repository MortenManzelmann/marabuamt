const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
var bodyParser = require('body-parser')

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


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// Assets folder
app.use(express.static(path.join(__dirname, 'public')));

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

//Display single post
app.get('/post/:id', function(req, res){

	Marabus.findById(req.params.id, function(err, post){
		res.render('post', {
			post:post
		})
	})
})

//Edit single post
app.get('/post/edit/:id', function(req, res){

	Marabus.findById(req.params.id, function(err, post){
		res.render('edit_post', {
			title: 'Edit this Post',
			post: post
		})
	})
})

// Add article route
app.get('/add', (req, res) => res.render('add',{
	title: 'Add stuff'
}))

app.post('/add', function(req,res) {
	let marabu = new Marabus;
	marabu.title = req.body.title;
	marabu.ort = req.body.ort;
	marabu.message = req.body.message;

	marabu.save(function(err){
		if (err) {
			console.log(err);
			return;
		}else{
			res.redirect('/');
		}
	});
})

// Update Marabu
app.post('/post/edit/:id', function(req,res) {
	let marabu = {};
	marabu.title = req.body.title;
	marabu.ort = req.body.ort;
	marabu.message = req.body.message;

	let query = {_id:req.params.id}
	Marabus.update(query, marabu, function(err){
		if (err) {
			console.log(err);
			return;
		}else{
			res.redirect('/');
		}
	});
})

app.delete('/post/:id', function(req, res){
	let query = {_id:req.params.id}

	Marabus.remove(query, function(err){
		if (err) {
			console.log(err);
		}
		res.send('Success');
	})
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
