import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ClientesEditComponent } from './clientes-edit/clientes-edit.component';
import { ClientesListComponent } from './clientes-list/clientes-list.component';
import { ClientesRoutingModule } from './clientes-routing.module';

@NgModule({
  declarations: [ClientesListComponent, ClientesEditComponent],
  imports: [ClientesRoutingModule, SharedModule],
})
export class ClientesModule {}
