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
            data: [1],
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
    labels: ['a']
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
  }


  createChart() {
    // const ctx = document.getElementById('myChart').getContext('2d');
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    const myPieChart = new Chart(ctx, {
        type: 'pie',
        data: this.dataSource
    });


}
}
