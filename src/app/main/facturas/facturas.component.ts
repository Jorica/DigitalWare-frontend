import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { FacturasService } from '../services/facturas/facturas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.scss']
})
export class FacturasComponent implements OnInit {
  dataSource: any = [];
  clientes: any = [];
  productos: any = [];
  listaFacturas: undefined;
  isPopupVisible: boolean = false;
  btnCrarFactura: boolean = true;

  constructor(
    private router: Router,
    private facturasService: FacturasService
  ) { 
    this.dxiEdit = this.dxiEdit.bind(this);
    this.editar = this.editar.bind(this);
    this.dxiDelete = this.dxiDelete.bind(this);
    this.eliminar = this.eliminar.bind(this);
  }

  ngOnInit(): void {

      this.facturasService.listFacturas().subscribe((response:any) => {

      response.result.forEach((element:any) => {

        this.dataSource.push({
          Numero_Factura: element.id,
          Cliente: element.personaModel.nombre + " " + element.personaModel.apellido,
          Fecha: element.fechaCreacion,
          Valor: element.valorPagado
       });

     });

    });
  }


  editar(numFactura:any){
    this.router.navigate(['gestionar-factura'],{ queryParams: { id: numFactura } });
  }

  crearFactura(){
    this.router.navigate(['crear-factura']);
  }

  updateEmployeeInfo(e:any){
    this.btnCrarFactura = false;
  }
  
  dxiEdit(e:any) {
    this.editar(e.row.data.Numero_Factura); 
  }

  dxiDelete(e:any){
    this.eliminar(e.row.data.Numero_Factura)
  }

  eliminar(id:number){
    Swal.fire({
      title: '¿Está seguro de eliminar?',
      text: "Esta acción no se puede deshacer",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.facturasService.EliminarFactura(id).subscribe(response => {
          this.dataSource = [];
            this.ngOnInit();
        })
      }
    })
  }

}
