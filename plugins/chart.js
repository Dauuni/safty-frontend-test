import Vue from 'vue'
import { Bar, Doughnut } from 'vue-chartjs/legacy'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import DoughnutLabel from 'chartjs-plugin-doughnutlabel-rebourne'

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  ArcElement
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  ArcElement,
  ChartDataLabels,
  DoughnutLabel
)

Vue.component('Bar', { extends: Bar })
Vue.component('Doughnut', { extends: Doughnut })