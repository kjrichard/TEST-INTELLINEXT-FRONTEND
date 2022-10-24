import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
import { BookInterface } from '../interfaces/book.interface';



const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class BookService {

  public book: BookInterface;

  constructor( 
                private http: HttpClient, 
                private router: Router,
            ) { }



  getAll( pages: number ) {
    return this.http.get(`${ base_url }/books?page=${ pages }` );
  }

  search( params: string, body: string ) {
    return this.http.get(`${ base_url }/books/${ params }/${ body}` );
  }

  create( data: BookInterface) {
    return this.http.post(`${ base_url }/books`,  data  );
  }

  update( id: string, data: BookInterface ) {
    return this.http.put(`${ base_url }/books/`+id, data  );
  }

  delete( id: string) {
    return this.http.delete(`${ base_url }/books/`+id );
  }


  
  

}
