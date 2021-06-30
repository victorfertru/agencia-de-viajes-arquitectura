import {
  AfterViewInit,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Viaje } from '../../models/viaje';

@Component({
  selector: 'app-viajes-table-list',
  templateUrl: './viajes-table-list.component.html',
  styleUrls: ['./viajes-table-list.component.scss'],
})
export class ViajesTableListComponent
  implements OnInit, OnChanges, AfterViewInit
{
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  @Input() viajes: Viaje[] = [];
  @Output() editar = new EventEmitter<string>();
  @Output() eliminar = new EventEmitter<Viaje>();

  dataSource = new MatTableDataSource<Viaje>();
  displayedColumns: string[] = [
    'nombre',
    'destino',
    'duracion',
    'plazas',
    'precio',
    'tipoDeViajeDesc',
    'estado',
    'fechaSalida',
    'enOferta',
    'actions',
  ];

  constructor() {}

  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.viajes) {
      this.dataSource.data = [...changes.viajes.currentValue];
    }
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }
}
