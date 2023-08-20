import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ProductoService } from 'src/app/services/producto.service';
import { ModalProductoComponent } from '../modal-producto/modal-producto.component';
import {MatButtonModule} from '@angular/material/button';
import { Producto } from 'src/app/models/producto.model';
import { TipoProducto } from 'src/app/models/tipo_producto.model';
import { Proveedor } from 'src/app/models/proveedor.model';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent {
  listProductos: any[] = [];
  
  id: number = 0;

  listTiposProducto!: TipoProducto[];
  selectedTipoProducto!: TipoProducto;
  listProveedores!: Proveedor[];
  selectedProveedor!: Proveedor;  

  /*Variables para búsqueda de productos*/ 
  claveProveedor: string = "";
  idProveedor: number = 0;
  idTipoProducto: number = 0;


  constructor(private toastr: ToastrService, 
              private productoService: ProductoService,
              private dialog: MatDialog){
   
  }

  ngOnInit(): void {
    this.obtenerProductos();
    this.getProvedores();
    this.getTiposProducto();
  }

  obtenerProductos(){
    this.productoService.getListProductos().subscribe(data => {
      this.listProductos = data;
    }, error => {
      this.toastr.error('Ocurrió un error', 'Error');
      console.log(error);
    });
  }
  
 

  eliminarProducto(i: number){
    this.productoService.deleteProducto(i).subscribe(data => {
      this.toastr.error('Producto eliminado', 'Aviso');
      this.obtenerProductos();
    }, error => {
      this.toastr.error('Ocurrió un error', 'Error');
      console.log(error);
    });
    
  }

  abrirModalAgregar(){
    
      this.dialog.open(ModalProductoComponent, {
        width: '800px',
        height: '600px',
        data: {
          tipo: 'Agregar',
          productoComponent: this
        }
      })
  }

  abrirModalModificar(productoSeleccionado: Producto){
      this.dialog.open(ModalProductoComponent, {
        width: '800px',
        height: '600px',
        data: {
          tipo: 'Editar',
          productoComponent: this,
          productoSeleccionado: productoSeleccionado
        }
      })
    }

    getTiposProducto(){
    
      this.productoService.getListTiposProducto().subscribe(data => {
        this.listTiposProducto = data;
        this.selectedTipoProducto = this.listTiposProducto[0];
        console.log(this.selectedTipoProducto);
      }, error => {
        this.toastr.error('Ocurrió un error', 'Error');
        console.log(error);
      });
    }
  
    getProvedores(){
      this.productoService.getListProveedores().subscribe(data => {
        this.listProveedores = data;
        this.selectedProveedor = this.listProveedores[0];
        console.log(this.selectedProveedor + '___')
      }, error => {
        this.toastr.error('Ocurrió un error', 'Error');
        console.log(error);
      });
    }
    
    buscarProductos(){
      this.productoService.getSearchProductos(this.claveProveedor, this.idProveedor, this.idTipoProducto).subscribe(data => {
        this.listProductos = data;
      }, error => {
        this.toastr.error('Ocurrió un error', 'Error');
        console.log(error);
      });
    }
  }


