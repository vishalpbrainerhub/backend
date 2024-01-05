const Project = require('../models/project');

const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createProjects = async (req, res) => {
  const { name, organization_name } = req.body;

  try {
    const newProject = await Project.create({ name, organization_name });
    res.status(201).json({newProject,"status" : "success"});
  } catch (error) {
    res.status(400).json({ error: 'Bad Request' });
  }
};

module.exports = {
    getAllProjects,
    createProjects,
};
