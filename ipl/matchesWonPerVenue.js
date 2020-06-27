function matchesWonPerVenue(matches) {

    /* Create a object with key,val venue:[winners] */
    const result = {};
    let teams = new Set();
    for (let match of matches) {
      const venue = match.venue;
      teams.add(match.team1);
      teams.add(match.team2);
      if (result[venue]) {
        result[venue].push(match.winner);
      } else {
        result[venue] = [match.winner];
      }
    }

    const newObj = {};

    /* Array of venues */
    const keys = (Object.keys(result));

    [...teams].map(function(val){newObj[val] = Array(keys.length).fill(0)});
    //console.log(keys, keys.length);

    for(let i in keys)
    {
        /* Get all winners from each venue and add  */
        let tempArr = result[keys[i]];

        for(let j = 0;j < tempArr.length;j++)
        {
            if(newObj[tempArr[j]])
            {
                newObj[tempArr[j]][i]++;
            }
        }
    }

    //console.log(newObj);

    newObj["Venues"] = keys;
    return newObj;
  }
  
  module.exports = matchesWonPerVenue;