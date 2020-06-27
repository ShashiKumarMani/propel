function extraRunsScored(matches, deliveries) {

    const result = {};
    let matchIds = [];

    /*Find all matches played in 2016 season */
    for(let match of matches)
    {
      const season = match.season;
      if(season == '2016' && !(match.id in matchIds))
      {
        matchIds.push(match.id);
      }
    }

    /* Find the total extra runs */
    for (let delivery of deliveries) {
      const bowlingTeam = delivery.bowling_team;
      const matchId = delivery.match_id;

      if(matchIds.indexOf(matchId) != -1)
      {
        if (result[bowlingTeam]) {
          result[bowlingTeam] += Number(delivery.extra_runs);
        } else {
          result[bowlingTeam] = Number(delivery.extra_runs);
        }
      }
    }

    return result;
  }
  
  module.exports = extraRunsScored;