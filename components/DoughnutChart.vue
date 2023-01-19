<template>
  <div class="DoughnutChart">
    <client-only>
      <div class="flex mb-4">
        <div class="w-1/2 mr-2">
          <doughnut
            :chart-data="workChartData"
            :chart-options="workChartOptions"
            :width="width"
            :height="height"
          />
        </div>
        <div class="w-1/2">
          <doughnut
            :chart-data="absenceChartData"
            :chart-options="absenceOptions"
            :width="width"
            :height="height"
          />
        </div>
      </div>
    </client-only>
  </div>
</template>

<script>
export default {
  name: "DoughnutChart",
  data() {
    return {
      width: 300,
      height: 300,
      workChartData: {
        datasets: [
          {
            data: [31, 8],
            backgroundColor: ["#70AD47", "#BFBFBF"],
            borderColor: "transparent",
          },
        ],
      },
      absenceChartData: {
        datasets: [
          {
            data: [8, 31],
            backgroundColor: ["#F8CBAD", "#BFBFBF"],
            borderColor: "transparent",
          },
        ],
      },
      workChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        offset: 8,
        radius: 110,
        spacing: 4,
        hoverOffset: 20,
        weight: 0,
        plugins: {
          datalabels: {
            display: false,
          },
          doughnutlabel: {
            labels: [
              {
                text: 31,
                font: {
                  size: 32,
                  weight: "bold",
                },
                color: "#70AD47",
              },
            ],
          },
          title: {
            align: "center",
            color: "#ffffff",
            display: true,
            position: "top",
            font: {
              size: 16,
              weight: "bold",
            },
            padding: 5,
            text: "출근",
          },
        },
      },
      absenceOptions: {
        responsive: true,
        maintainAspectRatio: false,
        offset: 8,
        radius: 110,
        spacing: 4,
        hoverOffset: 20,
        weight: 0,
        plugins: {
          datalabels: {
            display: false,
          },
          doughnutlabel: {
            labels: [
              {
                text: 8,
                font: {
                  size: 32,
                  weight: "bold",
                },
                color: "#F8CBAD",
              },
            ],
          },
          title: {
            align: "center",
            color: "#ffffff",
            display: true,
            position: "top",
            font: {
              size: 16,
              weight: "bold",
            },
            text: "결근",
          },
        },
      },
    };
  },
};
</script>

<style></style>
