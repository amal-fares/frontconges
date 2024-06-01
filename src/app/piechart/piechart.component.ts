import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UserserviceService} from "../userservice/userservice.service";
import {Chart, registerables} from "chart.js";

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.css']
})
export class PiechartComponent implements OnInit{
  @ViewChild('pieChart', { static: true }) pieChart: ElementRef<HTMLCanvasElement> | undefined;

  constructor( public userservice:UserserviceService){
    Chart.register(...registerables);
  }
  ngOnInit(): void {
    this.userservice.countbytype().subscribe(data => {
   console.log(data);
      const labels = Object.keys(data);
      const values = Object.values(data);

      this.createPieChart(labels, values);
    });
  }
  createPieChart(labels: string[], values: number[]): void {
    if(this.pieChart){
      console.log("defined");
    new Chart(this.pieChart.nativeElement, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: values,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            enabled: true
          }
        }
      }
    });
  }
  else {
    console.log(this.pieChart);
    }}

}
