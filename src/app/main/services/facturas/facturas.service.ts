import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FacturasService {

  constructor(private http: HttpClient) { }

  //Metodos Factura

  listFacturas(){
    var url = `${environment.url_backend}/Factura`;
    return this.http.get(url);
  }

  crearFactura(data:any){
    var url = `${environment.url_backend}/Factura`;
    return this.http.post(url,data);
  }

  ActualizarFactura(data:any, id:number){
    var url = `${environment.url_backend}/Factura/${id}`;
    return this.http.put(url,data);
  }

  obtenerFactura(id:number){
    var url = `${environment.url_backend}/Factura/${id}`;
    return this.http.get(url);
  }

  EliminarFactura(id:number){
    var url = `${environment.url_backend}/Factura/${id}`;
    return this.http.delete(url);
  }

  //Metodos Detalle de factura

  obtenerDetalleFactura(id:number){
    var url = `${environment.url_backend}/DetFatura/${id}`;
    return this.http.get(url);
  }

  crearDetalleFactura(data:any){
    var url = `${environment.url_backend}/DetFatura`;
    return this.http.post(url,data);
  }

  EliminarDetFactura(id:number){
    var url = `${environment.url_backend}/DetFatura/${id}`;
    return this.http.delete(url);
  }

 //Metodos Persona

  listClientes(){
    var url = `${environment.url_backend}/Persona`;
    return this.http.get(url);
  }

//Metodos Producto

  listProductos(){
    var url = `${environment.url_backend}/Producto`;
    return this.http.get(url);
  }


  

  
}
