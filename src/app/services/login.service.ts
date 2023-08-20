import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginData } from '../models/login_data.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private myAppUrl = "https://distribuidoraalm.azurewebsites.net/";
  private productosUrl = "api/Login/";
  

  constructor(private http: HttpClient) { }


  login(usuario: string, password: string): Observable<LoginData> {
    return this.http.post<LoginData>(this.myAppUrl + this.productosUrl, { usuario: usuario, password: password });
  }
}
