const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJWT;

passport.use(
	new LocalStrategy(
		{
			usernameField: 'email',
			passwordField: 'password'
		},
		function (email, password, cb) {
			return UserModel.findOne({email, password})
				.then(user => {
					if (!user) {
						return cb(null, user, { message: 'Incorrect email or password.' });
					}
					return cb(null, user, {message: 'Logged In Successfully'});
				})
				.catch(err => cb(err));
	}
));

passport.use(
	new JWTStrategy({
		jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
		secretOrKey : 'your_jwt_secret'
	},
	function (jwtPayload, cb) {
		//find user in db if needed
		//functionality can be omitted if everything needed
		//is stored in JWT payload
		return UserModel.findOneById(jwtPayload.id)
			.then(user => {
				return cb(null, user);
			})
			.catch(err => {
				return cb(err);
			});
	}
));