import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';


import { User } from '../interfaces/book.interface';

const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user: User;

  constructor( 
                private http: HttpClient, 
                private router: Router,
            ) { }


 /*  crearUsuario( formData: RegisterForm ) {
    
    return this.http.post(`${ base_url }/usuarios`, formData )
             

  } */

  createUserAll() {
    return this.http.get(`${ base_url }/users/all` );
  }

  getUsers() {
    return this.http.get(`${ base_url }/users` );
  }

  createUser( data: User) {
    return this.http.post(`${ base_url }/users`,  data  );
  }

  updateUser( id: number, data: User ) {
    return this.http.patch(`${ base_url }/users/`+id, data  );
  }

  delete( id: number) {
    return this.http.delete(`${ base_url }/users/`+id );
  }


  
  

}
