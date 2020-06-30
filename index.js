/*
const express = require('express');
const app = express();
app.use(express.static('public'));
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/economy', function(request, response){

  console.log("Server request made");
  
});

function saveEconomyData(economyData)
{
  const tempString = JSON.stringify(economyData);

  fs.writeFile('./public/temp.json', tempString, "utf8", err => {
    if(err){
      console.error(err);
    }
  });
}

app.listen(8080, function(){console.log("Server is listening at port 3000")});
*/

const fs = require("fs");
const csv = require("csvtojson");
const matchesPlayedPerYear = require("./ipl/matchesPlayedPerYear");
const matchesWonPerYear = require("./ipl/matchesWonPerYear");
const extraRunsScored = require("./ipl/extraRunsScored");
const matchesWonPerVenue = require("./ipl/matchesWonPerVenue");
const topEconomicBowlers = require("./ipl/topEconomicBowlers");
const topEconomicBowlersAllYears = require("./ipl/topEconomicBowlersAllYears");
//const topEconomicBowlersWithYear = require('./ipl/topEconomicBowlersAllYears');

const MATCHES_FILE_PATH = "./csv_data/matches.csv";
const DELIVERIES_FILE_PATH = "./csv_data/deliveries.csv"
const JSON_OUTPUT_FILE_PATH = "./public/data.json";


function main() {
  csv()
    .fromFile(MATCHES_FILE_PATH)
    .then(matches => {
      let result = {};
      result["matchesPlayedPerYear"] = matchesPlayedPerYear(matches);
      result["matchesWonPerYear"] = matchesWonPerYear(matches);
      let tempObj = matchesWonPerVenue(matches);
      result["Venues"] = tempObj["Venues"];
      delete tempObj.Venues;
      result["matchesWonPerVenue"] = tempObj;

      csv()
        .fromFile(DELIVERIES_FILE_PATH)
        .then(deliveries => {
          result["extraRunsScored"] = extraRunsScored(matches , deliveries);
          result["topEconomicBowlers"] = topEconomicBowlers(matches, deliveries);
          result["topEconomicBowlersAllYears"] = topEconomicBowlersAllYears(matches, deliveries);
          //console.log(result);
          saveMatchesPlayedPerYear(result);
      
        });
  });

}

function saveMatchesPlayedPerYear(result) {
  const jsonData = result;
  const jsonString = JSON.stringify(jsonData);
  fs.writeFile(JSON_OUTPUT_FILE_PATH, jsonString, "utf8", err => {
    if (err) {
      console.error(err);
    }
  });
}

main();


