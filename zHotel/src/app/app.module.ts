import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule, Routes } from '@angular/router';
import { ReservasComponent } from './reservas/reservas.component';
import { ClientesComponent } from './clientes/clientes.component';
import { FormClienteComponent } from './clientes/form-cliente.component';
import { FormsModule } from '@angular/forms';
import { ClienteService } from './clientes/cliente.service';
import { ReservaService } from './reservas/reserva.service';
import { EncabezadoFacturaService } from './reservas/encabezado-factura.service';
import { DetalleFacturaService } from './reservas/detalle-factura.service';
import { HttpClientModule } from '@angular/common/http';
import { FormReservasComponent } from './reservas/form-reservas.component';
////agregados mios  edisson///
import { ServiciosComponent } from './servicios/servicios.component';
import { ServicioService } from './servicios/servicio.service';
import { FormComponent as ServiciosFormComponent } from './servicios/form.component';
import { HabitacionesComponent } from './habitaciones/habitaciones.component';
import { HabitacionesService } from './habitaciones/habitaciones.service';
import { PanelRecepcionComponent } from './panel-recepcion/panel-recepcion.component';
import { PanelServiciosReservasComponent } from './panel-servicios-reservas/panel-servicios-reservas.component';
import { CarrucelComponent } from './carrucel/carrucel.component';
import { FormHbitacionesComponent } from './habitaciones/form-hbitaciones.component';

// B
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import { FormAComponent } from './login/formA.component';
import { FormServiSoliComponent } from './servicios/form-servi-soli.component';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: 'habitaciones', component: HabitacionesComponent },
  { path: 'habitaciones/form/:id', component: FormHbitacionesComponent },
  { path: 'habitaciones/form', component: FormHbitacionesComponent },
  { path: 'carrucel', component: CarrucelComponent },
  { path: 'servicios', component: ServiciosComponent },
  { path: 'servicios/form', component: ServiciosFormComponent },
  { path: 'servicios/form/:id', component: ServiciosFormComponent },
  { path: 'servicios/form-servi-soli', component: FormServiSoliComponent },
  { path: 'servicios/form-servi-soli/:id', component: FormServiSoliComponent },
  { path: 'reservas/form', component: FormReservasComponent },
  { path: 'clientes', component: ClientesComponent },
  { path: 'clientes/form', component: FormClienteComponent },
  { path: 'clientes/form/id', component: FormClienteComponent },
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
    FormServiSoliComponent,
    PanelRecepcionComponent,
    PanelServiciosReservasComponent,
    HabitacionesComponent,
    HabitacionesComponent,
    CarrucelComponent,
    FormHbitacionesComponent,
    LoginComponent,
    FormAComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    ClienteService,
    ReservaService,
    EncabezadoFacturaService,
    DetalleFacturaService,
    ServicioService,
    HabitacionesService,
    LoginService,
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
