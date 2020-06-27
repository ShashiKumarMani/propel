function matchesWonPerYear(matches) {

    const result = {};
    let teams = new Set();
    for (let match of matches) {
      const season = match.season;
      if (result[season]) {
        result[season].push(match.winner);
        teams.add(match.team1);
        teams.add(match.team2);
      } else {
        result[season] = [match.winner];
      }
    }
 
    const newObj = {};
    const keys = (Object.keys(result));

    [...teams].map(function(val){newObj[val] = Array(keys.length).fill(0);});

    for(let i in keys)
    {
        let tempArr = result[keys[i]];

        for(let j = 0;j < tempArr.length;j++)
        {
            if(newObj[tempArr[j]])
            {
                newObj[tempArr[j]][i]++;
            }
        }
    }

    //console.log("MatchesWonPerYear", newObj);
    return newObj;
  }
  
  module.exports = matchesWonPerYear;