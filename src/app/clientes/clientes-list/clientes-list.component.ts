import { Component, OnInit } from '@angular/core';
import { ClientesModelService } from '../services/clientes-model.service';
import { ClienteListItem } from '../models/clientes-list-item';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmationService } from 'src/app/shared/modals/confirmation.service';

@Component({
  selector: 'app-clientes-list',
  templateUrl: './clientes-list.component.html',
  styleUrls: ['./clientes-list.component.scss'],
})
export class ClientesListComponent implements OnInit {
  clientes = new MatTableDataSource<ClienteListItem>([]);

  displayedColumns: string[] = [
    'pos',
    'nombre',
    'dni',
    'telefono',
    'estadoCivilDesc',
    'actions',
  ];

  constructor(
    private clientesModel: ClientesModelService,
    private router: Router,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.clientesModel.getAll().subscribe((data) => {
      this.clientes.data = [...data];
    });
  }

  editarClick(id: string): void {
    if (id) {
      this.clientesModel.getById(id).subscribe((cliente) => {
        if (cliente) {
          this.router.navigate(['clientes/editar', id]);
        }
      });
    }
  }

  borrarClick(cliente: ClienteListItem): void {
    if (cliente) {
      this.confirmationService
        .confirmar({
          titulo: 'Eliminar Cliente',
          pregunta: `¿Seguro que desea eliminar el cliente ${cliente.nombre} con dni ${cliente.dni}?`,
          opcionSi: 'Sí, eliminar',
          opcionNo: 'No, cancelar',
        })
        .subscribe((x) => {
          if (x) {
            this.clientesModel.delete(cliente.id).subscribe((resultado) => {
              if (resultado) {
                this.cargarClientes();
              }
            });
          }
        });
    }
  }

  private cargarClientes() {
    this.clientesModel.getAll().subscribe((x) => {
      this.clientes.data = x;
    });
  }
}
