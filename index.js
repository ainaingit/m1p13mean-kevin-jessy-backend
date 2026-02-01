const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API m1p13mean-kevin-jessy ');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
