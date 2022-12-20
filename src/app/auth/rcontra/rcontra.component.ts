import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rcontra',
  templateUrl: './rcontra.component.html',
  styleUrls: ['./rcontra.component.css']
})
export class RcontraComponent implements OnInit {

  codigo: boolean = false;
  cod: string = "";
  correo: string = "";

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.verifyToken();
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

    onRecuperarContra(form){
      if(this.cod == form.value.codigo){
        sessionStorage.setItem('correo', this.correo);
        Swal.fire({
          icon: 'success',
          title: 'Código valido',
          text: 'El código ingresado coincide!',
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigateByUrl('/actusuario');
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Código invalido',
          text: 'El código ingresado no coincide!',
          showConfirmButton: false,
          timer: 1500
        })
      }

    }

    onObtnCodigo(form): void{
      this.authService.obtncodigo(form.value).subscribe(res => {
        if(res.status){
          Swal.fire({
            icon: 'success',
            title: 'Código enviado',
            text: 'Se ha enviado el código de verificación al correo exitosamente!',
            showConfirmButton: false,
            timer: 1500
          })
          this.cod = res.Resp.data.code;
          this.codigo = true;
          this.correo = form.value.correo;
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Fallo al obtener',
            text: 'El correo ingresado no existe!',
            showConfirmButton: false,
            timer: 1500
          })
        }
      }, error => {
        Swal.fire({
          icon: 'error',
          title: 'Fallo al obtener',
          text: 'El correo ingresado no existe!',
          showConfirmButton: false,
          timer: 1500
        })
      })
    }

    back(): void{
      this.router.navigateByUrl('/');
    }

}
