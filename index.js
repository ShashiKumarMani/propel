
const serveIndex = require('serve-index');
const express = require('express');
const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/', express.static('public'));
app.use('/', serveIndex('public'));

const fs = require("fs");
const csv = require("csvtojson");
const matchesPlayedPerYear = require("./ipl/matchesPlayedPerYear");
const matchesWonPerYear = require("./ipl/matchesWonPerYear");
const extraRunsScored = require("./ipl/extraRunsScored");
const matchesWonPerVenue = require("./ipl/matchesWonPerVenue");
const topEconomicBowlers = require("./ipl/topEconomicBowlers");
const topEconomicBowlersWithYear = require('./ipl/topEconomicBowlersAllYears');

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

app.get('/economy', function(request, response){

  console.log("Server request made with year ", request.url, request.query);
  
  csv()
  .fromFile(MATCHES_FILE_PATH)
  .then(matches => {
    csv()
      .fromFile(DELIVERIES_FILE_PATH)
      .then(deliveries => {
        response.json(topEconomicBowlersWithYear(matches, deliveries, request.query.year));
      });
  });
});

app.listen(process.env.PORT || 3000, function(){console.log("Server is listening at port 3000")});
