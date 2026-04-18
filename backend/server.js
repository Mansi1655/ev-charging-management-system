// server.js
// Registers all route files and starts the server.
// CORS is enabled so the React app (localhost:3000) can call this API.

const express = require('express');
const cors    = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json()); // parse JSON request bodies

// Route files — each handles one "area" of the app
app.use('/api/stations', require('./routes/stations'));
app.use('/api/sessions', require('./routes/sessions'));
app.use('/api/payments', require('./routes/payments'));
app.use('/api/tickets',  require('./routes/tickets'));
app.use('/api/discoms', require('./routes/discoms'));
app.use('/api/users', require('./routes/users'));
app.use('/api/vehicles', require('./routes/vehicles'));
app.use('/api/transformers', require('./routes/transformers'));
app.use('/api/connectors', require('./routes/connectors'));
app.use('/api/energymeters', require('./routes/energy_meters'));
app.use('/api/tariffplans', require('./routes/tariff_plans'));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));