import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material-module';
import { HomeComponent } from './home/home.component';
import { BestSellerComponent } from './best-seller/best-seller.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from './shared/shared.module';
import { FullComponent } from './layouts/full/full.component';
import { AppHeaderComponent } from './layouts/full/header/header.component';
import { AppSidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { NgxUiLoaderConfig } from 'ngx-ui-loader';
import { NgxUiLoaderModule, SPINNER } from 'ngx-ui-loader';
import { EsqueceuSenhaComponent } from './esqueceu-senha/esqueceu-senha.component';
import { LoginComponent } from './login/login.component';
import { TokenInterceptorInterceptor } from './services/token-interceptor.interceptor';

const ngxUiLoaderConfig: NgxUiLoaderConfig ={
  text: "Carregando...",
  textColor: "#FFFFFF",
  textPosition: "center-center",
  bgsColor: "#f61e61",
  fgsColor: "#f61e61",
  fgsType: SPINNER.threeStrings,
  fgsSize: 100,
  hasProgressBar: false
}

@NgModule({
  declarations: [	
    AppComponent,
    HomeComponent,
    BestSellerComponent,
    FullComponent,
    AppHeaderComponent,
    AppSidebarComponent,
    CadastrarComponent,
    EsqueceuSenhaComponent,
    LoginComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    SharedModule,
    HttpClientModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig)
  ],
  providers: [HttpClientModule, {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorInterceptor, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
