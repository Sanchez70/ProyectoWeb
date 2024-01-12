import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule,Routes } from '@angular/router';
import { ReservasComponent } from './reservas/reservas.component';
import { ClientesComponent } from './clientes/clientes.component';
import { FormClienteComponent } from './clientes/form-cliente.component';
import { FormsModule } from '@angular/forms';
import { ClienteService } from './clientes/cliente.service';
import { ReservaService } from './reservas/reserva.service';
import { EncabezadoFacturaService } from './reservas/encabezado-factura.service';
import { DetalleFacturaService } from './reservas/detalle-factura.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormReservasComponent } from './reservas/form-reservas.component';
////agregados mios ///
import { ServiciosComponent } from './servicios/servicios.component';
import { ServicioService } from './servicios/servicio.service';
import { FormComponent as ServiciosFormComponent } from './servicios/form.component';
const routes: Routes = [
  {path: '', redirectTo: '', pathMatch: 'full'},
  { path: 'servicios', component: ServiciosComponent },
  { path: 'servicios/form', component: ServiciosFormComponent },
  { path: 'servicios/form/:id', component: ServiciosFormComponent },
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
    ServiciosComponent
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
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
