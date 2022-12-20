import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rusuario',
  templateUrl: './rusuario.component.html',
  styleUrls: ['./rusuario.component.css']
})
export class RusuarioComponent implements OnInit {

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

    onRecuperarUsu(form){
      console.log(form.value)
      this.authService.rusuario(form.value).subscribe(res => {
        if(res.status){
          Swal.fire({
            icon: 'success',
            title: 'Recuperado con exito',
            text: 'Se ha enviado el usuario al correo exitosamente!',
            showConfirmButton: false,
            timer: 1500
          })
          this.router.navigateByUrl('/');
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Fallo al recuperar',
            text: 'El correo ingresado no existe!',
            showConfirmButton: false,
            timer: 1500
          })
        }
      }, error => {
        Swal.fire({
          icon: 'error',
          title: 'Fallo al recuperar',
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
