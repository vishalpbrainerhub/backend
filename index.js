const express = require('express');
const mongoose = require('mongoose');
var cors = require('cors')
require('dotenv').config();

const app = express();
app.use(cors())
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use(express.json());

const userRoutes = require('./routes/userRoutes');
const orgsRoutes = require('./routes/orgRoutes');
const projectsRoutes = require('./routes/projectRoutes'); 
const vaultRoutes = require('./routes/vaultRoutes');
const transactionRoutes = require('./routes/transactionRoutes');

app.use('/api/users', userRoutes);
app.use('/api/orgs', orgsRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/vaults', vaultRoutes);
app.use('/api/transactions', transactionRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
