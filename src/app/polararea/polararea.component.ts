import {Component, OnInit} from '@angular/core';
import {UserserviceService} from "../userservice/userservice.service";
import {Chart, registerables} from "chart.js";

@Component({
  selector: 'app-polararea',
  templateUrl: './polararea.component.html',
  styleUrls: ['./polararea.component.css']
})
export class PolarareaComponent implements OnInit{
  chart: any = [];
  constructor(public userservice :UserserviceService) {
    Chart.register(...registerables);
  }
  ngOnInit(): void {
    this.userservice.soumisartypeonge().subscribe(data => {
      const labels = Object.keys(data);
      const values = Object.values(data);
      this.chart = new Chart('polar', {
        type: 'polarArea',
        data: {
          labels: labels,
          datasets: [{
            label: 'Nombre de congés exceptionnels',
            data: values,
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



      });
    });

  }

}
