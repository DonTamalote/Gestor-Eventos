import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Evento } from 'src/app/modelo/evento.model';
import { EventoServicio } from 'src/app/servicios/evento.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

  eventos: Evento[];
  evento: Evento = {
    Tipo: '',
    Precio: 0
  };

  @ViewChild('eventoForm') eventoForm: NgForm;
  @ViewChild('botonCerrar') botonCerrar: ElementRef;

  constructor(private eventosServicio: EventoServicio,
              private flashMessages: FlashMessagesService) { }

  ngOnInit(): void {
    this.eventosServicio.getEventos().subscribe(
      eventos => {
        this.eventos = eventos;
      }
    );
  }

  agregar({ value, valid }: { value: Evento, valid: boolean }) {
    if (!valid) {
      this.flashMessages.show('Por favor, llena los campos correctamente', {
        cssClass: 'alert-danger', timeout: 4000
      });
    } else {
      //Agregar el nuevo Evento
      this.eventosServicio.agregarEvento(value);
      this.eventoForm.resetForm();
      this.cerrarModal();
    }
  }

  private cerrarModal() {
    this.botonCerrar.nativeElement.click();
  }

}

