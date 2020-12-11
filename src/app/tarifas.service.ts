import { Injectable } from '@angular/core';
import { Observable, throwError, zip } from 'rxjs';
import { catchError, retry, combineLatest } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { format } from 'date-fns';

export interface Tarifa {
  date: string,
  values: number[],
}
export interface Tarifas {
  tarifaA: Tarifa,
  tarifaDHA: Tarifa,
  tarifaDHS:Tarifa,
}

@Injectable({
  providedIn: 'root'
})
export class TarifasService {

  tarifaA: Tarifa | undefined;
  tarifaDHA: Tarifa | undefined;
  tarifaDHS: Tarifa | undefined;

  constructor(private http: HttpClient) { }

  tarifasUrl = 'https://us-central1-tarifasluz.cloudfunctions.net/getTarifas';

  getTarifas(): Observable<Tarifas> {

    const tAurl = `${this.tarifasUrl}?startdate=${format(new Date(), "yyyy-MM-dd")}&tarifa=A`;
    const t1$ = this.http.get<Tarifa>(tAurl);

    const tDHAurl = `${this.tarifasUrl}?startdate=${format(new Date(), "yyyy-MM-dd")}&tarifa=DHA`;
    const t2$ = this.http.get<Tarifa>(tDHAurl);

    const tDHSurl = `${this.tarifasUrl}?startdate=${format(new Date(), "yyyy-MM-dd")}&tarifa=DHS`;
    const t3$ = this.http.get<Tarifa>(tDHSurl);

    return zip(t1$, t2$, t3$, (tA: Tarifa, tDHA: Tarifa, tDHS: Tarifa) => {
      return {
        tarifaA: tA,
        tarifaDHA: tDHA,
        tarifaDHS: tDHS,
      };
    })
  }
}
