const express = require('express'); //is this line required?
const router = express.Router();

router.get('/', function(req, res, next){
	res.send('respond with a resource');
});

router.get('/profile', function(req, res, next) {
	res.send(req.user);
});

module.exports = router;