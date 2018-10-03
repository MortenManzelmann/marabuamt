let mongoose = require('mongoose')

// Marabu Schema
let marabuSchema = mongoose.Schema({
	title:{
		type: String,
		required: true,
	},
	ort:{
		type: String
	},
	message:{
		type: String
	}
});

let Marabu = module.exports = mongoose.model('marabu', marabuSchema)
