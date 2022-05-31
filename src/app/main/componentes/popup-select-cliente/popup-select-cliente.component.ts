import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FacturasService } from '../../services/facturas/facturas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-popup-select-cliente',
  templateUrl: './popup-select-cliente.component.html',
  styleUrls: ['./popup-select-cliente.component.scss']
})
export class PopupSelectClienteComponent implements OnInit {
  @Input() isPopupVisible: boolean = false;
  @Input() dataFactura: any;
  @Output() salida = new EventEmitter<boolean>();
  textBoton: string = "";
  listClientes: any = [];
  clienteFactura : any;
  enviando: boolean = false;
  clientes =[{}];
  btnCrarFactura: boolean = true;
 
  constructor(
    private router: Router,
    private facturasService : FacturasService
  ) { }

  ngOnInit(): void {
    this.dataFactura ? this.textBoton = "Editar Factura" : this.textBoton = "Crear Factura";
    
    this.facturasService.listClientes().subscribe((response:any) => {
       response.result.forEach((cliente:any) => {
        this.clientes.push({
          nombre: cliente.nombre + " " + cliente.apellido,
          documento: cliente.dni
        })
      }); 
      this.listClientes = this.clientes;
    });
  }

  gestionar(){
    this.textBoton='';
    if(this.dataFactura){
    
      var dataSend = {
        id: this.dataFactura.numeroFactura,
        fechaCreacion: this.dataFactura.fechaFactura,
        valorPagado: this.dataFactura.valorPagado,
        dniPersona: this.clienteFactura.dniPersona
      }
      
      this.facturasService.ActualizarFactura(dataSend, dataSend.id).subscribe((response:any) => {
        if(response.ok){
          this.salida.emit(false);
          this.textBoton = "Editar Factura";
          this.btnCrarFactura = true;

        }else{
          Swal.fire({
            icon: 'error',
            title: response.message,
            text: response.error.errors[0],
            width: 'auto',
            showConfirmButton: true,
          });
  
          console.error('ERROR crearFactura',response.errors);
        }
        
      });
    }else{

      this.enviando = true;

      this.facturasService.crearFactura(this.clienteFactura).subscribe((response:any) => {

        this.enviando = false;

        if(response.ok){
          
          this.router.navigate(['/gestionar-factura'],{ queryParams: { id: response.result.id } });

        }else{

          this.isPopupVisible = false;
          Swal.fire({
            icon: 'error',
            title: response.message,
            text: response.error.errors[0],
            width: 'auto',
            showConfirmButton: true,
          });

          console.error('ERROR crearFactura',response.errors);
        }  
      },(error:any) =>{

        this.isPopupVisible = false;

        Swal.fire({
          icon: 'error',
          title: error.error.message,
          text:error.error.errors[0],
          width: 'auto',
          showConfirmButton: true,
        });

        console.error('ERROR crearFactura',error.error.errors[0]);
      });
    }

    this.isPopupVisible = false;
    
  }

  cliente(e:any){

    if(e.selectedItem){

      this.clienteFactura = {
        dniPersona: e.selectedItem.documento,
        valorPagado: 0
      };

      this.btnCrarFactura = false;
    }else{
      this.btnCrarFactura = true;
      this.clienteFactura = {};
    }
    
  }



}
