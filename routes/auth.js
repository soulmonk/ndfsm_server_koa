'use strict';

const Router = require('koa-router');
const router = new Router();

const authController = require('../controllers/auth');

router.post('/login', authController.login, authController.generateToken, authController.respond);
router.get('/validate', authController.me);
router.post('/logout', authController.logout);

module.exports = router.routes();
