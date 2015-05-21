$(document).ready(function(){
  $('.leader').height($(window).height() / 2)
  $.getJSON('http://cdn.rawgit.com/ejb/highcharts-tutorial/master/data/poll-data.json', function(data){
    var highchartsFormat = [
      {
        name: "Conservatives",
        data: []
      },
      {
        name: "Labour",
        data: []
      },
      {
        name: "Liberal Democrats",
        data: []
      }
    ];
    $.each(data, function(i,  row){
      var dateArr = row.date.split('-');
      var timestamp = Date.UTC( +dateArr[2], +dateArr[1]-1, +dateArr[0] );
      highchartsFormat[0].data.push([ timestamp, row["CON"] ]);
      highchartsFormat[1].data.push([ timestamp, row["LAB"] ]);
      highchartsFormat[2].data.push([ timestamp, row["LIB DEM"] ]);
    });

    $('#container').highcharts({
      series: highchartsFormat,
      tooltip: {
        crosshairs: [true, false],
        shared: true
      },
      plotOptions: {
        series: {
          marker: {
            enabled: false,
            states: {
              hover: {
                enabled: false
              }
            }
          }
        },
        line: {
          lineWidth: 1.5,
          states: {
            hover:{
              lineWidth: 1.5
            }
          }
        }
      },
      xAxis: {
        type: 'datetime'
      },
      credits: {
        enabled: false
      },
      title: {
        text: 'Guardian/ICM poll results over time'
      },
      xAxis: {
        type: 'datetime',
        plotBands: makePlotBands(),
      },
      yAxis: {
        title: null,
        labels: {
          formatter: function(){
            if (this.isLast){
              return this.value+'%';
            }
            return this.value;
          }
        }
      },
      colors: ['#03529E', '#9E0400', '#FDB009']
    });

    $('.highcharts-container').mouseover(function(){
      $('.note').hide();
      $('#leader-img').show();
    })
    $('.highcharts-container').mouseout(function(){
      $('.note').show()
      $('#leader-img').hide();
    });



  });

  function makePlotBands(){

    var partyHistories = [{
      name: 'Conservatives',
      color: 'rgba(3, 82, 158,0.1)',
      periods: [
        {
          dates: [
            Date.UTC(1984, 5, 15),
            Date.UTC(1997, 4, 2)
          ]
        },
        {
          dates: [
            Date.UTC(2010, 4, 12),
            Date.UTC(2015,3,26)
          ]
        }
      ],
      leaders: [
        {
          name: 'thatcher',
          dates: [
            Date.UTC(1984, 5, 15),
            Date.UTC(1990,10,28)
          ]
        },
        {
          name: 'major',
          dates: [
            Date.UTC(1990,10,28),
            Date.UTC(1997,4,2)
          ]
        },
        {
          name: 'cameron',
          dates: [
            Date.UTC(2010,4,11),
            Date.UTC(2015,3,26)
          ]
        }
      ]
    },
    {
      name: 'Labour',
      color: 'rgba(158, 4, 0, 0.1)',
      periods: [
        {
          dates: [
            Date.UTC(1997, 4, 2),
            Date.UTC(2010, 4, 12)
          ]
        }
      ],
      leaders: [
        {
          name: 'blair',
          dates: [
            Date.UTC(1997,4,2),
            Date.UTC(2007,5,27)
          ]
        },
        {
          name: 'brown',
          dates: [
            Date.UTC(2007,5,27),
            Date.UTC(2010,4,11)
          ]
        }
      ]
    }],

    arr = [];

    for(var i = 0; i < partyHistories.length; i++){
      for(var j = 0; j < partyHistories[i].periods.length; j++){
        arr.push(
          {
            from: partyHistories[i].periods[j].dates[0],
            to: partyHistories[i].periods[j].dates[1],
            color: partyHistories[i].color
          }
        );
      }
      for(var k = 0; k < partyHistories[i].leaders.length; k++){
        (function(index){
          var leaderName = partyHistories[i].leaders[k].name;
          arr.push({
            from: partyHistories[i].leaders[k].dates[0],
            to: partyHistories[i].leaders[k].dates[1],
            color: 'rgba(0,0,0,0)',
            events: {
              mouseover: function(){
                $('#leader-img').css({
                  'height': $(window).height() / 2,
                  // 'background-image':'url(img/"' + leaderName + '".jpg)'
                  'background-image': 'url(img/' + leaderName + '.jpg)'
                });
              }
            }
          })
        })(k);
      }
    }
    return arr;
  }
  function prettyStr(str){
    return str.toLowerCase().replace(' ', '-');
  }
})
