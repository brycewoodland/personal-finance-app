import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-dashboard-graph',
  templateUrl: './dashboard-graph.component.html',
  styleUrls: ['./dashboard-graph.component.css'],
  standalone: false
})
export class DashboardGraphComponent implements OnInit {
  @ViewChild('overallGraph') canvasRef!: ElementRef;
  private chart: Chart | null = null;

  ngOnInit() {
    // Wait for the view to be initialized
    setTimeout(() => {
      this.initializeChart();
    });
  }

  private initializeChart() {
    const ctx = this.canvasRef.nativeElement.getContext('2d');

    const config: ChartConfiguration = {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Monthly Spending',
          data: [1200, 1900, 1500, 2500, 2200, 3000],
          borderColor: '#0057A0',
          backgroundColor: 'rgba(0, 87, 160, 0.1)',
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Monthly Spending Overview'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.1)'
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        }
      }
    };

    this.chart = new Chart(ctx, config);
  }
}
