const path = require('path');
const express = require("express");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 3001;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json({
  limit: '1mb'
}));
app.use(cookieParser());

app.use('/api', require('./routes/index').default);

app.use(express.static(path.resolve(__dirname, '../frontend/build')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});