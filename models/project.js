const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true,unique: true},
  organization_name: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization' },

}, { versionKey: false });

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;

