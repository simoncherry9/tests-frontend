import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData = {
    "username": '',
    "password": ''
  }

  constructor(private snack: MatSnackBar, private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {

  }

  formSumbit() {
    if (this.loginData.username.trim() == '' || this.loginData.username.trim() == null) {
      this.snack.open("Por favor, ingrese un nombre de usuario", "Aceptar", {
        duration: 4000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      })
      return;
    }

    if (this.loginData.password.trim() == '' || this.loginData.password.trim() == null) {
      this.snack.open("Por favor, ingrese una contraseña", "Aceptar", {
        duration: 4000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      })
      return;
    }

    this.loginService.generateToken(this.loginData).subscribe(
      (data: any) => {
        console.log(data);

        this.loginService.loginUser(data.token);
        this.loginService.getCurrentUser().subscribe((user: any) => {
          this.loginService.setUser(user);
          console.log(user);

          if (this.loginService.getUserRole() == "ADMIN") {
            //window.location.href = '/admin';
            this.router.navigate(['admin']);
            this.loginService.loginStatusSubject.next(true)
          } else if (this.loginService.getUserRole() == "NORMAL") {
            //window.location.href = '/user';
            this.router.navigate(['user']);
            this.loginService.loginStatusSubject.next(true)
          } else {
            this.loginService.logout();
          }
        })
      }, (error) => {
        console.log(error);
        this.snack.open("Usuario o contraseña incorrectos", "Aceptar", {
          duration: 4000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        })
      }
    )

  }

}
