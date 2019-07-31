const express = require('express');
const router = express.Router();

const clienteController = require('../controllers/clienteController');

router.get('/', clienteController.list);
router.post('/add', clienteController.save);
router.get('/delete/:id', clienteController.delete);

router.get('/update/:id', clienteController.edit);
router.post('/update/:id', clienteController.update);

module.exports = router;

