'use strict';

const Router = require('koa-router');

const NotesController = require('../controllers/notes');
const notesController = new NotesController();

const router = new Router();

router.get('/', notesController.list);
router.get('/:id', notesController.get);
router.post('/', notesController.create);
router.put('/:id', notesController.update);
router.delete('/:id', notesController.delete);

module.exports = router.routes();