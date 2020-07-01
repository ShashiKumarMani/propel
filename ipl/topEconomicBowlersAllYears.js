function topEconomicBowlersWithYear(matches, deliveries, year) {

    const result = {};
    let matchIds = [];

    /*Find all matches played in 2015 season */
    for(let match of matches)
    {
      const season = match.season;
      if(season == year && !(match.id in matchIds))
      {
        matchIds.push((match.id));
      }
    }
    //console.log(year, matchIds);

    /* Find the total extra runs */
    for (let delivery of deliveries) {
      const bowler = delivery.bowler;
      let matchId = (delivery.match_id);
      //console.log(typeof delivery.match_id);

      if(matchIds.indexOf(matchId) != -1)
      {
        //console.log(matchId);
        if (result[bowler]) {
          result[bowler][0]++;
          result[bowler][1] = result[bowler][1] + Number(delivery.total_runs);
        } else {
          result[bowler] = [1, Number(delivery.total_runs)];
        }
      }
    }

    for(const [bowler, data] of Object.entries(result)){
        result[bowler] = data[1] / (data[0] / 6);
    } 

    //console.log(result);
    let economyData = [];
    for (let bowler in result) {
      economyData.push([bowler, (result[bowler])]);
    }
    economyData = economyData.sort(function(a,b){
      return a[1] < b[1] ? -1 : a[1] == b[1] ? 0 : 1;
    })

    economyData = economyData.slice(0,10);

    let finalObj = {};

    economyData.map(function(val){finalObj[val[0]] = val[1];})

    return finalObj;
}

module.exports = topEconomicBowlersWithYear;