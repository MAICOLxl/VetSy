const exress = require('express');
const cors = require('cors');
const db = require('./db');
const app = exress();

app.use(cors());
app.use(exress.json());