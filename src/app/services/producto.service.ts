import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto.model';
import { TipoProducto } from '../models/tipo_producto.model';
import { Proveedor } from '../models/proveedor.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private myAppUrl = "https://distribuidoraalm.azurewebsites.net/";
  private productosUrl = "api/Producto/";
  private tiposProductoUrl = "api/TipoProducto/";
  private proveedoresUrl = "api/Proveedor/";

  private headers: HttpHeaders;

  constructor(private http: HttpClient) { 
    var token = localStorage.getItem('token');


    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
  }

  getListProductos(): Observable<Producto[]>{
    return this.http.get<Producto[]>(this.myAppUrl + this.productosUrl, { headers: this.headers });
  }

  getSearchProductos(claveProveedor: string, idProveedor: number, idTipoProducto: number): Observable<Producto[]>{
    return this.http.get<Producto[]>(this.myAppUrl + this.productosUrl + `${idProveedor}/${idTipoProducto}/${claveProveedor}`, { headers: this.headers });  }

  deleteProducto(id: number) : Observable<any>{
    return this.http.delete(this.myAppUrl + this.productosUrl + id, { headers: this.headers });
  }

  saveProducto(producto: Producto){
    return this.http.post(this.myAppUrl + this.productosUrl, producto, { headers: this.headers });
  }

  updateProducto(id: number, producto: Producto): Observable<any>{
    return this.http.put(this.myAppUrl + this.productosUrl + id, producto, { headers: this.headers });
  }


  /*Métodos adicionales para rellenar combos de tipos de producto y proveedores. Se manejan en el mismo servicio*/ 
  getListTiposProducto(): Observable<TipoProducto[]>{
    return this.http.get<TipoProducto[]>(this.myAppUrl + this.tiposProductoUrl, { headers: this.headers });
  }

  getListProveedores(): Observable<Proveedor[]>{
    return this.http.get<Proveedor[]>(this.myAppUrl + this.proveedoresUrl, { headers: this.headers });
  }
}
