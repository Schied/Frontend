import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserI } from '../models/user';
import { JwtResponseI } from '../models/jwt-response';
import { ResStatusTokenI } from '../models/res-statusToken';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

interface ResI {
  status: boolean,
  Resp: {
    errorCode: string,
    message: string,
    data: {
      code: string
    }
  }
}

@Injectable()
export class AuthService {
  AUTH_SERVER: string = 'http://localhost:3000/api';
  authSubject = new BehaviorSubject(false);
  private token: string;
  constructor(private httpClient: HttpClient) { }

    rusuario(form): Observable<JwtResponseI> {
      return this.httpClient.post<JwtResponseI>(`${this.AUTH_SERVER}/users/email/usuario`,
      form).pipe(tap((res: JwtResponseI) => {
      }))
    }

    obtncodigo(form): Observable<ResI> {
      return this.httpClient.post<ResI>(`${this.AUTH_SERVER}/users/email/codigo`,
      form).pipe(tap((res: ResI) => {
      }))
    }

    actusuario(form): Observable<ResI> {
      return this.httpClient.put<ResI>(`${this.AUTH_SERVER}/users/email`,
      form).pipe(tap((res: ResI) => {
      }))
    }

    login(user: UserI): Observable<JwtResponseI> {
      return this.httpClient.post<JwtResponseI>(`${this.AUTH_SERVER}/users/signin`,
      user).pipe(tap(
        (res: JwtResponseI) => {
          if(res.status){
            this.saveToken(res.Resp.data.token);
          }
        }
      ))
    }

    verifyToken(token): Observable<ResStatusTokenI> {
      return this.httpClient.post<ResStatusTokenI>(`${this.AUTH_SERVER}/users/verify`,
      {token}).pipe(tap(
        (res: ResStatusTokenI) => {
          if(!res.status){
            this.logout();
          }
        }
      ))


    }

    logout():void{
      this.token = '';
      localStorage.removeItem("ACCESS_TOKEN");
    }

    private saveToken(token: string): void{
      localStorage.setItem("ACCESS_TOKEN", token);
      this.token = token;
    }

    private getToken():string{
      if(!this.token){
        this.token = localStorage.getItem("ACCESS_TOKEN");
      }
      return this.token;
    }

  }

