indexSearch = document.getElementById("indexSearch");
$("#indexSearch").change(() => {
  $("#indexSearch option[value='1']").remove();
  IndexData();
});

companySearch = document.getElementById("companySearch");
$("#companySearch").change(() => {
  $("#companySearch option[value='1']").remove();
  $("#companyDataplaceholder").hide();
  showChart();
});

companyLimit = document.getElementById("companylimit");
$("#companylimit").change(() => {
  updateChart();
});

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});
function IndexData() {
  let week52low, week52high, index, date, open, high, low, close, prevclose;
  $.when(
    $.ajax({
      type: "GET",
      url: `/api/smindexes/${indexSearch.value}`,
      dataType: "json",
      success: function (data) {
        if (data.detail == "success") {
          let data52 = data.message.slice(0, 364);
          let data52low = data52.map((a) => a.Low);
          data52low = data52low.filter((e) => e);
          week52low = Math.min(...data52low);
          let data52high = data52.map((a) => a.High);
          data52high = data52high.filter((e) => e);
          week52high = Math.max(...data52high);
        }
      },
    }),

    $.ajax({
      type: "GET",
      url: `/api/smindexes/${indexSearch.value}/0/`,
      dataType: "json",
      success: function (data) {
        if (data.detail == "success") {
          index = data.message.Index;
          date = new Date(data.message.Date).toDateString().substring(4);
          open = data.message.Open;
          high = data.message.High;
          low = data.message.Low;
          close = data.message.Close;
          prevclose = data.message.Adjclose;
        }
      },
    })
  ).then(() => {
    let weekpercent =
      ((parseFloat(close) - parseFloat(week52low)) /
        (parseFloat(week52high) - parseFloat(week52low))) *
      100;
    let daypercent =
      ((parseFloat(close) - parseFloat(low)) /
        (parseFloat(high) - parseFloat(low))) *
      100;
    let displaypercent =
      ((parseFloat(close) - parseFloat(prevclose)) / parseFloat(prevclose)) *
      100;
    let displaychange = parseFloat(close) - parseFloat(prevclose);
    let facolor, faicon, flagstr;
    if (displaychange >= 0) {
      flagstr = "+";
      facolor = "fa-green";
      faicon = "fa-caret-up";
    } else {
      flagstr = "-";
      facolor = "fa-red";
      faicon = "fa-caret-down";
    }
    displaypercent =
      flagstr + formatter.format(Math.abs(displaypercent)).substring(1);
    displaychange =
      flagstr + formatter.format(Math.abs(displaychange)).substring(1);
    open = formatter.format(open).substring(1);
    high = formatter.format(high).substring(1);
    low = formatter.format(low).substring(1);
    close = formatter.format(close).substring(1);
    prevclose = formatter.format(prevclose).substring(1);
    week52high = formatter.format(week52high).substring(1);
    week52low = formatter.format(week52low).substring(1);

    const container = document.getElementById("indexDataplaceholder");
    container.innerHTML = `<div class="col-12">
              <div class="card mb-3">
                <div class="card-body">
                  <h4 class="card-title px-2">${index}</h4>
                  <div class="row pb-3 card-border">
                    <div class="d-flex flex-column col-sm-6 px-5">
                      <h2 class="font-weight-bold">${close}</h2>
                      <h3 class="${facolor}"><i class="fa ${faicon}"></i> ${displaychange}(${displaypercent}%)</h3>
                      <h6 class="text-muted">As on ${date}</h6>
                    </div>
                    <div class="d-flex flex-column col-sm-6 pr-sm-5">
                      <h5 class="text-muted pt-3 pt-sm-0">Day Range</h5>
                      <div class="d-flex justify-content-between">
                        <h6 class="text-muted">${low}</h6>
                        <h6 class="text-muted">${high}</h6>
                      </div>
                      <div class="d-flex align-items-center text-muted">
                        <h6 class="px-1">L</h6>
                        <div class="progress" style="height: 2px; width: 100%;">
                          <div
                            class="progress-bar"
                            role="progressbar"
                            aria-valuenow="70"
                            aria-valuemin="0"
                            aria-valuemax="100"
                            style="width: ${daypercent}%;"
                          ></div>
                        </div>
                        <h6 class="px-1">H</h6>
                      </div>
                      <h5 class="text-muted mt-3">52 Week Range</h5>
                      <div class="d-flex justify-content-between">
                        <h6 class="text-muted">${week52low}</h6>
                        <h6 class="text-muted">${week52high}</h6>
                      </div>
                      <div class="d-flex align-items-center text-muted">
                        <h6 class="px-1">L</h6>
                        <div class="progress" style="height: 2px; width: 100%;">
                          <div
                            class="progress-bar"
                            role="progressbar"
                            aria-valuenow="70"
                            aria-valuemin="0"
                            aria-valuemax="100"
                            style="width: ${weekpercent}%;"
                          ></div>
                        </div>
                        <h6 class="px-1">H</h6>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-6 px-sm-5">
                      <div
                        class="d-flex py-1 justify-content-between border-bottom"
                      >
                        <h6 class="text-muted">Open</h6>
                        <h6>${open}</h6>
                      </div>
    
                      <div
                        class="d-flex py-1 justify-content-between border-bottom"
                      >
                        <h6 class="text-muted">Previous Close</h6>
                        <h6>${prevclose}</h6>
                      </div>
    
                      <div
                        class="d-flex py-1 justify-content-between border-bottom"
                      >
                        <h6 class="text-muted">Day High</h6>
                        <h6>${high}</h6>
                      </div>
                    </div>
                    <div class="col-sm-6 px-sm-5">
                      <div
                        class="d-flex py-1 justify-content-between border-bottom"
                      >
                        <h6 class="text-muted">Day Low</h6>
                        <h6>${low}</h6>
                      </div>
    
                      <div
                        class="d-flex py-1 justify-content-between border-bottom"
                      >
                        <h6 class="text-muted">52 Week High</h6>
                        <h6>${week52high}</h6>
                      </div>
    
                      <div
                        class="d-flex py-1 justify-content-between border-bottom"
                      >
                        <h6 class="text-muted">52 Week Low</h6>
                        <h6>${week52low}</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>`;
  });
}

let compData = null;
function dummy(close, date) {
  return {
    t: date.valueOf(),
    y: close,
  };
}
function updateChart() {
  let chartData;
  if (compData === null) return;
  if (companyLimit.value === "0") chartData = compData;
  else chartData = compData.splice(0, parseInt(companyLimit.value));
  document.getElementById(
    "canvas-holder"
  ).innerHTML = `<canvas id="dataChart"></canvas>`;
  var ctx = document.getElementById("dataChart").getContext("2d");
  ctx.canvas.width = 1000;
  ctx.canvas.height = 500;

  var color = Chart.helpers.color;
  var cfg = {
    data: {
      datasets: [
        {
          label: "StockNet",
          backgroundColor: color(window.chartColors.red).alpha(0.5).rgbString(),
          borderColor: window.chartColors.red,
          data: chartData,
          type: "line",
          pointRadius: 0,
          fill: false,
          lineTension: 0,
          borderWidth: 2,
        },
      ],
    },
    options: {
      animation: {
        duration: 0,
      },
      scales: {
        xAxes: [
          {
            type: "time",
            distribution: "series",
            offset: true,
            ticks: {
              major: {
                enabled: true,
                fontStyle: "bold",
              },
              source: "data",
              autoSkip: true,
              autoSkipPadding: 75,
              maxRotation: 0,
              sampleSize: 100,
            },
            afterBuildTicks: function (scale, ticks) {
              var majorUnit = scale._majorUnit;
              var firstTick = ticks[0];
              var i, ilen, val, tick, currMajor, lastMajor;

              val = moment(ticks[0].value);
              if (
                (majorUnit === "minute" && val.second() === 0) ||
                (majorUnit === "hour" && val.minute() === 0) ||
                (majorUnit === "day" && val.hour() === 9) ||
                (majorUnit === "month" &&
                  val.date() <= 3 &&
                  val.isoWeekday() === 1) ||
                (majorUnit === "year" && val.month() === 0)
              ) {
                firstTick.major = true;
              } else {
                firstTick.major = false;
              }
              lastMajor = val.get(majorUnit);

              for (i = 1, ilen = ticks.length; i < ilen; i++) {
                tick = ticks[i];
                val = moment(tick.value);
                currMajor = val.get(majorUnit);
                tick.major = currMajor !== lastMajor;
                lastMajor = currMajor;
              }
              return ticks;
            },
          },
        ],
        yAxes: [
          {
            gridLines: {
              drawBorder: false,
            },
            scaleLabel: {
              display: true,
              labelString: "Closing price ($)",
            },
          },
        ],
      },
      tooltips: {
        intersect: false,
        mode: "index",
        callbacks: {
          label: function (tooltipItem, myData) {
            var label = myData.datasets[tooltipItem.datasetIndex].label || "";
            if (label) {
              label += ": ";
            }
            label += parseFloat(tooltipItem.value).toFixed(2);
            return label;
          },
        },
      },
    },
  };

  var chart = new Chart(ctx, cfg);
  var type = "line";
  var dataset = chart.config.data.datasets[0];
  dataset.type = type;
  dataset.data = chartData;
  chart.update();
}
function showChart() {
  $.ajax({
    type: "GET",
    url: `/api/companies/${companySearch.value}`,
    dataType: "json",
    success: function (data) {
      if (data.detail == "success") {
        let chartData = [];
        for (item of data.message) {
          if (item["Date"] !== null && item["Close"] !== null) {
            chartData.push(dummy(item["Close"], moment(item["Date"])));
          }
        }
        compData = chartData;
        updateChart();
      }
    },
  });
}
