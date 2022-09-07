import { Component, OnInit } from '@angular/core';
import { PresupuestoService } from 'src/app/services/presupuesto.service';

@Component({
  selector: 'app-ingresar-gastos',
  templateUrl: './ingresar-gastos.component.html',
  styleUrls: ['./ingresar-gastos.component.css']
})
export class IngresarGastosComponent implements OnInit {
nombreGasto:string;
cantidad:number;
formularioIncorrecto:boolean;
textIncorrecto:string


  constructor(private presupuestoService: PresupuestoService) { 
    this.nombreGasto = '';
    this.cantidad = 0;
    this.formularioIncorrecto = false;
    this.textIncorrecto = '';
  }

  ngOnInit(): void {
  }

  agregarGasto(){
    if(this.cantidad>this.presupuestoService.restante){
      this.formularioIncorrecto = true;
      this.textIncorrecto="cantidad ingresada mayor al restante";
      return;
    }
    if (this.nombreGasto === ''||this.cantidad <= 0) {
      this.formularioIncorrecto = true;
    }else{
      //create objet
      const GASTO={
        nombre:this.nombreGasto,
        cantidad:this.cantidad
      }
       
      //enviar objeto a los subscriptores via subjet

      this.presupuestoService.agregarGasto(GASTO)

      //reset formular
      this.formularioIncorrecto = false;
      this.nombreGasto='';
      this.cantidad = 0;
    }
  }

}
