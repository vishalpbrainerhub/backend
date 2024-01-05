const mongoose = require('mongoose');

const vaultSchema = new mongoose.Schema({
  name: { type: String, required: true,unique: true},
  
}, { versionKey: false });

const Vault = mongoose.model('Vault', vaultSchema);

module.exports = Vault;

