function fetchAndVisualizeData() {
  fetch("./data.json")
    .then(r => r.json())
    .then(visualizeData);
}

fetchAndVisualizeData();

function visualizeData(data) {
  //console.log(Object.keys(data));
  visualizeMatchesPlayedPerYear(data.matchesPlayedPerYear);
  visualizeMatchesWonPerYear(data.matchesWonPerYear);
  visualizeExtraRunsScored(data.extraRunsScored);
  visualizeMatchesWonPerVenue(data.matchesWonPerVenue, data.Venues);
  visualizeTopEconomicBowlers(data.topEconomicBowlers);
  return;
}

function visualizeMatchesPlayedPerYear(matchesPlayedPerYear) {
  const yearData = [];
  for (let year in matchesPlayedPerYear) {
    yearData.push([year, (matchesPlayedPerYear[year])]);
  }

  Highcharts.chart('matches-played-per-year', {
    chart: {
      type: 'column'
    },
    title: {
      text: '1. Total number of matches played each year'
    },
    subtitle: {
      text: 'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
    },
    xAxis: {
      type: 'category',
      labels: {
        rotation: -45,
        style: {
          fontSize: '13px',
          fontFamily: 'Verdana, sans-serif'
        }
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Matches'
      }
    },
    legend: {
      enabled: false
    },
    tooltip: {
      pointFormat: 'Population in 2017: <b>{point.y:.1f} millions</b>'
    },
    series: [{
      name: 'Years',
      data: yearData,
      dataLabels: {
        enabled: true,
        rotation: -90,
        color: '#FFFFFF',
        align: 'right',
        format: '{point.y:.1f}', // one decimal
        y: 10, // 10 pixels down from the top
        style: {
          fontSize: '13px',
          fontFamily: 'Verdana, sans-serif'
        }
      }
    }]
  });
}

function visualizeMatchesWonPerYear(matchesWonPerYear) {
  const seriesData = [];

  for (let team in matchesWonPerYear) {
    seriesData.push({name : team, data : matchesWonPerYear[team]});
  }

  Highcharts.chart('matches-won-per-year', {
    chart: {
      type: 'column'
    },
    title: {
      text: '2. Number of matches won by teams over all the years of IPL'
    },
    subtitle: {
      text: 'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
    },
    xAxis: {
      categories: ['2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019'],
      crosshair: true
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Matches Won'
      }
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0
      }
    },
    series: seriesData
  });
}


function visualizeExtraRunsScored(extraRunsScored) {
  const seriesData = [];
  for (let team in extraRunsScored) {
    seriesData.push([team, extraRunsScored[team]]);
  }

  Highcharts.chart('extra-runs-scored', {
    chart: {
      type: 'column'
    },
    title: {
      text: '3. Extra Runs Scored by teams in the year 2016'
    },
    subtitle: {
      text: 'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
    },
    xAxis: {
      type: 'category',
      labels: {
        rotation: -45,
        style: {
          fontSize: '13px',
          fontFamily: 'Verdana, sans-serif'
        }
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Extra runs'
      }
    },
    legend: {
      enabled: false
    },
    tooltip: {
      pointFormat: 'Population in 2017: <b>{point.y:.1f} millions</b>'
    },
    series: [{
      name: 'Years',
      data: seriesData,
      dataLabels: {
        enabled: true,
        rotation: -90,
        color: '#FFFFFF',
        align: 'right',
        format: '{point.y:.1f}', // one decimal
        y: 10, // 10 pixels down from the top
        style: {
          fontSize: '13px',
          fontFamily: 'Verdana, sans-serif'
        }
      }
    }]
  });
}

function visualizeTopEconomicBowlers(topEconomicBowlers) {
  const economyData = [];
  for (let bowler in topEconomicBowlers) {
    economyData.push([bowler, (topEconomicBowlers[bowler])]);
  }

  Highcharts.chart('top-economic-bowlers', {
    chart: {
      type: 'column'
    },
    title: {
      text: '4. Top economic bowlers in 2015 season'
    },
    subtitle: {
      text: 'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
    },
    xAxis: {
      type: 'category',
      labels: {
        rotation: -45,
        style: {
          fontSize: '13px',
          fontFamily: 'Verdana, sans-serif'
        }
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Economy'
      }
    },
    legend: {
      enabled: false
    },
    tooltip: {
      pointFormat: 'Population in 2017: <b>{point.y:.1f} millions</b>'
    },
    series: [{
      name: 'Bowlers',
      data: economyData,
      dataLabels: {
        enabled: true,
        rotation: -90,
        color: '#FFFFFF',
        align: 'right',
        format: '{point.y:.1f}', // one decimal
        y: 10, // 10 pixels down from the top
        style: {
          fontSize: '13px',
          fontFamily: 'Verdana, sans-serif'
        }
      }
    }]
  });
}

function visualizeMatchesWonPerVenue(matchesWonPerVenue, Venues) {
  const seriesData = [];
  for (let team in matchesWonPerVenue) {
    seriesData.push({name : team, data : matchesWonPerVenue[team]});
  }

  Highcharts.chart('matches-won-per-venue', {
    chart: {
      type: 'bar'
    },
    title: {
      text: '5. Matches won by teams per Venue'
    },
    xAxis: {
      categories: Venues
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Matches Won vs Stadium'
      }
    },
    legend: {
      reversed: true
    },
    plotOptions: {
      series: {
        stacking: 'normal'
      }
    },
    series: seriesData
  });
}
