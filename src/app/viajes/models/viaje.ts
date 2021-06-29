export class Viaje {
  id: string;
  nombre: string;
  tipoDeViajeId: number;
  tipoDeViajeDesc: string;
  duracion: number;
  destino: string;
  precio: number | null;
  plazas: number;
  enOferta: boolean | null;
  estado: number | null;
  fechaSalida: Date | null;

  constructor(item?: any) {
    this.id = item?.id ?? '';
    this.nombre = item?.nombre ?? '';
    this.tipoDeViajeId = item?.tipoDeViajeId ?? null;
    this.tipoDeViajeDesc = item?.tipoDeViaje ?? '';
    this.duracion = item?.duracion ?? 0;
    this.destino = item?.destino ?? '';
    this.plazas = item?.plazas ?? 0;
    this.precio = item?.precio ?? null;
    this.enOferta = item?.enOferta ?? false;
    this.estado = item?.estado ?? null;
    this.fechaSalida = item?.fechaSalida ? new Date(item.fechaSalida) : null;
  }
}