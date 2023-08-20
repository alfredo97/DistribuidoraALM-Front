import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto.model';
import { Proveedor } from 'src/app/models/proveedor.model';
import { TipoProducto } from 'src/app/models/tipo_producto.model';
import { ProductoService } from 'src/app/services/producto.service';


@Component({
  selector: 'app-modal-producto',
  templateUrl: './modal-producto.component.html',
  styleUrls: ['./modal-producto.component.css']
})
export class ModalProductoComponent {
  form: FormGroup;
  accion!: string;
  id: number = 0;
  listTiposProducto!: TipoProducto[];
  selectedTipoProducto!: TipoProducto;
  listProveedores!: Proveedor[];
  selectedProveedor!: Proveedor;  
  
  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
              private fb: FormBuilder, 
              private toastr: ToastrService, 
              private productoService: ProductoService,
              private ref:MatDialogRef<ModalProductoComponent>){
    if(data.tipo == 'Agregar') {
      this.form = this.fb.group({
        id: [0],
        nombre: ['', Validators.required], 
        claveProductoProveedor: ['', [Validators.required, Validators.pattern("^ALM\-[0-9]{5}$")]],
        costoProveedor: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
        precio: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
        tipoProducto: [0],
        idProveedor: [0],
        esActivo: true
      });
    } else {
      this.form = this.fb.group({
        id: [data.productoSeleccionado.id],
        nombre: [data.productoSeleccionado.nombre, Validators.required], 
        claveProductoProveedor: [data.productoSeleccionado.claveProductoProveedor, [Validators.required, Validators.pattern("^ALM\-[0-9]{5}$")]],
        costoProveedor: [data.productoSeleccionado.costoProveedor, [Validators.required, Validators.pattern("^[0-9]*$")]],
        precio: [data.productoSeleccionado.precio, [Validators.required, Validators.pattern("^[0-9]*$")]],
        tipoProducto: [data.productoSeleccionado.tipoProducto],
        idProveedor: [data.productoSeleccionado.idProveedor],
        esActivo: true
      });
    }
    
    this.accion = data.tipo;
  }

  ngOnInit() : void{
    
    this.getProvedores();
    this.getTiposProducto();
    
  }

  agregarModificarProducto(){
    if(this.accion == "Agregar"){
      this.agregarProducto();
    } else if (this.accion == 'Editar') {
      this.modificarProducto();
    }
  }

  agregarProducto(){
    const producto:Producto = this.form.value;

    this.productoService.saveProducto(producto).subscribe(data => {
      this.toastr.success('Producto agregado', 'Aviso');
      //this.obtenerProductos();
      this.form.reset();
      this.cerrarModal();
      this.data.productoComponent.obtenerProductos();
    }, error => {
      this.toastr.error('Ocurrió un error:' + error, 'Error');
      console.log(error);
    });
  }

  modificarProducto(){
    const producto:Producto = this.form.value;
    console.log(producto)
    this.productoService.updateProducto(producto.id, producto).subscribe(data => {
      this.toastr.info('Producto modificado', 'Aviso');
      //this.obtenerProductos();
      this.form.reset();
      this.cerrarModal();
      this.data.productoComponent.obtenerProductos();
    }, error => {
      this.toastr.error('Ocurrió un error:' + error, 'Error');
      console.log(error);
    });
  }

  cerrarModal() {
    this.ref.close();
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
}
