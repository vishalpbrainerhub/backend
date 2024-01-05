const Organization = require('../models/org');

const getAllOrgs = async (req, res) => {
  try {
    const orgs = await Organization.find();
    res.json(orgs);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createOrgs = async (req, res) => {
  const { name } = req.body;

  try {
    const newOrgs = await Organization.create({ name  });
    res.status(201).json({ newOrgs,"status" : "success"});
  } catch (error) {
    res.status(400).json({ error: 'Bad Request' });
  }
};

module.exports = {
    getAllOrgs,
    createOrgs,
};
