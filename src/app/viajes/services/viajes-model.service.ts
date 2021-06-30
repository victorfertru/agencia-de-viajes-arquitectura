import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpStatusCode,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { GridEvent } from '../models/grid-event';
import { Viaje } from '../models/viaje';
import { ViajesGridResult } from '../models/viajes-grid-result';
import { ViajesFilter } from '../models/viajesFilter';

@Injectable({
  providedIn: 'root',
})
export class ViajesModelService {
  private url = 'http://localhost:3000/viajes';

  constructor(private http: HttpClient) {}

  getViajes(): Observable<ViajesGridResult> {
    let params = new HttpParams();
    params = params.set('page', 1);
    params = params.set('pageSize', 5);
    return this.http.get<ViajesGridResult>(`${this.url}`, { params }).pipe(
      map((x) => {
        return new ViajesGridResult(x);
      })
    );
  }

  getViajeById(id: string): Observable<Viaje> {
    return this.http
      .get<Viaje>(`${this.url}/${id}`)
      .pipe(map((x) => new Viaje(x)));
  }

  buscar(
    filtro: ViajesFilter | null,
    ev: GridEvent = { page: 1, pageSize: 5 }
  ): Observable<ViajesGridResult> {
    let httpP = new HttpParams();
    if (filtro) {
      const { tipoDeViajeId, nombre, destino } = filtro;
      if (filtro?.tipoDeViajeId) {
        httpP = httpP.set('tipoDeViajeId', tipoDeViajeId);
      }
      if (filtro?.nombre) {
        httpP = httpP.set('nombre', nombre);
      }
      if (filtro?.destino) {
        httpP = httpP.set('destino', destino);
      }
    }

    if (ev.page && ev.pageSize) {
      httpP = httpP.set('page', ev.page);
      httpP = httpP.set('pageSize', ev.pageSize);
    }
    return this.http
      .get<ViajesGridResult>(`${this.url}/search`, {
        params: httpP,
      })
      .pipe(map((x) => new ViajesGridResult(x)));
  }

  paging(
    filtro: ViajesFilter | null,
    ev: GridEvent = { page: 1, pageSize: 5 }
  ): Observable<ViajesGridResult | null> {
    let httpP = new HttpParams();
    if (filtro) {
      const { tipoDeViajeId, nombre, destino } = filtro;
      if (filtro?.tipoDeViajeId) {
        httpP = httpP.set('tipoDeViajeId', tipoDeViajeId);
      }
      if (filtro?.nombre) {
        httpP = httpP.set('nombre', nombre);
      }
      if (filtro?.destino) {
        httpP = httpP.set('destino', destino);
      }
    }

    if (ev.page && ev.pageSize) {
      httpP = httpP.set('page', ev.page);
      httpP = httpP.set('pageSize', ev.pageSize);
    }

    return this.http
      .get<ViajesGridResult | null>(`${this.url}`, {
        params: httpP,
      })
      .pipe(
        map((x) => {
          return new ViajesGridResult(x);
        })
      );
  }

  guardar(viaje: Viaje): Observable<Viaje | null> {
    if (!viaje) {
      return of(null);
    }

    if (viaje.id) {
      return this.http
        .put<Viaje>(`${this.url}/${viaje.id}`, viaje)
        .pipe(map((x) => new Viaje(x)));
    }

    return this.http
      .post<Viaje>(`${this.url}`, viaje)
      .pipe(map((x) => new Viaje(x)));
  }

  eliminar(id: string): Observable<boolean | null> {
    if (id) {
      return this.http
        .delete<boolean>(`${this.url}/${id}`, {
          observe: 'response',
        })
        .pipe(map((x) => x.status === HttpStatusCode.NoContent));
    }
    return of(null);
  }
}
