import { Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { RouteGuardService } from '../services/route-guard.service';
import { AdministrarCategoriaComponent } from './administrar-categoria/administrar-categoria.component';
import { AdministrarPedidoComponent } from './administrar-pedido/administrar-pedido.component';
import { AdministrarProdutoComponent } from './administrar-produto/administrar-produto.component';


export const MaterialRoutes: Routes = [
    {
        path: "categoria",
        component: AdministrarCategoriaComponent,
        canActivate: [RouteGuardService],
        data:{
            expectedRole: ['admin']
        }
    },
    {
        path: "produto",
        component: AdministrarProdutoComponent,
        canActivate: [RouteGuardService],
        data:{
            expectedRole: ['admin']
        }
    },
    {
        path: "pedido",
        component: AdministrarPedidoComponent,
        canActivate: [RouteGuardService],
        data:{
            expectedRole: ['admin','usuario']
        }
    }
];
