import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  //lo ponemos privado para que no lo pueda manejar otro componente, solo este servicio
  private $loading = new BehaviorSubject(false);

  private requestSet: Set<string> = new Set<string>();
  constructor() {}

  showLoading(url: string): void {
    if (url) {
      this.requestSet.add(url);
      this.$loading.next(true);
    }
  }

  hideLoading(url: string): void {
    if (url) {
      this.requestSet.delete(url);

      if (this.requestSet.size === 0) {
        this.$loading.next(false);
      }
    }
  }

  get loading(): Observable<boolean> {
    return this.$loading.asObservable();
  }
}
