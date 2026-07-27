const dataset = [
  {
    month: "January",
    units_sold: 120,
    profit_usd: 3400,
  },
  {
    month: "February",
    units_sold: 145,
    profit_usd: 4200,
  },
  {
    month: "March",
    units_sold: 190,
    profit_usd: 5600,
  },
  {
    month: "April",
    units_sold: 110,
    profit_usd: 2900,
  },
  {
    month: "May",
    units_sold: 155,
    profit_usd: 4500,
  },
  {
    month: "June",
    units_sold: 210,
    profit_usd: 6200,
  },
  {
    month: "July",
    units_sold: 180,
    profit_usd: 5100,
  },
  {
    month: "August",
    units_sold: 165,
    profit_usd: 4800,
  },
  {
    month: "September",
    units_sold: 225,
    profit_usd: 6700,
  },
  {
    month: "October",
    units_sold: 195,
    profit_usd: 5800,
  },
  {
    month: "November",
    units_sold: 250,
    profit_usd: 7500,
  },
  {
    month: "December",
    units_sold: 300,
    profit_usd: 9100,
  },
];

const sumSpan = document.getElementById("sum");
const averageSpan = document.getElementById("average");
const minimumSpan = document.getElementById("minimum");
const maximumSpan = document.getElementById("maximum");
const selectChartName = document.getElementById("chartNames");
const selectChartType = document.getElementById("chartType");
const ctx = document.getElementById("ctx");

const sum = dataset.reduce((acc, { profit_usd }) => acc + profit_usd, 0);
console.log("sum", sum);
const average = sum / dataset.length;
console.log("average", average);
const minimum = dataset.reduce(
  (min, { profit_usd }) => (min < profit_usd ? min : profit_usd),
  Infinity,
);
console.log("minimum", minimum);
const maximum = dataset.reduce(
  (max, { profit_usd }) => (max > profit_usd ? max : profit_usd),
  -Infinity,
);
console.log("maximum", maximum);

//yearly profit data;
sumSpan.textContent = Math.round(sum);
averageSpan.textContent = average.toFixed(2);
minimumSpan.textContent = Math.round(minimum);
maximumSpan.textContent = Math.round(maximum);

// create chart
let myChart = null;
const createCharts = ({ xValues, yValues }, chartType, chartName) => {
  const [yName, xName] = chartName.split("Vs");
  console.log(yName, xName);
  const barColors = [
    "Red",
    "Blue",
    "lightgreen",
    "Yellow",
    "Orange",
    "Purple",
    "Pink",
    "Brown",
    "Black",
    "Darkgreen",
    "Gray",
    "Magenta",
  ];
  if (myChart !== null) {
    myChart.destroy();
  }
  myChart = new Chart(ctx, {
    type: chartType,
    data: {
      labels: xValues,
      datasets: [
        {
          backgroundColor: barColors,
          data: yValues,
        },
      ],
    },
    options: {
      plugins: {
        legend: { display: false },
        title: {
          display: true,
          text: "Year 2025",
          font: { size: 20 },
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: xName.toUpperCase(),
            color: "#000000",
            font: {
              size: 16,
              weight: "bold",
            },
          },
        },
        y: {
          title: {
            display: true,
            text: yName.toUpperCase(),
            color: "#000000",
            font: {
              size: 16,
              weight: "bold",
            },
          },
        },
      },
    },
  });
};

// create data structure for handle diff charts
const month = dataset.map(({ month }) => month);
const sells = dataset.map(({ units_sold }) => units_sold);
const profit = dataset.map(({ profit_usd }) => profit_usd);

const chartsData = {
  profitVsMonth: {
    xValues: month,
    yValues: profit,
  },
  sellsVsMonth: {
    xValues: month,
    yValues: sells,
  },
  profitVsSells: {
    xValues: sells,
    yValues: profit,
  },
};

// charts handle;
selectChartName.addEventListener("change", (e) => {
  console.log("chart changed");
  const chartName = e.target.value;
  console.log("chartName", chartName);
  const chartTypeValue = selectChartType.value;
  console.log("chartTypeValue", chartTypeValue);
  createCharts(chartsData[chartName], chartTypeValue, chartName);
});

chartType.addEventListener("change", (e) => {
  console.log("type changed");

  const chartTypeValue = e.target.value;
  console.log("chartTypeValue", chartTypeValue);
  const chartName = selectChartName.value;
  console.log("chart name", chartName);
  createCharts(chartsData[chartName], chartTypeValue, chartName);
});

createCharts(
  chartsData[selectChartName.value],
  selectChartType.value,
  selectChartName.value,
);
