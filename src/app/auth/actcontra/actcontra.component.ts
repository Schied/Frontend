import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actcontra',
  templateUrl: './actcontra.component.html',
  styleUrls: ['./actcontra.component.css']
})
export class ActcontraComponent implements OnInit {

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

    onActualizar(form){
      if(form.value.contra != form.value.vcontra){
        Swal.fire({
          icon: 'info',
          title: 'Contraseñas no coinciden',
          text: 'Las contraseñas deben coincidir!',
          showConfirmButton: false,
          timer: 1500
        })
      }else{
        let act = {
          contra_usu: form.value.contra,
          correo_usu: sessionStorage.getItem('correo')
        }
        this.authService.actusuario(act).subscribe(res => {
          if(res.status){
            Swal.fire({
              icon: 'success',
              title: 'Contraseña actualizada',
              text: 'Se ha actualizado la contraseña exitosamente!',
              showConfirmButton: false,
              timer: 1500
            })
            this.router.navigateByUrl('/');
          }else{
            Swal.fire({
              icon: 'error',
              title: 'Fallo al actualizar',
              text: 'No se ha actualizado la contraseña!',
              showConfirmButton: false,
              timer: 1500
            })
          }
        }, error => {
          Swal.fire({
            icon: 'error',
            title: 'Fallo al actualizar',
            text: 'No se ha actualizado la contraseña!',
            showConfirmButton: false,
            timer: 1500
          })
        })
      }
    }

    back(): void{
      this.router.navigateByUrl('/');
    }

}
