import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Evento } from '../modelo/evento.model';


@Injectable()
export class EventoServicio {
  eventosColeccion: AngularFirestoreCollection<Evento>;
  eventoDoc: AngularFirestoreDocument<Evento>;
  eventos: Observable<Evento[]>;
  evento: Observable<Evento>;

  constructor(private db: AngularFirestore) {
    this.eventosColeccion = db.collection('eventos', ref => ref.orderBy('Tipo', 'asc'));
  }

  getEventos(): Observable<Evento[]> {
    // Obtener los Eventos
    this.eventos = this.eventosColeccion.snapshotChanges().pipe(
      map( cambios => {
        return cambios.map ( accion => {
          const datos = accion.payload.doc.data() as Evento;
          datos.id = accion.payload.doc.id;
          return datos;
        });
      })
    );
    return this.eventos;
  }

  agregarEvento(evento: Evento) {
    this.eventosColeccion.add(evento);
  }
  getEvento(id: string) {
    this.eventoDoc = this.db.doc<Evento>(`eventos/${id}`);
    this.evento = this.eventoDoc.snapshotChanges().pipe(
      map ( accion => {
        if (accion.payload.exists === false) {
          return null;
        } else {
          const datos = accion.payload.data() as Evento;
          datos.id = accion.payload.id;
          return datos;
        }
      })
    );
    return this.evento;
  }

  modificarEvento(evento: Evento) {
    this.eventoDoc = this.db.doc(`eventos/${evento.id}`);
    this.eventoDoc.update(evento);
  }

  eliminarEvento(evento: Evento) {
    this.eventoDoc = this.db.doc(`eventos/${evento.id}`);
    this.eventoDoc.delete();
  }

}

