import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit{
  message : string = 'Vous êtes déconnecté. (pikachu/pikachu)'
  name: string;
  password: string;
  authService : AuthService;
  constructor(private auth : AuthService, private router : Router) {
  }
  ngOnInit() {
    this.authService = this.auth;
  }

  setMessage(){
    this.auth.isLoggedIn ?
        this.message = 'Vous êtes connecté.' : this.message = 'Identifiant ou mot de passe incorrect.';
  }
  login(){
    this.message = 'Tentative de connexion en cours...';
    this.auth.login(this.name, this.password)
        .subscribe((isLoggedIn : boolean) => {
          this.setMessage();
          if(isLoggedIn){
            this.router.navigate(['/pokemons'])
          } else {
            this.router.navigate(['/login'])
            this.password = '';
          }
        })
  }

  logout(){
    this.auth.logout();
    this.message = 'Vous êtes déconnecté.'
  }
}