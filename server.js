var express = require('express');
var cors = require('cors');
const app = express();
const fs = require('fs');
require('dotenv').config();

const PORT = process.env.PORT || 3001;

app.use(cors());

app.get('/', (req, res) => {
  fs.readFile('bugs.json', (err,data) => {
    if(err) {
      res.send(err);
      throw err;
    } else {
      
      res.send(JSON.parse(data));
    }
  });
});
app.listen(PORT, () => console.log("Now listening to port 3001"));
