const express = require('express');
const router = express.Router();

//Bring in the models
var Marabus = require('../models/marabu')



// Add article route
router.get('/add', (req, res) => res.render('add',{
    title: 'Add stuff'
}))

router.post('/add', function(req,res) {
    req.checkBody('title', 'Title muss sein').notEmpty();
    req.checkBody('ort', 'Ort muss sein').notEmpty();
    req.checkBody('message', 'Nachricht muss sein').notEmpty();

    let errors = req.validationErrors();

    if(errors){
	res.render('add',{
	    title:'Add Post',
	    errors:errors
	});
    } else {
	let marabu = new Marabus;
	marabu.title = req.body.title;
	marabu.ort = req.body.ort;
	marabu.message = req.body.message;

	marabu.save(function(err){
	    if (err) {
		console.log(err);
		return;
	    }else{
		req.flash('success', 'Added Post');
		res.redirect('/');
	    }
	});
    }

})

// Update Marabu
router.post('/edit/:id', function(req,res) {
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

router.delete('/:id', function(req, res){
    let query = {_id:req.params.id}

    Marabus.remove(query, function(err){
	if (err) {
	    console.log(err);
	}
	res.send('Success');
    })
})
//Display single post
router.get('/:id', function(req, res){

    Marabus.findById(req.params.id, function(err, post){
	res.render('post', {
	    post:post
	})
    })
})

//Edit single post
router.get('/edit/:id', function(req, res){

    Marabus.findById(req.params.id, function(err, post){
	res.render('edit_post', {
	    title: 'Edit this Post',
	    post: post
	})
    })
})

module.exports = router;
