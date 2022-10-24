import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';


import { PagesComponent } from './pages.component';
import { GetComponent } from './books/get/get.component';
import { CreateComponent } from './books/create/create.component';
import { UpdateComponent } from './books/update/update.component';
import { DetailComponent } from './books/detail/detail.component';



const routes: Routes = [
    { 
        path: 'libros', 
        component: PagesComponent,
        children: [
            { path: '', component: GetComponent, data: { titulo: 'Listado de libros' } },
            { path: 'crear', component: CreateComponent, data: { titulo: 'Registro de Libros' } },
            { path: 'actualizar', component: UpdateComponent, data: { titulo: 'Atualizar  Libro' } },
            { path: 'informacion', component: DetailComponent, data: { titulo: 'Detalle ' } },
            
        ]
    },
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class PagesRoutingModule {}


