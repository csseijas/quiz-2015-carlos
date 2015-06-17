exports.new = function(req, res){
	var errors = req.session.errors || {};
	req.session.errors = {};
	res.render('sessions/new', {errors:errors});
};

exports.loginRequired = function(req, res, next){
	if (req.session.user){
		next();
	}else{
		res.redirect('/login');
	}
}


exports.create = function(req, res){
		var login = req.body.login;
		var password = req.body.password;
		var time = new Date();
		var timeLogin = time.getTime();
		var userController = require('./user_controller');
		userController.autenticar(login,password,function(error,user){
			if(error){
				req.session.errors= [{"message": 'Se ha producido un error: '+error}];
				res.redirect("/login");
				return;	
			}else{
			
			req.session.user = {id:user.id, username:user.username, timeLogin: timeLogin};
			console.log(req.session.redir.toString());
			console.log(req.session.user);
			res.redirect(req.session.redir.toString());
			//redireccion a path anterior a login
			}
			
		});
};

exports.destroy = function(req, res){
	console.log(req.session.user);
	delete req.session.user;
	console.log(req.session.user);
	console.log(req.session.redir.toString());
	res.redirect("/");
}

exports.autoLogout = function(req, res, next){
	var logDate = new Date();
	var date = logDate.getTime();
	if(!req.session.user){
		next();
	}else{
		var difference = date - req.session.user.timeLogin;
		console.log(difference);
		req.session.user.timeLogin=date;
		if(difference<120000){
			next();
		}else{
			delete req.session.user;
			res.redirect('/');
		}
	}
};
