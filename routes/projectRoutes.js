const express = require('express');
const router = express.Router();
const userController = require('../controllers/projectController');

router.get('/getproject', userController.getAllProjects);
router.post('/createproject', userController.createProjects);

module.exports = router;
