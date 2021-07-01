import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Viaje } from '../models/viaje';
import { ViajesFilter } from '../models/viajesFilter';
import { ViajesModelService } from '../services/viajes-model.service';
import { TiposDeViajesModelService } from '../services/tipos-de-viajes-model.service';
import { TiposDeViajes } from '../models/tiposDeViajes';
import { GridEvent } from '../models/grid-event';
import { ViajesGridResult } from '../models/viajes-grid-result';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationModalComponent } from 'src/app/shared/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-viajes-list',
  templateUrl: './viajes-list.component.html',
  styleUrls: ['./viajes-list.component.scss'],
})
export class ViajesListComponent implements OnInit {
  viajes: ViajesGridResult = new ViajesGridResult();
  tiposDeViaje: TiposDeViajes[] = [];

  mostrarTarjetas = false;

  filtro: ViajesFilter | null = null;

  constructor(
    private viajesModel: ViajesModelService,
    private tiposModel: TiposDeViajesModelService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.cargarViajes();
    this.tiposModel.getAll().subscribe((data) => {
      this.tiposDeViaje = data;
    });
  }

  cambiarVistaClick() {
    this.mostrarTarjetas = !this.mostrarTarjetas;
  }

  searchClick(filtro: ViajesFilter): void {
    if (filtro) {
      this.filtro = filtro;
      this.viajesModel
        .buscar(filtro)
        .subscribe((viaje) => (this.viajes = viaje));
    }
  }

  eliminarClick(viaje: Viaje): void {
    if (viaje) {
      this.dialog
        .open(ConfirmationModalComponent, {
          data: {
            titulo: 'Eliminar Viaje',
            pregunta: `¿Seguro que desea eliminar el viaje ${viaje.nombre} con destino ${viaje.destino}?`,
            opcionSi: 'Sí, eliminar',
            opcionNo: 'No, cancelar',
          },
        })
        .afterClosed()
        .subscribe((x) => {
          if (x) {
            this.viajesModel.eliminar(viaje.id).subscribe((resultado) => {
              if (resultado) {
                this.cargarViajes();
              }
            });
          }
        });
    }
  }

  editarClick(id: string): void {
    if (id) {
      this.viajesModel.getViajeById(id).subscribe((viaje) => {
        if (viaje) {
          this.router.navigate(['viajes/editar', id]);
        }
      });
    }
  }

  private cargarViajes() {
    this.viajesModel.getViajes().subscribe((x) => {
      this.viajes = x;
    });
  }

  paging(ev: GridEvent): void {
    this.viajesModel.buscar(this.filtro, ev).subscribe((result) => {
      if (result) {
        this.viajes = result;
      }
    });
  }
}
