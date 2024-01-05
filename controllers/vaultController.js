const Vault = require('../models/vault');
const FireblocksSDK = require("fireblocks-sdk").FireblocksSDK;
const User = require('../models/user');
const fs = require("fs");
const path = require("path");
require('dotenv').config();

// Secured files
const api_key =   process.env.API_KEY
const apiSecret = fs.readFileSync(path.resolve(__dirname, 'fireblocks_secret.key'), 'utf8');
const baseUrl = process.env.BASE_URL;


const fireblocks = new FireblocksSDK(apiSecret, api_key, baseUrl);

const createVaultAcc = async (req, res) => {
  try {
    const { user_id } = req.body;
    const {name} = req.body;
    const hiddenOnUI = false;
    const {customerRefId} = req.body;
    const autoFueling = false;

    const vaultAccount = await fireblocks.createVaultAccount(name, hiddenOnUI, customerRefId, autoFueling);
    console.log(vaultAccount);
    const newVault = await Vault.create({ name: vaultAccount.name });
    await User.findByIdAndUpdate(
      user_id,
      { vault_id: vaultAccount.id }
    )

    res.status(201).json({ "message": "Vault Account Created Successfully", "data": newVault,"vaultAccount":vaultAccount,"status": "success" });
    
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Bad Request' ,"message":error});
  }
};

const getVaultAcc = async (req, res) => {
  try {
    const vaultAccounts = await Vault.find();
    res.status(200).json({ "message": "Vault Account Created Successfully", "data": vaultAccounts});
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Bad Request' ,"message":error});
  }
}

const createAssets = async (req, res) => {
  try {
    const { vaultAccountId } = req.body;
    const { assetId } = req.body;

    const vaultAsset = await fireblocks.createVaultAsset(vaultAccountId, assetId);
    console.log(vaultAsset);
    
    res.status(200).json({ "message": "Assests created successfully", "data": vaultAsset})
    
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Bad Request' ,"message":error});
  }
}


module.exports ={
    createVaultAcc,
    getVaultAcc,
    createAssets
}

