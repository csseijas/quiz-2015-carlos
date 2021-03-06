var express = require('express');
var router = express.Router();

var quizController = require("../controllers/quiz_controller");
var commentController = require("../controllers/comment_controller");
var sessionController = require("../controllers/session_controller");

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors: [] });
});



router.param('commentId', commentController.load);
router.param('quizId', quizController.load);

router.get('/quizes', sessionController.autoLogout,quizController.index);
router.get('/quizes/:quizId(\\d+)', sessionController.autoLogout,quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', sessionController.autoLogout,quizController.answer);
router.get('/quizes/:quizId(\\d+)/edit',sessionController.autoLogout, sessionController.loginRequired, quizController.edit);
router.get('/quizes/new',sessionController.autoLogout, sessionController.loginRequired, quizController.new);
router.post('/quizes/create', sessionController.loginRequired, quizController.create);
router.put('/quizes/:quizId(\\d+)', sessionController.loginRequired, quizController.update);
router.delete('/quizes/:quizId(\\d+)', sessionController.loginRequired, quizController.destroy);

router.get('/quizes/author', function(req, res) {
  res.render('author', { errors: [] });
});
router.get('/quizes/search', function(req, res) {
  res.render('./quizes/search', { errors: [] });
});

router.get('/quizes/:quizId(\\d+)/comments/new', sessionController.autoLogout,commentController.new);
router.post('/quizes/:quizId(\\d+)/comments', commentController.create);

router.get('/login', sessionController.autoLogout, sessionController.new);
router.post('/login', sessionController.create);
router.get('/logout', sessionController.autoLogout,sessionController.destroy);

router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish', sessionController.loginRequired, commentController.publish);


module.exports = router;


