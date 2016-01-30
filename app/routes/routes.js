var Project =     require('../models/project');
var Thread =      require('../models/thread');
var Material =    require('../models/material');
var Comment =     require('../models/comment');
var Area =        require('../models/area');
var User =        require('../models/user');
var Pregunta =    require('../models/pregunta');
var Quiz =        require('../models/quiz');
var Message =     require('../models/message');
var jwt =         require('jsonwebtoken');
var config =      require('../../config');
var superSecret = config.secret;


module.exports = function(app, express) {

var apiRouter = express.Router();

apiRouter.post('/authenticate', function(req, res) {

	console.log(app);
	User.findOne({
		username: req.body.username
	}).select('password').exec(function(err, user) {

		if (err) throw err;

		if(!user) {
			res.json({
				success: false,
				message: 'Authentication failed. User not found'
			});
		} else if (user) {
			var validPassword = user.comparePassword(req.body.password);
			if(!validPassword) {
				res.json({
					success: false,
					message: 'Authentication failed. Wrong password'
				});
			} else {
				var token = jwt.sign(user, superSecret, {
					expiresInMinutes: 1440
				});
				res.json({
					success: true,
					message: 'Here is your token',
					token: token
				});
			}
		}

	});
});

apiRouter.use(function(req, res, next) {

	var token = req.body.token || req.query.token || req.headers['x-access-token'];

	if(token) {

		jwt.verify(token, superSecret, function(err, decoded) {
			if (err) {
				return res.status(403).send({
					success: false,
					message: 'Autenticación de token fallida'
				});
			} else {
				req.decoded = decoded;
				next();
			}
		});
	} else {
		// return res.status(403).send({
		// 	success: false,
		// 	menssage: 'Token no enviado'
		// });
		next();
	}

});

apiRouter.use(function(req, res, next) {

	admin = true;

	// User.findOne({
	// 	_id: req.decoded._id
	// }).exec(function(err, user) {
	//
	// 	if (user.admin === true) {
	// 		admin = true;
	// 		next();
	// 	} else {
	// 		next();
	// 	}
	//
	// });

	next();

});

apiRouter.route('/materiales')

	.get(function(req, res) {

		Material.find(function(err, materials) {

			if (err) res.send(err);

			res.json(materials);

		});

	})

	.post(function(req, res) {

			var material = new Material();
			material.name =         req.body.name;
			material.title =        req.body.title;
			material.content =      req.body.content;
			material.rewardPoints = req.body.rewardPoints;
			material.area =         req.body.area;

			material.save(function(err) {
				if (err) res.send(err);
				res.json({ message: 'Material creado!' });
         });

	});

apiRouter.route('/materiales/:material_id')

	.get(function(req, res) {

		Material.findById(req.params.material_id, function(err, material) {

			if (err) res.send(err);

			res.json(material);
		});

	})

	.put(function(req, res) {

		if (admin) {

			Material.findById(req.params.material_id, function(err, material) {

				if (err) res.send(err);

				if(req.body.name) material.name = req.body.name;
				if(req.body.title) material.title = req.body.title;
				if(req.body.content) material.content = req.body.content;
				if(req.body.rewardPoints) material.rewardPoints = req.body.rewardPoints;
				if(req.body.area) material.area = req.body.area;
				if(req.body.allTimeViews) material.allTimeViews = req.body.allTimeViews;
				if(req.body.monthViews) material.monthViews = req.body.monthViews;

				material.save(function(err) {

					if(err) res.send(err);

					res.json({ message: 'Material actualizado!' });
				});

			});
		} else {
			return res.status(403).send({
				success: false,
				menssage: 'Not admin'
			});
		}
	})

	.delete(function(req, res) {

		if (admin) {

			Material.remove({

			_id: req.params.material_id

		}, function(err, user) {
			if (err) res.send(err);
			res.json({ message: 'Successfully deleted' });

          });
		} else {
			return res.status(403).send({
				success: false,
				menssage: 'Not admin'
			});
		}
	});

apiRouter.route('/materiales/area/:area_id')

	.get(function(req, res) {

		Material.find({
			area: req.params.area_id
		}).exec(function(err, materials) {

			if (err) res.send(err);

			res.json(materials);
		});

	});

apiRouter.route('/proyectos')

	.get(function(req, res) {

		Project.find().populate('_creator _comments').exec(function(err, projects){
			if (err) res.send(err);
			res.json(projects);
		});
	})

	.post(function(req, res) {

		var project = new Project();

		project.name = req.body.name;
		project.summary = req.body.summary;
		project.fullProject = req.body.fullProject;
		project.pictures = req.body.pictures;
		project._creator = req.decoded._id;

		project.save(function(err) {

			if (err) res.send(err);

			User.findById(req.decoded._id, function(err, user) {

				console.log(project._id);

				user._sentProjects.push(project._id);

				user.save(function(err) {
					if (err) res.send(err);
				});
			});

			res.json({ message: 'Proyecto creado'});
		});

	});

apiRouter.route('/proyectos/:project_id')

	.get(function(req, res) {

		Project.findById(req.params.project_id).populate('_creator _comments').exec(function(err, project) {

			if (err) res.send(err);

			res.json(project);

		});

	})

	.put(function(req, res) {

		if (admin) {

			Project.findById(req.params.project_id, function(err, project) {

				if (req.body.like) project.likes += parseInt(req.body.like, 10);

				project.save(function(err) {
					if (err) res.send(err);
					res.json({message: 'Projecto actualizado'});
				});

			});
		} else {
			return res.status(403).send({
				success: false,
				menssage: 'Not admin'
			});
		}
	})

	.delete(function(req, res) {

		if (admin) {

			Project.remove({

			_id: req.params.project_id

			}, function(err, user) {
				if (err) res.send(err);
				res.json({ message: 'Successfully deleted' });

			});

		} else {
			return res.status(403).send({
				success: false,
				menssage: 'Not admin'
			});
		}

	});

apiRouter.route('/hilos')

	.get(function(req, res) {

		Thread.find().populate('_creator _comments').exec(function(err, threads){
			if (err) res.send(err);
			res.json(threads);
		});
	})

	.post(function(req, res) {

		var thread = new Thread();

		thread.title = req.body.title;
		thread.content = req.body.content;
		thread._creator = req.decoded._id;

		thread.save(function(err) {

			if (err) res.send(err);

			User.findById(req.decoded._id, function(err, user) {
				user._sentThreads.push(thread._id);

				user.save(function(err) {
					if (err) res.send(err);
				});
			});

			res.json({ message: 'Hilo creado!'});

		});

	});

apiRouter.route('/hilos/:thread_id')

	.get(function(req, res) {

		Thread.findById(req.params.thread_id).populate('_comments _creator').exec(function(err, thread){
			if (err) res.send(err);
			res.json(thread);
		});
	})

	.put(function(req, res) {

		if(admin) {

			Thread.findById(req.params.thread_id, function(err, thread) {
				if (err) res.send(err);

				if (req.body.title) thread.title = req.body.title;
				if (req.body.content) thread.content = req.body.content;
				if (req.decoded._id) thread.creator = req.decoded._id;
				if (req.body.likes) thread.likes += parseInt(req.body.likes);

				thread.save(function(err) {
					if (err) res.send(err);
					res.json({ message: 'Hilo creado!'});

				});

			});

		} else {
			return res.status(403).send({
				success: false,
				menssage: 'Not admin'
			});
		}


	})

	.delete(function(req, res) {

		if (admin) {

			Thread.remove({

				_id: req.params.thread_id

			}, function(err, user) {
				if (err) res.send(err);
				res.json({ message: 'Successfully deleted' });

			});

		} else {
			return res.status(403).send({
				success: false,
				menssage: 'Not admin'
			});
		}

	});

apiRouter.route('/hilos/:thread_id/comentarios')

	.post(function(req, res) {


		Thread.findById(req.params.thread_id, function(err, thread) {

			var comment = new Comment();

			comment.comment = req.body.comment;
			comment._creator = req.decoded._id;

			comment.save(function(err) {

				User.findById(req.decoded._id, function(err, user){
					user._sentComments.push(comment._id);

					user.save(function(err) {
						if (err) res.send(err);
					});
				});
			});

			thread._comments.push(comment);

			thread.save(function(err) {
				if (err) res.send(err);

				res.json({message: 'Comentario guardado'});

			});

		});

	});

apiRouter.route('/proyectos/:proyecto_id/comentarios')

	.post(function(req, res) {


		Project.findById(req.params.proyecto_id, function(err, project) {

			var comment = new Comment();

			comment.comment = req.body.comment;
			comment._creator = req.decoded._id;

			comment.save(function(err) {
				User.findById(req.decoded._id, function(err, user){
					user._sentComments.push(comment._id);

					user.save(function(err) {
						if (err) res.send(err);
					});
				});
			});

			project._comments.push(comment);

			project.save(function(err) {
				if (err) res.send(err);

				res.json({message: 'Comentario guardado'});

			});

		});

	});

apiRouter.route('/me')

	.get(function(req, res) {

		User.findById(req.decoded._id).populate('_sentProjects _sentThreads _sentComments').exec(function(err, user) {

			if (err) res.send(err);

			res.json(user);
		});

	})

	.put(function(req, res) {

		User.findById(req.params.user_id, function(err, user) {

			if(err) res.send(err);

			if (user._id === req.decoded._id) {

				if (req.body.name) user.name = req.body.name;
				if (req.body.lastName) user.lastName = req.body.lastName;
				if (req.body.area) user.area = req.body.area;
				if (req.body.profilePic) user.profilePic = req.body.profilePic;
				if (req.body.username) user.username = req.body.username;
				if (req.body.password) user.password = req.body.password;

				user.save(function(err) {

					if(err) res.send(err);

					res.json({ message: 'Usuario actualizado!' });
				});

			} else {
				res.json({message: 'Not you!'});
			}

		});

	});

apiRouter.route('/comentarios')

	.get(function(req, res){
		Comment.find().populate('_creator').exec(function(err, comments) {

			res.json(comments);
		});
	});


apiRouter.route('/comentarios/:comment_id')


	.delete(function(req, res){

		if(admin) {

			Comment.remove({

				_id: req.params.comment_id

			}, function(err, user) {
				if (err) res.send(err);
				res.json({ message: 'Successfully deleted' });

			});

		} else {
			return res.status(403).send({
				success: false,
				menssage: 'Not admin'
			});
		}

	});


apiRouter.route('/areas')

	.get(function(req, res) {

		if (admin) {

			Area.find(function(err, areas) {

				if (err) res.send(err);

				res.json(areas);
			});

		} else {
			return res.status(403).send({
				success: false,
				menssage: 'Not admin'
			});
		}
	})

	.post(function(req, res) {

		if (admin) {

			var area = new Area();

			area.name = req.body.name;

			area.save(function(err) {
				if (err) res.send(err);
				res.json({ message: 'Area creada'});
			});

		} else {
			res.json({code: '401'});
		}

	});

apiRouter.route('/areas/:area_id')

	.get(function(req, res){

		if (admin) {
			Area.findById(req.params.area_id, function(err, area) {
				if (err) res.send(err);
				res.json(area);
			});
		} else {
			return res.status(403).send({
				success: false,
				menssage: 'Not admin'
			});
		}

	})

	.put(function(req, res) {

		if(admin) {
			Area.findById(req.params.area_id, function(err, area) {

				if(req.body.name) area.name = req.body.name;

				area.save(function(err) {
					if (err) res.send(err);
					res.json({message: 'Area actualizada'});
				});

			});
		} else {
			return res.status(403).send({
				success: false,
				menssage: 'Not admin'
			});
		}

	})

	.delete(function(req, res) {

		if (admin) {

			Area.remove({

				_id: req.params.area_id

			}, function(err, user) {
				if (err) res.send(err);
				res.json({ message: 'Successfully deleted' });

			});
		} else {
			return res.status(403).send({
				success: false,
				menssage: 'Not admin'
			});
		}
	});

apiRouter.route('/users')

	.get(function(req, res) {

		if (admin) {

			User.find().populate('_sentProjects _sentThreads _sentComments').exec(function(err, users) {

				if (err) res.send(err);

				res.json(users);

			});
		} else {
			return res.status(403).send({
				success: false,
				menssage: 'Not admin'
			});
		}
	})

	.post(function(req, res) {

		if (admin) {

			var user = new User();

			user.name = req.body.name;
			user.lastName = req.body.lastName;
			user.area = req.body.area;
			user.profilePic = req.body.profilePic;
			user.username = req.body.username;
			user.password = req.body.password;
			user.admin    = req.body.admin;
			user.client   = req.body.client;
			user.email   = req.body.email;

			user.save(function(err) {
				if (err) res.send(err);
				res.json({ message: 'User created' });
			});

		} else {
			return res.status(403).send({
				success: false,
				menssage: 'Not admin'
			});
		}

	});

apiRouter.route('/users/:user_id')

	.get(function(req, res) {


		if (admin) {
			User.findById(req.params.user_id).populate('_sentProjects _sentThreads _sentComments').exec(function(err, user) {

				if (err) res.send(err);

				res.json(user);
			});

		} else {
			return res.status(403).send({
				success: false,
				menssage: 'Not admin'
			});
		}


	})

	.put(function(req, res) {

		if(admin) {

			User.findById(req.params.user_id, function(err, user) {

				if(err) res.send(err);

				if (req.body.name) user.name = req.body.name;
				if (req.body.lastName) user.lastName = req.body.lastName;
				if (req.body.area) user.area = req.body.area;
				if (req.body.profilePic) user.profilePic = req.body.profilePic;
				if (req.body.username) user.username = req.body.username;
				if (req.body.password) user.password = req.body.password;
				if (req.body.admin) user.admin = req.body.admin;
				if (req.body.client) user.client = req.body.client;
				if (req.body.points) user.points += parseInt(req.body.points, 10);
				if (req.body.email) user.email = req.body.email;

				user.save(function(err) {

					if(err) res.send(err);

					res.json({ message: 'Usuario actualizado!' });
				});

			});
		} else {
			return res.status(403).send({
				success: false,
				menssage: 'Not admin'
			});
		}

	})

	.delete(function(req, res) {

		if (admin) {

		User.remove({

			_id: req.params.user_id

		}, function(err, user) {
			if (err) res.send(err);
			res.json({ message: 'Successfully deleted' });

          });
		} else {
			return res.status(403).send({
				success: false,
				menssage: 'Not admin'
			});
		}
	});

apiRouter.route('/materiales/:material_id/quiz')

	.get(function(req, res) {

			Quiz.findOne({
				_parentMaterial: req.params.material_id
			}).populate('_questions _parentMaterial').exec(function(err, quiz) {
				if(err) res.send(err);

				res.json(quiz);
			});

	})

	.post(function(req, res) {

		if(admin) {

			var quiz = new Quiz();

			quiz.name = req.body.name;
			quiz.points = req.body.points;

			quiz._parentMaterial = req.params.material_id;
			quiz.save(function(err) {

				Material.findById(req.params.material_id, function(err, material) {

					material._quiz = quiz._id;

					material.save(function(err) {
						if (err) res.send(err);
					});

				});

				if (err) res.send(err);

				res.json({
					message: 'quiz creado'
				});
			});

		} else {

			return res.status(403).send({
				success: false,
				menssage: 'Not admin'
			});
		}

	});

apiRouter.route('/materiales/:material_id/quiz/:quiz_id')

	.get(function(req, res) {

		Quiz.findById(req.params.quiz_id).populate('_parentMaterial _questions').exec(function(err, quiz) {
			if (err) res.send(err);
			res.json(quiz);
		});

	})

	.put(function(req, res) {

		if(admin) {

			Quiz.findById(req.params.quiz_id, function(err, quiz) {

				if (req.body.name) quiz.name = req.body.name;
				if (req.body.points) quiz.points = req.body.points;

				quiz.save(function(err) {
					if (err) res.send(err);
					res.json({message: 'Updated'});
				});

			});
		} else {

			return res.status(403).send({
				success: false,
				message: 'Not admin'
			});
		}

	})

	.delete(function(req, res) {

		if (admin) {
			quiz.remove({

				_id: req.params.quiz_id

			}, function(err, quiz) {
				if (err) res.send(err);
				res.json({ message: 'Successfully deleted' });

			});
		} else {

			return res.status(403).send({
				success: false,
				message: 'Not admin'
			});
		}

	});

apiRouter.route('/materiales/:material_id/quiz/:quiz_id/preguntas')

	.get(function(req, res){

		Pregunta.find({
			_parentquiz: req.params.quiz_id
		}).populate('_parentquiz ').exec(function(err, preguntas) {
			if (err) res.send(err);
			res.json(preguntas);
		});

	})

	.post(function(req, res) {

		if (admin) {

			var pregunta = new Pregunta();

			pregunta.question = req.body.question;
			pregunta.correct = req.body.correct;
			pregunta._parentquiz = req.params.quiz_id;

			pregunta.save(function(err){

				Quiz.findById(req.params.quiz_id, function(err, quiz){

					quiz._questions.push(pregunta._id);

					quiz.save(function(err){
						if(err) res.send(err);
					});

				});

				if (err) res.send(err);
				res.json({message: 'Created'});
			});

		} else {

			return res.status(403).send({
				success: false,
				message: 'Not admin'
			});
		}

	});

apiRouter.route('/materiales/:material_id/quiz/:quiz_id/preguntas/:pregunta_id')

	.get(function(req, res) {

		Pregunta.findById(req.params.pregunta_id).populate('_parentquiz').exec(function(err, pregunta){
			if (err) res.send(err);
			res.json(pregunta);
		});

	})

	.put(function(req, res) {

		if(admin) {

			Pregunta.findById(req.params.pregunta_id, function(err, pregunta){

				if(req.body.question) pregunta.question = req.body.question;
				if(req.body.correct) pregunta.correct = req.body.correct;

				pregunta.save(function(err){
					if(err) res.send(err);
					res.json({message: 'Actualizada'});
				});

			});

		} else {

			return res.status(403).send({
				success: false,
				message: 'Not admin'
			});

		}

	})

	.delete(function(req, res) {

		if(admin) {

			Pregunta.remove({
				_id: req.params.pregunta_id
			}, function(err, pregunta) {
				if(err) res.send(err);
				res.json({message:'Borrada'});
			});

		} else {

			return res.status(403).send({
				success: false,
				message: 'Not admin'
			});


		}

	});

apiRouter.get('/me', function(req, res) {
	res.send(req.decoded);
});

apiRouter.route('/mensajes/')

	.get(function(req, res) {

		if(admin) {

			Message.find(function(err, messages) {

				if (err) res.send(err);

				res.json(messages);

			});

		} else {

			return res.status(403).send({
				success: false,
				message: 'Not admin'
			});

		}

	})

	.post(function(req, res) {

		if (admin) {

			var message = new Message();

			message.message = req.body.message;
			message.visible = req.body.visible;

			message.save(function(err) {

				if(err) res.send(err);

				res.json({
					succes:true,
					message: 'Message created'
				});
			});

		} else {

			return res.status(403).send({
				success: false,
				message: 'Not admin'
			});

		}

	});

apiRouter.route('/mensajes/:message_id')

	.get(function(req, res) {

		if (admin) {

			Message.findById(req.params.message_id, function(err, message) {

				if (err) res.send(err);

				res.json(message);

			});

		} else {

			return res.status(403).send({
				succes: false,
				message: 'Not admin'
			});
		}

	})

	.put(function(req, res) {

		if(admin) {

			Message.findById(req.params.message_id, function(err, message) {

				if(req.body.message) message.message = req.body.message;
				if (req.body.visible) message.visible = req.body.visible;

				message.save(function(err) {
					if (err) res.send(err);

					res.json({
						success: true,
						message: 'Message updated'
					});
				});

			});

		} else {

			return res.status(403).send({
				succes: false,
				message: 'Not admin'
			});

		}

	})

	.delete(function(req, res) {

		if (admin) {


			Message.remove({
				_id: req.params.message_id
			}, function(err) {

				if(err) res.send(err);

				res.json({
					message:'Message deleted'
				});
			});

		} else {

			return res.status(403).send({
				succes: false,
				message: 'Not admin'
			});

		}

	});

return apiRouter;

};
