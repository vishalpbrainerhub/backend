const User = require('../models/user');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createUser = async (req, res) => {
  const { name, email,vault_id,project_name } = req.body;

  try {
    const newUser = await User.create({ name, email,vault_id,project_name });
    res.status(201).json({newUser,"status":"success"});
  } catch (error) {
    res.status(400).json({ error: 'Bad Request' });
  }
};




module.exports = {
  getAllUsers,
  createUser,
};
