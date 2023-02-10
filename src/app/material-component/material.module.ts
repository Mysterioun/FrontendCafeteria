import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialRoutes } from './material.routing';
import { MaterialModule } from '../shared/material-module';
import { ViewBillProductsComponent } from './dialog/view-bill-products/view-bill-products.component';
import { ConfirmationComponent } from './dialog/confirmation/confirmation.component';
import { MudarSenhaComponent } from './dialog/mudar-senha/mudar-senha.component';
import { AdministrarCategoriaComponent } from './administrar-categoria/administrar-categoria.component';
import { CategoriaComponent } from './dialog/categoria/categoria.component';
import { AdministrarProdutoComponent } from './administrar-produto/administrar-produto.component';
import { ProdutoComponent } from './dialog/produto/produto.component';
import { AdministrarPedidoComponent } from './administrar-pedido/administrar-pedido.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MaterialRoutes),
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule
  ],
  providers: [],
  declarations: [
    ViewBillProductsComponent,
    ConfirmationComponent,
    MudarSenhaComponent,
    AdministrarCategoriaComponent,
    CategoriaComponent,
    AdministrarProdutoComponent,
    ProdutoComponent,
    AdministrarPedidoComponent
  ]
})
export class MaterialComponentsModule {}
