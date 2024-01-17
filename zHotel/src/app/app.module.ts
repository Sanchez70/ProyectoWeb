import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule, Routes } from '@angular/router';
import { UserService } from './user.service';
import { ReservasComponent } from './reservas/reservas.component';
import { ClientesComponent } from './clientes/clientes.component';
import { FormClienteComponent } from './clientes/form-cliente.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClienteService } from './clientes/cliente.service';
import { ReservaService } from './reservas/reserva.service';
import { EncabezadoFacturaService } from './reservas/encabezado-factura.service';
import { DetalleFacturaService } from './reservas/detalle-factura.service';
import { HttpClientModule } from '@angular/common/http';
import { FormReservasComponent } from './reservas/form-reservas.component';
////agregados mios  edisson///
import { ServiciosComponent } from './servicios/servicios.component';
import { Servicios2Component } from './servicios2/servicios2.component';
import { ServicioService } from './servicios/servicio.service';
import { Servicio2Service } from './servicios2/servicio2.service';
import { FormComponent as ServiciosFormComponent } from './servicios/form.component';
import { HabitacionesComponent } from './habitaciones/habitaciones.component';
import { HabitacionesService } from './habitaciones/habitaciones.service';
import { PanelRecepcionComponent } from './panel-recepcion/panel-recepcion.component';
import { PanelServiciosReservasComponent } from './panel-servicios-reservas/panel-servicios-reservas.component';
import { CarrucelComponent } from './carrucel/carrucel.component';
import { FormHbitacionesComponent } from './habitaciones/form-hbitaciones.component';
import { FormComponentServi as Servicios2FormComponent } from './servicios2/form.component';
// B
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import { FormAComponent } from './login/formA.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'habitaciones', component: HabitacionesComponent },
  { path: 'panel-recepcion', component: PanelRecepcionComponent },
  { path: 'habitaciones/form/:id', component: FormHbitacionesComponent },
  { path: 'habitaciones/form', component: FormHbitacionesComponent },
  { path: 'carrucel', component: CarrucelComponent },
  { path: 'servicios', component: ServiciosComponent },
  { path: 'servicios/form', component: ServiciosFormComponent },
  { path: 'servicios/form/:id', component: ServiciosFormComponent },
  { path: 'servicios2', component: Servicios2Component },
  { path: 'servicios2/form', component: Servicios2FormComponent },
  { path: 'servicios2/form/:id', component: Servicios2FormComponent },
  { path: 'reservas/form-reservas/:id', component: FormReservasComponent },
  { path: 'clientes', component: ClientesComponent },
  { path: 'clientes/:usuario', component: ClientesComponent },
  { path: 'clientes/form', component: FormClienteComponent },
  { path: 'clientes/form/:usuario', component: FormClienteComponent },
  { path: 'login', component: LoginComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ReservasComponent,
    ClientesComponent,
    FormClienteComponent,
    FormReservasComponent,
    ServiciosComponent,
    ServiciosFormComponent,
    Servicios2FormComponent,
    PanelRecepcionComponent,
    PanelServiciosReservasComponent,
    HabitacionesComponent,
    HabitacionesComponent,
    CarrucelComponent,
    FormHbitacionesComponent,
    LoginComponent,
    FormAComponent,
    Servicios2Component,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    UserService,
    ClienteService,
    ReservaService,
    EncabezadoFacturaService,
    DetalleFacturaService,
    ServicioService,
    Servicio2Service,
    HabitacionesService,
    LoginService,
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
