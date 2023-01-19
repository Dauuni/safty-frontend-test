<template>
  <div class="BarChart">
    <div class="mt-8">
      <client-only>
        <bar
          :chart-data="weeklyWorkChartData"
          :chart-options="weeklyWorkChartOptions"
          :width="width"
          :height="height"
        />
      </client-only>
    </div>
  </div>
</template>

<script>
export default {
  name: "BarChart",
  data() {
    return {
      width: 700,
      height: 300,
      weeklyWorkChartData: {
        labels: [
          "2023-01-04",
          "2023-01-05",
          "2023-01-06",
          "2023-01-09",
          "2023-01-10",
        ],
        datasets: [
          {
            label: "출근",
            data: [38, 27, 32, 31, 32],
            backgroundColor: "#70AD47",
          },
          {
            label: "결근",
            data: [1, 12, 7, 8, 7],
            backgroundColor: "#F8CBAD",
          },
        ],
      },
      weeklyWorkChartOptions: {
        scales: {
          x: {
            grid: {
              borderColor: "#222a35",
              display: false,
            },
            ticks: {
              color: "#ffffff",
            },
          },
          y: {
            grid: {
              color: "#222a35",
              borderColor: "#222a35",
            },
            ticks: {
              color: "#ffffff",
              stepSize: 10,
            },
          },
        },
        plugins: {
          datalabels: {
            anchor: "end",
            align: "top",
            color: "#ffffff",
          },
          legend: {
            display: false,
          },
        },
      },
    };
  },
};
</script>

<style></style>
