const express = require('express');

const app = express();
require('dotenv').config();
const fileroute = require('./routes/fileupload.route')

const port = parseInt(process.env.APPLICATIONPORT, 10) || 3003;
app.get('/', (req, res) => {
  res.send('Hello World');
});
app.use('', fileroute)

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Application running on ${port}`);
});
