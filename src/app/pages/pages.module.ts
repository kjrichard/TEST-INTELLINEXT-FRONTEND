import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

// Modulos
import { SharedModule } from '../shared/shared.module';

import { PagesComponent } from './pages.component';
import { HttpClientModule } from '@angular/common/http';
import { GetComponent } from "./books/get/get.component";
import { CreateComponent } from "./books/create/create.component";
import { UpdateComponent } from "./books/update/update.component";
import { DetailComponent } from './books/detail/detail.component';




@NgModule({
  declarations: [
    PagesComponent,
    GetComponent,
    CreateComponent,
    UpdateComponent,
    DetailComponent
  ],
  exports: [
    PagesComponent,
  ],
  imports: [ 
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule,
    HttpClientModule,
    
    
  ]
})
export class PagesModule { }
