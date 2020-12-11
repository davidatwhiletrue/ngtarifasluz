import { Component } from '@angular/core';
import { Tarifa, Tarifas, TarifasService } from './tarifas.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'tarifas';
  tarifas : Tarifas | undefined;

  constructor(private tarifasService: TarifasService)
  {
    tarifasService.getTarifas().subscribe((tarifas: Tarifas) => {

      console.log("PROBANDO");
      this.tarifas = tarifas;
    });
  }
}
