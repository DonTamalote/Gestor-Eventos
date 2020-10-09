import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Usuario } from 'src/app/modelo/usuario.model';
import { UsuarioServicio } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-editar-usuarios',
  templateUrl: './editar-usuarios.component.html',
  styleUrls: ['./editar-usuarios.component.css']
})
export class EditarUsuariosComponent implements OnInit {

  usuario: Usuario = {
    nombre: '',
    Apellido: '',
    email: '',
    rol: '',
  };

  id: string;

  constructor(private usuariosServicio: UsuarioServicio,
              private flashMessages: FlashMessagesService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.usuariosServicio.getUsuario(this.id).subscribe( usuario => {
      this.usuario = usuario;
    });
  }

  guardar({value, valid}: {value: Usuario, valid: boolean}) {
    if (!valid) {
      this.flashMessages.show('Por favor, llena el formulario correctamente', {
      cssClass: 'alert-danger', timeout: 4000
    });
    } else {
      value.id = this.id;
      // Modificar usuario
      this.usuariosServicio.modificarUsuario(value);
      this.router.navigate(['/usuarios']);
    }
  }

  eliminar() {
    if (confirm('Seguro que desea eliminar al usuario?')) {
      this.usuariosServicio.eliminarUsuario(this.usuario);
      this.router.navigate(['/usuarios']);
    }
  }

}
