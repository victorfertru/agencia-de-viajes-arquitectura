import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { delay, filter } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'agencia-de-viajes-arquitectura';
  elUsuarioEstaEnLogin = false;
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private loaderService: LoaderService
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe((ev: any) => {
        this.elUsuarioEstaEnLogin = ev?.url.toLowerCase().includes('login');
      });
  }

  ngOnInit(): void {
    //asignamos un pipe con delay para evitar un error en consola por el cambio tan rápido del valor en this.loading
    this.loaderService.loading.pipe(delay(0)).subscribe((x) => {
      this.loading = x;
    });
  }

  logout(): void {
    if (confirm('¿Seguro que desea cerrar la sesión?')) {
      this.authService.logOut();
      this.router.navigate(['login']);
    }
  }
  isLogged(): boolean {
    return this.authService.isUserAuthenticated;
  }
}
