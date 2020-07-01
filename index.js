const csv = require("csvtojson");
const topEconomicBowlersWithYear = require('./ipl/topEconomicBowlersAllYears');

const MATCHES_FILE_PATH = "./csv_data/matches.csv";
const DELIVERIES_FILE_PATH = "./csv_data/deliveries.csv"
const JSON_OUTPUT_FILE_PATH = "./public/data.json";

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

app.get('/economy', function(request, response){

  //console.log("Server request made with year ", request.url, request.query);

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
