import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PresupuestoService } from 'src/app/services/presupuesto.service';

@Component({
  selector: 'app-listar-gastos',
  templateUrl: './listar-gastos.component.html',
  styleUrls: ['./listar-gastos.component.css']
})
export class ListarGastosComponent implements OnInit {
subscription: Subscription;
presupuesto:number;
restante:number;
listGastos:any[]=[];

  constructor(private presupuestoService: PresupuestoService) {
    this.presupuesto = 0;
    this.restante = 0;
   this.subscription = this.presupuestoService.getGastos().subscribe(data => {
      this.restante=this.restante-data.cantidad;
      this.listGastos.push(data);
  })
  }

  ngOnInit(): void {
    this.presupuesto = this.presupuestoService.presupuesto;
    this.restante = this.presupuestoService.restante;
  }
  ngOnDestroy():void{
  this.subscription.unsubscribe();
  }
  aplicarColorRestante(){
    if(this.presupuesto/4>this.restante){
      return 'alert alert-danger';
    }else if(this.presupuesto/2>this.restante){
      return 'alert alert-warning'; 
    }else{
      return 'alert alert-secondary';
    }
  }
}