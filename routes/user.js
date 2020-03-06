const express = require('express'); //is this line required?
const router = express.Router();

router.get('/profile', function(req, res, next) {
	res.render('profile', {req: req});
});

module.exports = router;