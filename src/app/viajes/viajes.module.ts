import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ViajesEditComponent } from './viajes-edit/viajes-edit.component';
import { ViajesCardListComponent } from './viajes-list/viajes-card-list/viajes-card-list.component';
import { ViajesFilterComponent } from './viajes-list/viajes-filter/viajes-filter.component';
import { ViajesListComponent } from './viajes-list/viajes-list.component';
import { ViajesTableListComponent } from './viajes-list/viajes-table-list/viajes-table-list.component';
import { ViajesRoutingModule } from './viajes-routing.module';

@NgModule({
  declarations: [
    ViajesListComponent,
    ViajesCardListComponent,
    ViajesTableListComponent,
    ViajesFilterComponent,
    ViajesEditComponent,
  ],
  imports: [ViajesRoutingModule, SharedModule],
})
export class ViajesModule {}
