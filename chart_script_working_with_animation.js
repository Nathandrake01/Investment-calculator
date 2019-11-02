google.charts.load('current', {'packages':['annotationchart','corechart', 'table']});
function FV(rate, nper, pmt)
{
  monthlyRate = rate/12/100
  numMonths = nper*12
  return Math.round(pmt* (Math.pow(1+monthlyRate,numMonths) - 1)/ monthlyRate,0);
}

function numberWithCommas(x)
{
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function drawChart() {
  var chart = new google.visualization.LineChart(document.getElementById('piechart'));
  var Investment = parseInt(document.getElementById('Investment').value);
  var Tenure = document.getElementById('form2');
  Tenure = parseInt(Tenure.elements['Tenure'].value);
  var MF_ROI = 10;

  var Data_array = [];
  var start_year = 2019
  var d = new Date();
  var year = d.getFullYear();
  var month = d.getMonth();
  var day = d.getDate();
  start_invest = Investment;

  Data_array[0] = new Array('Year','Investment', 'Mutual Fund')
  for (var i = 1; i <= Tenure; i++)
  {
    Data_array[i] = new Array();
    Data_array[i][0] = new Date(year+i, 0, 0)
    Data_array[i][1] = i*start_invest*12
    Data_array[i][2] = FV(MF_ROI, i, start_invest)
  }
  var options =
  {
    width: 1000,
    height: 600,

    curveType: 'function',
    "vAxis": { "minValue": "0", "maxValue": 6 },
    "hAxis": { "slantedTextAngle": "45", "slantedText": "true" },
    "legend": { "position": "top" }, "pointSize": "5",
    aggregationTarget: 'category',
    animation: { duration: 1000 },

    series:
    {
       0: { color: '#0D55DF', lineDashStyle: [2, 2, 20, 2, 20,2]},
       1: { color: '#F29B27', lineWidth: 3 },
    },

  };

  var data_graph = google.visualization.arrayToDataTable(Data_array);

  var index = 0;
  var tempo = [];
  tempo[0] = new Array('Year','Investment', 'Mutual Fund');
  var drawChart = function()
  {
    if (index < Tenure)
    {
      data_graph.setValue(index, 1, index*start_invest*12);
      data_graph.setValue(index, 2, FV(MF_ROI, index, start_invest));

      index = index + 1;

      console.log(data_graph);
      chart.draw(data_graph,options);
    }
  }
  google.visualization.events.addListener(chart, 'ready', drawChart);
  google.visualization.events.addListener(chart, 'animationfinish', randomWalk);

  chart.draw(data_graph, options);
  drawChart();

  function randomWalk() {
  document.getElementsByName("years")[0].innerHTML = Tenure;
  document.getElementsByName("investment")[0].innerHTML = numberWithCommas(Math.round(Data_array[Tenure][1]));
  document.getElementsByName("mf_return")[0].innerHTML = numberWithCommas(Data_array[Tenure][2]);
  document.getElementsByName("percent_return")[0].innerHTML = ((Data_array[Tenure][2]-Data_array[Tenure][1])*100/(Data_array[Tenure][1])).toFixed(2);
  }
}
