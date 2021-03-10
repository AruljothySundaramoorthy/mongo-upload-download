const express = require('express');

const app = express();
require('dotenv').config();
const fileroute = require('./routes/file.route')

const port = parseInt(process.env.APPLICATIONPORT, 10) || 3003;
app.use('', fileroute)

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Application running on ${port}`);
});
