import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { Usuario } from '../models/usuario';
import { ConfirmationService } from '../shared/modals/confirmation.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  userLogged: Usuario | null = null;
  constructor(
    private authService: AuthService,
    private modalService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.userLogged = this.authService.userInfo;

    if (this.userLogged) {
      this.modalService.alert({
        mensaje: `Has accedido al panel de Administración.
          Bienvenido, ${this.userLogged?.name}. `,
      });
    }
  }
}
