import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UserserviceService} from "../userservice/userservice.service";
import {DataValidation} from "../Models/DataValidation";
import {Chart, ChartDataset, registerables} from "chart.js";
import {DayOfWeek} from "../Models/DayOfWeek";
import {Day} from "@syncfusion/ej2-angular-schedule";

@Component({
  selector: 'app-charttopvalidation',
  templateUrl: './charttopvalidation.component.html',
  styleUrls: ['./charttopvalidation.component.css']
})
export class CharttopvalidationComponent implements OnInit {
  @ViewChild('lineChart', { static: true }) lineChart: ElementRef<HTMLCanvasElement> | undefined;
  chart: any;
constructor(public userservice:UserserviceService) {
  Chart.register(...registerables);
}
  ngOnInit(): void {
    this.userservice.topvalidation().subscribe((data: DataValidation[]) => {
      console.log(data);
      const labels = [DayOfWeek.MONDAY,DayOfWeek.TUESDAY,DayOfWeek.WEDNESDAY,DayOfWeek.THURSDAY,DayOfWeek.FRIDAY];
      const validationsByDay = labels.map(day => {

        const dayData = data.find(d => d.day === day);
        console.log(dayData);
        return dayData ? dayData.validations : 0;
      });
      const datasets: ChartDataset[] = [];
      datasets.push({
        label: 'Validations par jours ',
        data: validationsByDay,
        borderColor: 'blue',
        fill: true,
        tension: 0.1
      });
      this.userservice.refus().subscribe((data: DataValidation[]) => {
        console.log(data);
        const labels = [DayOfWeek.MONDAY,DayOfWeek.TUESDAY,DayOfWeek.WEDNESDAY,DayOfWeek.THURSDAY,DayOfWeek.FRIDAY];
        const refusbyday = labels.map(day => {

          const dayData = data.find(d => d.day === day);
          console.log(dayData);
          return dayData ? dayData.validations : 0;
        });
        datasets.push({
          label: ' Refus par jour',
          data: refusbyday,
          borderColor: '#921A1A',
          fill: true ,
          tension: 0.1
        });
      if (this.lineChart) {
        console.log("defined")
        this.chart = new Chart(this.lineChart.nativeElement, {
          type: 'line',
          data: {
              labels: labels,
              datasets: datasets // Ajoutez tous les datasets à afficher ici
            },


          options: {
            responsive: true,
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Day of the Week'
                }
              },
              y: {
                title: {
                  display: true,
                  text: 'Number of Validations'
                }
              }
            }
          }
        });
      }
      else {
        console.log("undefined");
      }
    });
  });


 }
}
