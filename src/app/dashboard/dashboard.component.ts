import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'pb-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public dataSets = [];
  public LabelSets = [];

  public dataSource = {
    datasets: [
        {
            data: [40, 150, 50, 500, 100],
            backgroundColor: [
                '#ffcd56',
                '#ff6384',
                '#36a2eb',
                '#fd6b19',
                '#fc33ff',
                '#335eff',
                '#33ff6e'
            ],
        }
    ],
    labels: ['Gas, Food, Entertainment, Savings, Stock Market'],
    options: {
      responsive: false
    }
};

  // tslint:disable-next-line: variable-name
  constructor(public _http: HttpClient) { }

  ngOnInit(): void {
    this._http.get('http://localhost:3000/budget')
      .subscribe((res: any) => {
        for (let i = 0; i < res.budget.length; i++) {
          this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
          this.dataSource.labels[i] = res.mBudget[i].title;
      }
        this.createChart();
      });


    const ctx1 = document.getElementById('myChartdoughnut') as HTMLCanvasElement;
    const myPieChart1 = new Chart(ctx1, {
        type: 'doughnut',
        data: this.dataSource
    });

    const ctx2 = document.getElementById('myChartpolararea') as HTMLCanvasElement;
    const myPieChart2 = new Chart(ctx2, {
        type: 'polarArea',
        data: this.dataSource
    });

    const ctx3 = document.getElementById('myChartbar') as HTMLCanvasElement;
    const myPieChart3 = new Chart(ctx3, {
        type: 'pie',
        data: this.dataSource
    });

  }



  createChart() {
    // const ctx = document.getElementById('myChart').getContext('2d');
    const ctx = document.getElementById('myChartdoughnut') as HTMLCanvasElement;
    const myPieChart = new Chart(ctx, {
        type: 'pie',
        data: this.dataSource
    });


}
}
