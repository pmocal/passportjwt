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

router.get('/cookies', function (req, res) {
	console.log(req.cookies.token);
	console.log(req.cookies);
	res.send(req.cookies.token);
});

module.exports = router;