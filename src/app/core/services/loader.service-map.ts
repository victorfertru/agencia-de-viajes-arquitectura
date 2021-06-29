import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  //lo ponemos privado para que no lo pueda manejar otro componente, solo este servicio
  private $loading = new BehaviorSubject(false);

  private requestMap: Map<string, number> = new Map<string, number>();
  constructor() {}

  showLoading(url: string): void {
    if (url) {
      const contador = this.requestMap.get(url);
      if (contador !== undefined) {
        this.requestMap.set(url, contador + 1);
      } else {
        this.requestMap.set(url, 1);
      }

      this.$loading.next(true);
    }
  }

  hideLoading(url: string): void {
    if (url) {
      const contador = this.requestMap.get(url);
      if (contador !== undefined && contador > 1) {
        this.requestMap.set(url, contador - 1);
      } else {
        this.requestMap.delete(url);
      }

      if (this.requestMap.size === 0) {
        this.$loading.next(false);
      }
    }
  }

  get loading(): Observable<boolean> {
    return this.$loading.asObservable();
  }
}
