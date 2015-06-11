var urlencode = require('urlencode');
var models = require('../models/models.js');

exports.load = function(req, res, next, quizId){
	models.Quiz.findById(quizId).then(
		function(quiz){
			if(quiz) {
				req.quiz = quiz;
				next();
			}else{
				next(new Error('No existe quizId=' + quizId));
			}
		}
	).catch(function(error) {next(error);});
	
};



exports.answer = function(req, res) {
	models.Quiz.findById(req.params.quizId).then(function(quiz){
		 if (req.query.respuesta === req.quiz.respuesta){
			res.render('quizes/answer', { quiz:req.quiz, respuesta: "Correcto" });  
		 }else{
			res.render('quizes/answer', { quiz:req.quiz, respuesta: "Incorrecto" });
		 };
	});
};

exports.show = function(req, res) {
	models.Quiz.findById(req.params.quizId).then(function(quiz){
		res.render('quizes/show', { quiz: req.quiz });  
	});
};
  
  
 exports.index = function(req, res) {
		
		if(req.query.buscar){
			var search=urlencode(req.query.buscar);
			models.Quiz.findAll({where: ["pregunta like ?", "%"+urlencode.decode(search)+"%"]}).then(function(quizes){
				res.render('quizes/index.ejs', { quizes: quizes });
			});
		}else{
			models.Quiz.findAll().then(function(quizes){
				res.render('quizes/index.ejs', { quizes: quizes }); 
			});
		};
};