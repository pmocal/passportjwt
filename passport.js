const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const UserModel = require('./models/user');

passport.use(
	new LocalStrategy(
		{
			usernameField: 'email',
			passwordField: 'password'
		},
		function (email, password, cb) {
			console.log(email);
			console.log(password);
			return UserModel.findOne({email, password})
				.then(user => {
					if (!user) {
						return cb(null, false, { message: 'Incorrect email or password.' });
					}
					console.log(user);
					return cb(null, user, {message: 'Logged In Successfully'});
				})
				.catch(err => {
					console.log(err);
					cb(err);
				});
		}
));

passport.use(
	new JWTStrategy({
		jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
		secretOrKey : 'your_jwt_secret'
	},
	function (jwtPayload, cb) {
		console.log(jwtPayload);
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
