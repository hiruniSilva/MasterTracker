const path = require('path');
const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json({
  limit: '1mb'
}));


app.use('/api', require('./routes/index').default);

app.use(express.static(path.resolve(__dirname, '../frontend/dist')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});