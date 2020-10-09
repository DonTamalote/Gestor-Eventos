import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Usuario } from 'src/app/modelo/usuario.model';
import { UsuarioServicio } from 'src/app/servicios/usuario.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[];
  usuario: Usuario = {
    nombre: '',
    Apellido: '',
    email: '',
    rol: '',
  };

  @ViewChild('usuarioForm') usuarioForm: NgForm;
  @ViewChild('botonCerrar') botonCerrar: ElementRef;

  constructor(private usuariosServicio: UsuarioServicio,
              private flashMessages: FlashMessagesService) { }

  ngOnInit(): void {
    this.usuariosServicio.getUsuarios().subscribe(
      usuarios => {
        this.usuarios = usuarios;
      }
    );
  }

  agregar({ value, valid }: { value: Usuario, valid: boolean }) {
    if (!valid) {
      this.flashMessages.show('Por favor, llena los campos correctamente', {
        cssClass: 'alert-danger', timeout: 4000
      });
    } else {
      // Agregar el nuevo usuario
      this.usuariosServicio.agregarUsuario(value);
      this.usuarioForm.resetForm();
      this.cerrarModal();
    }
  }

  private cerrarModal() {
    this.botonCerrar.nativeElement.click();
  }

}
