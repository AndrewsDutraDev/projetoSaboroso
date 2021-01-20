var conn = require('./../inc/db')
var reservations = require('./../inc/reservations')
var express = require('express');
var menus = require('./../inc/menus')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	menus.getMenus().then(results =>{
		res.render('index', { title: 'Restaurante Saboroso!', menus: results, isHome: true });
	})
});

router.post('/', function(req, res, next) {
	res.send(req.body)
});

router.get('/contacts', function(req, res, next) {
	res.render('contact', { title: 'Contato - Restaurante Saboroso!', background: 'images/img_bg_3.jpg', h1: 'Entre em contato' })
});

router.get('/menus', function(req, res, next) {
	menus.getMenus().then(results =>{
		res.render('index', { title: 'Restaurante Saboroso!', background: 'images/img_bg_2.jpg', h1: 'Veja nosso menu', menus: results });
	})
});

router.get('/reservations', function(req, res, next) {
	reservations.render(req, res)
});

router.post('/reservations', function(req, res, next) {
	if (!req.body.name){
		reservations.render(req, res, 'Digite o nome')
	} else if(!req.body.email){
		reservations.render(req, res, 'Digite o email')
	}else if(!req.body.date){
		reservations.render(req, res, 'Digite a data')
	}else if(!req.body.time){
		reservations.render(req, res, 'Digite a hora')
	}else if(!req.body.people){
		reservations.render(req, res, 'Digite a pessoa')
	} else{
		reservations.save(req.body).then(results =>{
			req.body = {}
			reservations.render(req, res, null, 'Reserva realizada com sucesso')
		}).catch(err =>{
			reservations.render(req, res, err.message)
		})
	}
});

router.get('/services', function(req, res, next) {
	res.render('services', { title: 'Serviços - Restaurante Saboroso!', background: 'images/img_bg_2.jpg', h1: 'É um prazer poder servir'  })
});

module.exports = router;
