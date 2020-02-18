const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');

router.post('/login', function (req, res, next) {
	passport.authenticate('local', {session: false},
		(err, user, info) => {
			if (err || !user) {
				return res.status(400).json({
					message: err,
					user : user
				})
			}

			req.login(user, {session: false}, (err) => {

				if (err) {
					next(err);
				}

				// generate signed json web token with
				// contents of user object and
				// return it in the response

				const token = jwt.sign(user.toJSON(), 'your_jwt_secret');
				return res.json({ user, token });
			});
		}
	)(req, res);
});

module.exports = router;