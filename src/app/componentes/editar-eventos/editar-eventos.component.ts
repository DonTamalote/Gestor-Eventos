import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Evento } from 'src/app/modelo/evento.model';
import { EventoServicio } from 'src/app/servicios/evento.service';

@Component({
  selector: 'app-editar-eventos',
  templateUrl: './editar-eventos.component.html',
  styleUrls: ['./editar-eventos.component.css']
})
export class EditarEventosComponent implements OnInit {

  evento: Evento = {
    Tipo: '',
    Precio: 0
  };

  id: string;

  constructor(private eventosServicio: EventoServicio,
              private flashMessages: FlashMessagesService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.eventosServicio.getEvento(this.id).subscribe( evento => {
      this.evento = evento;
    });
  }

  guardar({value, valid}: {value: Evento, valid: boolean}) {
    if (!valid) {
      this.flashMessages.show('Por favor, llena el formulario correctamente', {
      cssClass: 'alert-danger', timeout: 4000
    });
    } else {
      value.id = this.id;
      // Modificar Evento
      this.eventosServicio.modificarEvento(value);
      this.router.navigate(['/eventos']);
    }
  }

  eliminar() {
    if (confirm('Seguro que desea eliminar el evento?')) {
      this.eventosServicio.eliminarEvento(this.evento);
      this.router.navigate(['/eventos']);
    }
  }

}
