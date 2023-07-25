import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public user = {
    username: '',
    password: '',
    nombre: '',
    apellido: '',
    email: '',
    telefono: ''
  }

  constructor(private userService: UserService, private snack: MatSnackBar) { }

  ngOnInit(): void { }

  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  formSubmit() {
    console.log(this.user);

    if (this.user.username == '' || this.user.username == null) {
      this.snack.open("El nombre de usuario es requerido", "Aceptar", {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
      return;
    }

    if (this.user.email == '' || this.user.email == null) {
      this.snack.open("El email es requerido", "Aceptar", {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
      return;
    }

    if (!this.validateEmail(this.user.email)) {
      this.snack.open("El email ingresado no es válido", "Aceptar", {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
      return;
    }

    if (this.user.nombre == '' || this.user.nombre == null) {
      this.snack.open("El nombre es requerido", "Aceptar", {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
      return;
    }

    if (this.user.apellido == '' || this.user.apellido == null) {
      this.snack.open("El apellido es requerido", "Aceptar", {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
      return;
    }

    if (this.user.telefono == '' || this.user.telefono == null) {
      this.snack.open("El teléfono es requerido", "Aceptar", {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
      return;
    }

    if (this.user.password == '' || this.user.password == null) {
      this.snack.open("La contraseña es requerida", "Aceptar", {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
      return;
    }

    this.userService.añadirUsuario(this.user).subscribe(
      (data) => {
        console.log(data);
        Swal.fire('Usuario creado', 'Usuario registrado con éxito', 'success');
      }, (error) => {
        let errorMessage = 'Ha ocurrido un error en el sistema';

        if (error.status === 400) {
          errorMessage = 'Error interno del servidor. Por favor, intenta de nuevo más tarde';
        } else if (error.status === 500) {
          errorMessage = 'El nombre de usuario, email o teléfono ya están en uso';
        }

        this.snack.open(errorMessage, "Aceptar", {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        });
      }
    );
  }
}
