const express = require('express')
const path = require('path')
//Init app
const app = express()
const port = 3000

//Load view engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// Home route
app.get('/', function(req, res) {
	var marabus = [{
		id:1,
		name:'klaus',
		ort:'Gehege'
		},{
		id:2,
		name:'klaus',
		ort:'Gehege'
		},{
		id:3,
		name:'klaus',
		ort:'Gehege'
		}
	]
	res.render('index',{
	title: 'Marabuamt yeah',
	marabus: marabus
})})

// Add article route
app.get('/add', (req, res) => res.render('add',{
	title: 'Add stuff'
}))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
