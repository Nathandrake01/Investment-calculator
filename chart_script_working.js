
     // <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
         //define the chart package
         google.charts.load('current', {'packages':['annotationchart','corechart', 'table'],  callback: function() {

         var index = 0;
         var drawChart = function() {
                          console.log('drawChart index ' + index);
                          if (index < data_graph.length) {
                              data.setValue(index, 1, data_graph[index++]);
                              chart.draw(data_graph, options);
                          }
                      }

   //     google.visualization.events.addListener(chart, 'animationfinish', randomWalk);
        google.visualization.events.addListener(chart, 'animationfinish', drawChart);
        // chart.draw(data_graph, options);
        // drawChart();

      // google.charts.setOnLoadCallback(drawChart);

         // nper in years
         // rate in years

         }});
        //submit requires text inputs to use parseInt to work as numbers

        function FV(rate, nper, pmt) {
          monthlyRate = rate/12/100
          numMonths = nper*12
          return Math.round(pmt* (Math.pow(1+monthlyRate,numMonths) - 1)/ monthlyRate,0);
        }

       function drawChart() {

         var chart = new google.visualization.LineChart(document.getElementById('piechart'));
         // var button = document.getElementById('b1');
         // var Debt_ROI = parseInt(document.getElementById('Debt_ROI').value);
         // var Increased_Investment = parseInt(document.getElementById('Increased_Investment').value);
         // var Inflation = parseInt(document.getElementById('Inflation').value);

         var Debt_ROI = 10;
         var MF_ROI = 10;
         var Increased_Investment = 10;
         var Inflation = 10;


         try {
              var MF_ROI = parseInt(document.getElementById('Returns').value);
              if(isNAN(MF_ROI));
           }
           catch(err) {
             MF_ROI = 10;
           }

          var Investment = parseInt(document.getElementById('Investment').value);

          var Tenure = document.getElementById('form2');
          Tenure = parseInt(Tenure.elements['Tenure'].value);

          var Data_array = [];
          var start_year = 2019

          var d = new Date();
          var year = d.getFullYear();
          var month = d.getMonth();
          var day = d.getDate();
          start_invest = Investment;


          Data_array[0] = new Array('Year','Investment', 'Mutual Fund')
          for (var i = 1; i <= Tenure; i++) {
              Data_array[i] = new Array();
              Data_array[i][0] = new Date(year+i, 0, 0)
              Data_array[i][1] = i*start_invest*12
            //  Data_array[i][2] = FV(Debt_ROI,i,start_invest)
              Data_array[i][2] = FV(MF_ROI, i, start_invest)
           }
           var options = {
             width: 1000,
             height: 600,
             // title: 'Cumulative Returns for ' + Tenure + ' years',
             // displayAnnotations: true,
             // displayAnnotationsFilter: true,
             curveType: 'function',
             legend: { position: 'top' , alignment: 'center'},
             // selectionMode: 'multiple',
             // tooltip: {trigger: 'selection'},
             aggregationTarget: 'category',
             backgroundColor: { fill:'transparent' },

             animation:{
               duration: 1000,
               easing: 'in',
               startup: true,
               },

  
             series: {
                         0: { color: '#0D55DF', lineDashStyle: [2, 2, 20, 2, 20,2]},
                         1: { color: '#F29B27', lineWidth: 3 },
                       },

           dataOpacity: 1,
           // explorer: {actions: ['dragToZoom', 'rightClickToReset'], keepInBounds: true},
           // vAxis: {title: 'Returns (Rs.)',gridlines: {color: 'none', count:-1}},
           // hAxis: {title: 'Tenure (Years)',gridlines: {color: 'none', count:-1}}

           };

          var data_graph = google.visualization.arrayToDataTable(Data_array);
          chart.draw(data_graph, options);



       function randomWalk() {
        document.getElementsByName("years")[0].innerHTML = Tenure;
        document.getElementsByName("investment")[0].innerHTML = numberWithCommas(Math.round(Data_array[Tenure][1]));
        document.getElementsByName("mf_return")[0].innerHTML = numberWithCommas(Data_array[Tenure][2]);
        document.getElementsByName("percent_return")[0].innerHTML = ((Data_array[Tenure][2]-Data_array[Tenure][1])*100/(Data_array[Tenure][1])).toFixed(2);
       }
     }

     function numberWithCommas(x) {
         return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
     }
