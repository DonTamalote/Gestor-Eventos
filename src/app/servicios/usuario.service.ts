import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Usuario } from '../modelo/usuario.model';


@Injectable()
export class UsuarioServicio {
  usuariosColeccion: AngularFirestoreCollection<Usuario>;
  usuarioDoc: AngularFirestoreDocument<Usuario>;
  usuarios: Observable<Usuario[]>;
  usuario: Observable<Usuario>;

  constructor(private db: AngularFirestore) {
    this.usuariosColeccion = db.collection('usuarios', ref => ref.orderBy('nombre', 'asc'));
  }

  getUsuarios(): Observable<Usuario[]> {
    // Obtener los Usuarios
    this.usuarios = this.usuariosColeccion.snapshotChanges().pipe(
      map( cambios => {
        return cambios.map ( accion => {
          const datos = accion.payload.doc.data() as Usuario;
          datos.id = accion.payload.doc.id;
          return datos;
        });
      })
    );
    return this.usuarios;
  }

  agregarUsuario(usuario: Usuario) {
    this.usuariosColeccion.add(usuario);
  }

  getUsuario(id: string) {
    this.usuarioDoc = this.db.doc<Usuario>(`usuarios/${id}`);
    this.usuario = this.usuarioDoc.snapshotChanges().pipe(
      map ( accion => {
        if (accion.payload.exists === false) {
          return null;
        } else {
          const datos = accion.payload.data() as Usuario;
          datos.id = accion.payload.id;
          return datos;
        }
      })
    );
    return this.usuario;
  }

  modificarUsuario(usuario: Usuario) {
    this.usuarioDoc = this.db.doc(`usuarios/${usuario.id}`);
    this.usuarioDoc.update(usuario);
  }

  eliminarUsuario(usuario: Usuario) {
    this.usuarioDoc = this.db.doc(`usuarios/${usuario.id}`);
    this.usuarioDoc.delete();
  }

}

