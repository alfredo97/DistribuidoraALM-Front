import { SelectorContext } from '@angular/compiler';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DistribuidoraALM';
  sesionIniciada: boolean = false ;

  constructor(private router: Router) {
    
    
  }

  urlPrincipal(){
    return this.estaLogueado() ? 'productos' : 'login';
  }

  cerrarSesion(){
    localStorage.setItem('login', 'false');
    this.router.navigate(['/login']);
  }

  estaLogueado(){
    return localStorage.getItem('login') == "true";
  }
}
