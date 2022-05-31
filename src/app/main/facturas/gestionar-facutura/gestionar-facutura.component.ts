import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { FacturasService } from '../../services/facturas/facturas.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestionar-facutura',
  templateUrl: './gestionar-facutura.component.html',
  styleUrls: ['./gestionar-facutura.component.scss']
})
export class GestionarFacuturaComponent implements OnInit {
  nuevoProducto: any = {};
  detalleFactura: any = [];
  maxCantidad: number = 1;
  cantidadSeleccionada: number = 1;
  BlockCantidad: boolean = true;
  nombreProducto: string = '';
  totalFactura:any = 0;
  isPopupVisible: boolean = false;
  encabezado: any;
  listaProductos: any;
  constructor(
    private router: Router,
    private activatedRoute : ActivatedRoute,
    private facturasService: FacturasService
    ) {
      window.location.hash="no-back-button";
      window.location.hash="Again-No-back-button" //chrome
      window.onhashchange=function(){window.location.hash="no-back-button";}

      this.dxiDelete = this.dxiDelete.bind(this);
      this.eliminar = this.eliminar.bind(this);
    }

  ngOnInit(): void {
    this.cargarDatosFactura();
    this.cargarListaProductos();
  }

  cargarDatosFactura(){

    this.activatedRoute.queryParams.pipe(
      switchMap(((param:any) => this.facturasService.obtenerFactura(param.id))),
      switchMap(((item:any) => {
        this.encabezado = item.result.personaModel;
        this.encabezado.numeroFactura = item.result.id;
        this.encabezado.fechaFactura = item.result.fechaCreacion;
        return this.facturasService.obtenerDetalleFactura(item.result.id);
      }))
    ).subscribe((response:any) => {
      response.result.forEach((element:any) => {
        this.detalleFactura.push({
          cantidad: element.cantidadProducto,
          nombre: element.productoModel.nombre,
          precio: element.productoModel.precioVenta,
          valorTotal: element.totalFactura,
          idDetalle: element.id 
        });
      });
      this.totalFactura = this.calcularTotal();
    });

  }

  cargarListaProductos(){

    this.facturasService.listProductos().subscribe((response:any) => {
      this.listaProductos = response.result;
    });

  }


  productoSeleccionado(producto:any){
    this.nuevoProducto.idProducto = producto['itemData'].id;
    this.nuevoProducto.nombre = producto['itemData'].nombre;
    this.nuevoProducto.precio = producto['itemData'].precioVenta;
    this.maxCantidad = producto['itemData'].existencia;
    
    this.BlockCantidad = false;
  }

  registrar(){
    this.nuevoProducto.cantidad = this.cantidadSeleccionada;
    this.nuevoProducto.valorTotal = this.nuevoProducto.precio * this.nuevoProducto.cantidad;
    this.detalleFactura.push(this.nuevoProducto);
    this.nombreProducto = '';
    this.BlockCantidad = true;
    this.cantidadSeleccionada = 1;

    this.totalFactura = this.calcularTotal();
    this.facturasService.crearDetalleFactura({
      cantidadProducto: this.nuevoProducto.cantidad,
      totalFactura: this.nuevoProducto.valorTotal,
      idFactura: this.encabezado.numeroFactura,
      idProducto: this.nuevoProducto.idProducto
    }).subscribe();

    this.nuevoProducto = {};
    
  }

  calcularTotal(){
    var total:number = 0;

    this.detalleFactura.forEach((element:any) => {
      total = total + element.valorTotal
    });

    return total;
  }


  regresar(){
    var dataSend = {
      id: this.encabezado.numeroFactura,
      fechaCreacion: this.encabezado.fechaFactura,
      valorPagado: this.totalFactura,
      dniPersona: this.encabezado.dni
    }
    
    this.facturasService.ActualizarFactura(dataSend, dataSend.id).subscribe((response:any) => {
      if(response.ok){
        this.router.navigate(['facturas']);
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

  }

  editar(){
    this.encabezado.valorPagado = this.totalFactura;   
    this.isPopupVisible = true;
  }

  ouputActualizacion(e:boolean){
    this.isPopupVisible = false;
    this.cargarDatosFactura();
  }

  dxiDelete(e:any){
    this.eliminar(e.row.data.idDetalle)
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
        this.facturasService.EliminarDetFactura(id).subscribe(response => {
          this.detalleFactura = [];
          this.totalFactura = 0;
            this.cargarDatosFactura();
        })
      }
    })
  }


}
