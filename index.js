require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();

// 🔹 Connexion à MongoDB
connectDB();

// 🔹 Middleware JSON
app.use(express.json());

// 🔹 CORS multi-origin
// FRONTEND_URL dans .env (ex: http://localhost:4200)
app.use(cors({
  origin: [process.env.FRONTEND_URL, 'https://mkwoos48ksgw4wog0ks4ko8o.mendrika.dev'], // Angular + Postman
  methods: ['GET','POST','PUT','DELETE']
}));

// 🔹 Routes
app.use('/api/auth', require('./routes/auth'));       // Auth login/register
app.use('/api/admin', require('./routes/admin'));     // Admin CRUD / dashboard
app.use('/api/shop', require('./routes/shops'));       // Shop CRUD / orders
app.use('/api/buyer', require('./routes/buyer'));     // Buyer browse / orders

// 🔹 Route test publique
app.get('/', (req, res) => {
  res.send('API m1p13mean-kevin-jessy 🚀');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 