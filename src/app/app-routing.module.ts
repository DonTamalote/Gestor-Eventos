import { AuthGuard } from './guardianes/auth.guard';
import { EditarUsuariosComponent } from './componentes/editar-usuarios/editar-usuarios.component';
import { NoEncontradoComponent } from './componentes/no-encontrado/no-encontrado.component';
import { EditarClienteComponent } from './componentes/editar-cliente/editar-cliente.component';
import { ConfiguracionComponent } from './componentes/configuracion/configuracion.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { LoginComponent } from './componentes/login/login.component';
import { TableroComponent } from './componentes/tablero/tablero.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';
import { EventosComponent } from './componentes/eventos/eventos.component';
import { EditarEventosComponent } from './componentes/editar-eventos/editar-eventos.component';
import { ConfiguracionGuard } from './guardianes/configuracion.guard';


const routes: Routes = [
  {path: '', component: TableroComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'registrarse', component: RegistroComponent, canActivate: [ConfiguracionGuard]},
  {path: 'usuarios', component: UsuariosComponent},
  {path: 'eventos', component: EventosComponent},
  {path: 'configuracion', component: ConfiguracionComponent, canActivate: [AuthGuard]},
  {path: 'cliente/editar/:id', component: EditarClienteComponent},
  {path: 'usuarios/editar/:id', component: EditarUsuariosComponent, canActivate: [AuthGuard]},
  {path: 'eventos/editar/:id', component: EditarEventosComponent, canActivate: [AuthGuard]},
  {path: '**', component: NoEncontradoComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
