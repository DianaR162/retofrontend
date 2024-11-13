import {computed, effect, inject, Injectable, signal} from '@angular/core';
import {DataProcService} from '@services/data-proc.service';
import {BehaviorSubject} from 'rxjs';

type Answer =
  | {}
  | {
  [key: number]: string;
};

export interface Circle {
  what: number[];
  how: number[];
  why: number[];
}

@Injectable({
  providedIn: 'root',
})
export class GlobalProviderService {
  answers = signal<Answer>({});
  private progress = new BehaviorSubject<number>(0);
  numberOfQuestions = 51;
  private dataProc = inject(DataProcService);

  private RadarData: BehaviorSubject<number[]> = new BehaviorSubject([
    1, 2, 3, 4, 5,
  ]);
  private CircleData: BehaviorSubject<Circle> = new BehaviorSubject({
    what: [90, 10],
    how: [90, 10],
    why: [90, 10],
  });
  private isLogged: BehaviorSubject<boolean> = new BehaviorSubject(false);
  Progress$ = this.progress.asObservable();
  RadarData$ = this.RadarData.asObservable();
  CircleData$ = this.CircleData.asObservable();
  IsLogged$ = this.isLogged.asObservable();
  cliente: string[] = [];
  negocio: string[] = [];
  coherencia: string[] = [];
  alineacion: string[] = [];
  financiera: string[] = [];
  circuloQue!: string[];
  circuloComo!: string[];
  circuloPorQue!: string[];
  scores = computed(() => {
    console.log('compute scores');
    console.log(this.answers());
    //console.log(this.cliente)
    return this.getScores();
  });

  constructor() {
    this.setLogging(Boolean(sessionStorage.getItem('TOKEN')))

    this.dataProc.getItems('http://localhost:3000/questions').subscribe({
      next: (questions) => {
        this.numberOfQuestions = questions.length; //Obtener los ids
        this.cliente = questions
          .filter((e) => e.section === 'cliente')
          .map((q) => String(q.id));
        this.negocio = questions
          .filter((e) => e.section === 'negocio')
          .map((q) => String(q.id));
        this.coherencia = questions
          .filter((e) => e.section === 'coherencia')
          .map((q) => String(q.id));
        this.alineacion = questions
          .filter((e) => e.section === 'alineacion')
          .map((q) => String(q.id));
        this.financiera = questions
          .filter((e) => e.section === 'financiera')
          .map((q) => String(q.id));
        this.circuloQue = questions
          .filter((e) => e.section === 'circulo' && e.subsection === 'que')
          .map((q) => String(q.id));
        this.circuloComo = questions
          .filter((e) => e.section === 'circulo' && e.subsection === 'como')
          .map((q) => String(q.id));
        this.circuloPorQue = questions
          .filter((e) => e.section === 'circulo' && e.subsection === 'por que')
          .map((q) => String(q.id));

        console.log(this.circuloComo);
        console.log('circuloComo');
        //console.log(this.answers())
        //console.log("ruuun")
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  setLocalStorage(id: number | string, value: string) {
    const newValue = {
      [id]: value,
    };

    this.answers.update((prevValue) => {
      return {...prevValue, ...newValue};
    });
    localStorage.setItem('estramipyme', JSON.stringify(this.answers()));
    this.getProgress();
    this.getRadarData();
    this.getCircleData();
  }

  getLocalStorage() {
    const storedDataString = localStorage.getItem('estramipyme');
    if (storedDataString == null) return;
    const data: object = JSON.parse(storedDataString);
    if (!data) return;
    this.answers.update(() => {
      return {...this.answers(), ...data};
    });
    this.getProgress();
    this.getRadarData();
    this.getCircleData();
  }

  getProgress() {
    if (!this.answers())
      this.progress.next(
        Math.ceil(
          (Object.keys(this.answers()).length / this.numberOfQuestions) * 100
        )
      );
    if (!this.numberOfQuestions)
      this.progress.next(
        Math.ceil(
          (Object.keys(this.answers()).length / this.numberOfQuestions) * 100
        )
      );
    this.progress.next(
      Math.ceil(
        (Object.keys(this.answers()).length / this.numberOfQuestions) * 100
      )
    );
  }

  getScores(): number[] {
    let clientAcc = 0;
    let negocioAcc = 0;
    let coherenciaAcc = 0;
    let alineacionAcc = 0;
    let financieraAcc = 0;
    const tCliente = +this.cliente.length;
    const tNegocio = +this.negocio.length;
    const tCoherencia = +this.coherencia.length;
    const tAlineacion = +this.alineacion.length;
    const tFinanciera = +this.financiera.length;

    Object.entries(this.answers()).forEach(([key, value]) => {
      //console.log(key, value);

      if (this.cliente.includes(key)) {
        clientAcc += Number(value);
      }
      if (this.negocio.includes(key)) {
        negocioAcc += Number(value);
      }
      if (this.coherencia.includes(key)) {
        coherenciaAcc += Number(value);
      }
      if (this.alineacion.includes(key)) {
        alineacionAcc += Number(value);
      }
      if (this.financiera.includes(key)) {
        financieraAcc += Number(value);
      }
    });

    return [
      Number(((coherenciaAcc / (tCoherencia * 4)) * 4).toFixed(2)),
      Number(((financieraAcc / (tFinanciera * 4)) * 4).toFixed(2)),
      Number(((clientAcc / (tCliente * 4)) * 4).toFixed(2)),
      Number(((alineacionAcc / (tAlineacion * 4)) * 4).toFixed(2)),
      Number(((negocioAcc / (tNegocio * 4)) * 4).toFixed(2)),
    ];
  }

  getCircle() {
    let comoAcc = 0;
    let queAcc = 0;
    let porQueAcc = 0;
    const total = 4;

    Object.entries(this.answers()).forEach(([key, value]) => {
      //console.log(key, value);

      if (this.circuloQue.includes(key)) {
        queAcc += Number(value);
      }
      if (this.circuloComo.includes(key)) {
        comoAcc += Number(value);
      }
      if (this.circuloPorQue.includes(key)) {
        porQueAcc += Number(value);
      }
    });

    console.log('conteo');
    console.log(this.circuloQue);
    console.log(porQueAcc);
    console.log(comoAcc);

    return {
      what: [(queAcc / (total * 4)) * 100, 100 - (queAcc / (total * 4)) * 100],
      how: [(comoAcc / (total * 4)) * 100, 100 - (comoAcc / (total * 4)) * 100],
      why: [
        (porQueAcc / (total * 4)) * 100,
        100 - (porQueAcc / (total * 4)) * 100,
      ],
    };
  }

  getRadarData() {
    this.RadarData.next(this.getScores());
  }

  setLogging(value: boolean) {
    this.isLogged.next(value);
  }

  getCircleData() {
    this.CircleData.next(this.getCircle());
  }

  reset() {
    this.answers.set({})
    localStorage.removeItem("estramipyme");
    this.progress.next(0)
  }
}
