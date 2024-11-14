import { Component, ElementRef, ViewChild } from '@angular/core';
import * as echarts from 'echarts';
import { GlobalProviderService } from '@services/global-provider.service';

export interface Circle {
  what: number[];
  how: number[];
  why: number[];
}

@Component({
  selector: 'app-graph-circle',
  standalone: true,
  imports: [],
  templateUrl: './graph-circle.component.html',
  styleUrl: './graph-circle.component.css',
})
export class GraphCircleComponent {
  chart!: echarts.ECharts;
  @ViewChild('circle') circleEl!: ElementRef;
  globalProvider!: GlobalProviderService;

  constructor(private el: ElementRef, globalProvider: GlobalProviderService) {
    this.globalProvider = globalProvider;
  }

  ngOnInit() {
    this.globalProvider.CircleData$.subscribe((value: Circle) => {
      if (this.circleEl) this.renderCicle(value);
    });
  }

  renderCicle(value: Circle) {
    this.chart = echarts.init(this.circleEl.nativeElement);

    const option = {
      tooltip: {
        trigger: 'item',
        formatter: '{b}: ({d}%)',
      },
      /*legend: {
        data: ['¿Por qué?', '¿Cómo?', '¿Qué?'],
      },*/
      series: [
        {
          name: '¿Por qué?',
          type: 'pie',
          selectedMode: 'single',
          radius: [0, '30%'],
          label: {
            show: true,
            position: 'inside',
            fontSize: 14,
          },
          labelLine: {
            show: false,
          },
          data: [
            {
              value: value.why[0],
              name: '¿Por qué?',
              itemStyle: { color: '#E5A900' },
            },
            { value: value.why[1], name: '', itemStyle: { color: 'none' } },
          ],
        },
        {
          name: '¿Cómo?',
          type: 'pie',
          radius: ['30%', '50%'],
          label: {
            show: true,
            position: 'inside',
            fontSize: 14,
          },
          labelLine: {
            show: false,
          },
          data: [
            {
              value: value.how[0],
              name: '¿Cómo?',
              itemStyle: { color: '#F7C600' },
            },
            { value: value.how[1], name: '', itemStyle: { color: 'none' } },
          ],
        },
        {
          name: '¿Qué?',
          type: 'pie',
          radius: ['50%', '70%'],
          label: {
            show: true,
            position: 'inside',
            fontSize: 14,
          },
          labelLine: {
            show: false,
          },
          data: [
            {
              value: value.what[0],
              name: '¿Qué?',
              itemStyle: { color: '#F8D300 ' },
            },
            { value: value.what[1], name: '', itemStyle: { color: 'none' } },
          ],
        },
      ],
    };

    // updateChart(seriesIndex, percentage) {
    //   let updatedOption = chart.getOption);
    //   updatedOption.series[seriesIndex].data[0].value = percentage;
    //   updatedOption.series[seriesIndex].data[1].value = 100 - percentage;(
    this.chart.setOption(option);
  }
}

// label: {
//   show: true,
//   position: "inside",
//   formatter: "¿Por Qué?",
//   fontSize: 10,
//   fontFamily: "Inter",
//   color: "#000",
// },
// emphasis: {
//   label: {
//     show: true,
//     fontSize: 20,
//     fontFamily: "Inter",
//     fontWeight: "bold",
//   },

// changeCircle1() {
//   const answer = {
//     40: '4',
//     41: '4',
//     42: '4',
//     43: '3'
//   };
//
//   let acum = 0;
//   let count = 0;
//
//   for (const prop in answer) {
//     if (prop >= 40 && prop <= 43) {
//       acum += parseFloat(answer[prop]);
//       count += 1;
//     }
//   }
//
//   const percentage = (count > 0) ? (acum / (count * 4) * 100) : 0;
//   console.log("Porcentaje ¿Por qué?:", percentage);
//   this.updateChart(0, percentage);
// }

// changeCircle2() {
//   const answer = {
//     44: '4',
//     45: '4',
//     46: '4',
//     47: '3'
//   };
//
//   let acum = 0;
//   let count = 0;
//
//   for (const prop in answer) {
//     if (prop >= 44 && prop <= 47) {
//       acum += parseFloat(answer[prop]);
//       count += 1;
//     }
//   }
//
//   const percentage = (count > 0) ? (acum / (count * 4) * 100) : 0;
//   console.log("Porcentaje ¿Cómo?:", percentage);
//   this.updateChart(1, percentage);
// }

//   changeCircle3() {
//     const answer = {
//       48: '3',
//       49: '2',
//       50: '4',
//       51: '1',
//       52: '5'
//     };
//
//     let acum = 0;
//     let count = 0;
//
//     for (const prop in answer) {
//       if (prop >= 48 && prop <= 52) {
//         acum += parseFloat(answer[prop]);
//         count += 1;
//       }
//     }
//
//     const percentage = (count > 0) ? (acum / (count * 5) * 100) : 0;
//     console.log("Porcentaje ¿Qué?:", percentage);
//     this.updateChart(2, percentage);
//   }
// }

//circulo

// document.addEventListener('DOMContentLoaded', function () {
//   const chart = echarts.init(document.getElementById("circleChart"));
//
//
//   chart.setOption(option)
