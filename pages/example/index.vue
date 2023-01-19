<template>
  <div>
    <DoughnutChart />
    <BarChart />
  </div>
</template>

<script>
import DoughnutChart from "@/components/DoughnutChart";
import BarChart from "@/components/BarChart";

export default {
  name: "Exam",
  components: { DoughnutChart, BarChart },
};
</script>

<style></style>
