import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  togglepass: boolean = false;
  frmLogin: FormGroup;

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.verifyToken();
    this.frmLogin = this.formBuilder.group({
      nick_usu: ['', [Validators.required]],
      contra_usu: ['', [Validators.required]],
    });
  }

  onLogin():void {
    this.authService.login(this.frmLogin.value).subscribe(res => {
      if(res.status){
        this.authService.verifyToken(res.Resp.data.token).subscribe(res => {
          if(res.status){
            localStorage.setItem("ced_operador", res.Resp.data.decoded.dataUser.cedula_usu.toString());
            if(res.Resp.data.decoded.dataUser.tipo_usu == 'Operador'){
              this.router.navigateByUrl('/inicioOp');
            }else{
              this.router.navigateByUrl('/inicio');
            }
          }
        })


      }else{
        Swal.fire({
          icon: 'error',
          title: 'Credenciales invalidas',
          text: 'Usuario y/o contraseña incorrectos!',
          showConfirmButton: true,
        })
      }
    })
    }

    verifyToken(): void{
      const token = localStorage.getItem("ACCESS_TOKEN");
      if(token){
          this.authService.verifyToken(token).subscribe(res => {
            if(res.status){
              this.router.navigateByUrl('/inicio');
            }
          }, error => {
            localStorage.removeItem("ACCESS_TOKEN")
          })

      }
    }

    recUsuario(): void{
      this.router.navigateByUrl('/rusuario');
    }

    recContra(): void{
      this.router.navigateByUrl('/rcontra');
    }

}
