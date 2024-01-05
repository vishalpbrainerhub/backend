const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  vault_id: { type: String, required: true},
  project_name: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
}, { versionKey: false });

const User = mongoose.model('User', userSchema);

module.exports = User;


// id, name, email, project_name, vault_id