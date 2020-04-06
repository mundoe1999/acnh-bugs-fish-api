var express = require('express');
var cors = require('cors');
const app = express();
const fs = require('fs');

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
app.listen(3001, () => console.log("Now listening to port 3001"));
