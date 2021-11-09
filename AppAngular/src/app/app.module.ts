import { ColaboradoresService } from './colaboradores.service';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { ModalModule } from 'ngx-bootstrap/modal';
import { ColaboradoresComponent } from './Modals/colaboradores/colaboradores.component'
import { IConfig, NgxMaskModule } from 'ngx-mask';


const maskConfig: Partial<IConfig> = {
  validation: false,
};


@NgModule({
  declarations: [
    AppComponent,
    ColaboradoresComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    ModalModule.forRoot(),
    NgxMaskModule.forRoot(maskConfig),
  ],
  providers: [HttpClientModule, ColaboradoresService ],
  bootstrap: [AppComponent],
})
export class AppModule { }
