const express = require('express');
const router = express.Router();
const User = require('./../models/user');

router.get('/', function (req, res) {
	res.render('index');
});

router.get('/signup', function (req, res) {
	res.render('sign_up');
});

router.post('/signup', function (req, res) {
	var user = new User({
		email: req.body.email,
		password: req.body.password
	});
	user.save();
	res.redirect('/');
});

module.exports = router;