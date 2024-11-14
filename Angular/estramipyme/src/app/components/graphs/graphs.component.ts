import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';
import { GlobalProviderService } from '@services/global-provider.service';

@Component({
  selector: 'app-graphs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './graphs.component.html',
  styleUrl: './graphs.component.css',
})
export class GraphsComponent {
  private el: ElementRef;
  radarCtx: HTMLHtmlElement | any;
  // elemento en el template
  @ViewChild('graph') radarEl!: ElementRef;

  globalProvider!: GlobalProviderService;

  radarChart!: Chart;

  constructor(el: ElementRef, globalProvider: GlobalProviderService) {
    this.el = el;
    this.globalProvider = globalProvider;
  }

  ngOnInit() {
    this.globalProvider.RadarData$.subscribe((value) => {
      if (this.radarEl) {
        if (this.radarChart) {
          this.radarChart.destroy();
        }
        this.renderChart(value);
      }
    });
  }

  renderChart(values: number[]) {
    //const radarCtx = document.getElementById("myChart").getContext("2d");

    const radarData = {
      labels: [
        'Coherencia del modelo de negocio',
        'Conocimiento del cliente',
        'Conocimiento del negocio',
        'Alineación en la comunicación interna',
        'Salud financiera',
      ],
      datasets: [
        {
          label: 'Tu Radar',
          data: values,
          fill: true,
          backgroundColor: 'rgba(21, 95, 231, 0.2)',
          borderColor: '#155FE7',
          pointBackgroundColor: '#155FE7',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: '#155FE7',
        },
      ],
    };

    const radarOptions: any = {
      elements: {
        line: {
          borderWidth: 2,
        },
      },
      plugins: {
        tooltip: {
          callbacks: {
            title: function () {
              return '';
            },
            label: function (context: any) {
              const label = context.chart.data.labels[context.dataIndex] || '';
              const value = context.raw;
              return `${label}: ${value}`;
            },
          },
        },
        legend: {
          display: true,
          position: 'top',
          align: 'center',
          labels: {
            font: {
              size: 14,
              family: 'Inter',
            },
            padding: 300,
          },
        },
      },
      scales: {
        r: {
          ticks: {
            beginAtZero: true,
            min: 1,
            max: 4,
            stepSize: 1,
            font: {
              size: 14,
              family: 'Inter',
            },
          },
          pointLabels: {
            font: {
              size: 14,
              color: 'black',
              family: 'Inter',
            },
          },
        },
      },
      layout: {
        padding: {
          top: 20,
        },
      },
    };

    this.radarChart = new Chart(this.radarEl.nativeElement, {
      type: 'radar',
      data: radarData,
      options: radarOptions,
    });
  }
}
