const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');

// Connect to DB
mongoose.connect('mongodb://172.21.0.2/node_marabuamt')
.catch(err => {
    console.log(err)
})

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

// Express middleware for session
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}))

//express middleware for messages
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// Express Validator Middleware
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));
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

let posts = require('./routes/posts');
app.use('/posts', posts)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
