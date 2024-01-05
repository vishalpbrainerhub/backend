const express = require('express');
const router = express.Router();
const vaultController = require('../controllers/vaultController');

router.post('/createvault', vaultController.createVaultAcc);
router.get('/getvault', vaultController.getVaultAcc);
router.post('/createassets', vaultController.createAssets) 

module.exports = router;
