import {Component, OnInit} from '@angular/core';
import {UserserviceService} from "../userservice/userservice.service";
import {Chart, registerables} from "chart.js";

@Component({
  selector: 'app-sognutchart',
  templateUrl: './sognutchart.component.html',
  styleUrls: ['./sognutchart.component.css']
})
export class SognutchartComponent implements OnInit {
  chart: any = [];
  vacationData: { labels: string[], data: number[] } = { labels: [], data: [] };
constructor(public userservice:UserserviceService) {
  Chart.register(...registerables);
}
  ngOnInit(): void {
    this.userservice.soumissionparvac().subscribe((data) => {
      this.vacationData.labels = Object.keys(data);
      this.vacationData.data = Object.values(data);
      this.createDonutChart();
    });

  }
  createDonutChart(): void {
    this.chart = new Chart('canvas', {
      type: 'doughnut',
      data: {
        labels: this.vacationData.labels,
        datasets: [{
          label: 'Demandes de congés par type de vacances',
          data: this.vacationData.data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)'
            // Ajoutez plus de couleurs si nécessaire
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,

        animation: {
          animateScale: true,
          animateRotate: true
        }
      }
    });
  }

}
