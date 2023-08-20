import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  type: string = 'password';
  eyeIcon: string = 'fa fa-eye-slash';
  loginForm!: FormGroup;

  constructor(private toastr: ToastrService, 
              private fb: FormBuilder, 
              private loginService: LoginService,
              private router: Router) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  mostrarOcultarPassword() {
    if(this.type == 'password') {
      this.type = 'text';
      this.eyeIcon = 'fa fa-eye';
    }
    else {
      this.type = 'password';
      this.eyeIcon = 'fa fa-eye-slash';
    }
  }

  iniciarSesion() {
    var usuario = this.loginForm.get('usuario');
    var password = this.loginForm.get('password');
    if(this.loginForm.valid){
      
      
      this.loginService.login(usuario?.value, password?.value).subscribe(data => {   
    
        localStorage.setItem('login', 'true');
         localStorage.setItem('token', data.token);
        this.router.navigate(['/productos']);
      }, error => {
        localStorage.setItem('login', 'false');
        this.toastr.error('Usuario y/o contraseña incorrectas', 'Error');
        console.log(error);
      });  
    }
  }
}
