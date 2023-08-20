import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProductoComponent } from './components/producto/producto.component';
import { productosGuard  } from '../app/productos.guard'

const routes: Routes = [
  { path:'', redirectTo:'login',pathMatch:'full' },
  { path: 'login', component: LoginComponent },
  { path: 'productos', component: ProductoComponent, canActivate : [productosGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
