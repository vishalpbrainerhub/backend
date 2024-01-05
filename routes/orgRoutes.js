const express = require('express');
const router = express.Router();
const orgController = require('../controllers/orgController');

router.get('/getorgs', orgController.getAllOrgs);
router.post('/createorgs', orgController.createOrgs);

module.exports = router;
