var express = require('express');
var cors = require('cors');
const app = express();
const fs = require('fs');
require('dotenv').config();

const PORT = process.env.PORT || 3001;

app.use(cors());


function filterData(json_array, month, hour){
  let filtered_data = [];

  json_array.forEach(element => {
    if(element["month"].includes(month)){
      // Check if time matches
      let start = element["start"];
      let end = element["end"];
      delete element["month"]
      if(end < start){
        if(hour >= start || hour <= end){
          filtered_data.push(element);
        }
      } else {
        if(hour >= start && hour <= end){
          delete element.month;
          filtered_data.push(element);
        }
      }
    }
  });

  return filtered_data;
}

// Return Both bugs
app.get('/', (req, res) => {
  // Create Promise Array
  var promises = ['bugs.json', 'fish.json'].map(function(_path){
    return new Promise(function(_path,resolve,reject){
      fs.readFile(_path, (err, data) => {
        if(err){
          console.log(err);
          resolve([]);
        } else {
          let res = JSON.parse(data);
          resolve(res);
        }
      }) 
    }.bind(this, _path))
  });

  // Do promises
  Promise.all(promises)
  .then((read_json) => {
    let dataset = read_json[0];

    for(let i = 0; i < read_json[1].length; i++){
      // Append all files end of js
      dataset.push(read_json[1][i]);
    }
    // Do rest 
    if(req.query.sort === 'true'){
      dataset = dataset.sort((a,b) => b.price-a.price);
    }
    if(!req.query.hour || !req.query.month){
      res.send(dataset);
      return;
    }
    let hour = parseInt(req.query.hour);
    let month = parseInt(req.query.month);
    console.log(`Hour: ${hour} || Month: ${month}`);
    let result = filterData(dataset, month, hour);
    res.send(result);
  }) 


});

// requires query of hour and month to get specific time
app.get('/bugs', (req,res) => {
  console.log("Calling API FOR BUGS")
  fs.readFile('bugs.json', (err,data) => {
    if(err) {
      res.send(err);
      throw err;
    } else {
      let dataset = JSON.parse(data);
      if(req.query.sort === 'true'){
        dataset = dataset.sort((a,b) => b.price-a.price);
      }
      if(!req.query.hour || !req.query.month){
        res.send(dataset);
        return;
      }
      // Get the Hour and Month
      let hour = parseInt(req.query.hour);
      let month = parseInt(req.query.month);
      console.log(`Hour: ${hour} || Month: ${month}`);
      let result = filterData(dataset, month, hour);

      res.send(result);
    }
  });
});

// requires query of hour and month to get specific time
app.get('/fish', (req,res) => {
  fs.readFile('fish.json', (err,data) => {
    if(err) {
      res.send(err);
      throw err;
    } else {
      let dataset = JSON.parse(data);
      if(req.query.sort === 'true'){
        dataset = dataset.sort((a,b) => b.price-a.price);
      }
      if(!req.query.hour || !req.query.month){
        res.send(dataset);
        return;
      }
      // Get the Hour and Month
      let hour = parseInt(req.query.hour);
      let month = parseInt(req.query.month);
      console.log(`Hour: ${hour} || Month: ${month}`);
      let result = filterData(dataset, month, hour);
      


        res.send(result);
    }
  });
});

app.listen(PORT, () => console.log(`Now listenting to port ${PORT}`));
