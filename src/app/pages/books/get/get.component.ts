import { Component, OnInit } from '@angular/core';
import { BookInterface } from 'src/app/interfaces/book.interface';
import { BookService } from '../../../services/book.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-get',
  templateUrl: './get.component.html'
})
export class GetComponent implements OnInit {

  public book: BookInterface;
  public loading: boolean = true;
  public pages: number = 1;
  public param: string;
  public total: any;

  public searchForm  =   this.fb.group({

    field : [ '', Validators.required],
    body :  [ '', Validators.required],  
  
  });
 

  constructor( private bookService: BookService, public router: Router, private fb: FormBuilder, ) { }

  ngOnInit(): void {
   this.getAll();
  }

  validate(field: string): boolean {
    if( this.searchForm.get(field)?.invalid ) {
      return true;
    }
    return false;
  }

  search() {

    let body : string = this.searchForm.get('body').value;
    let field: string = this.searchForm.get('field').value;


    this.bookService.search( field, body ).subscribe( ( res: any ) => {
      this.book = res.data.data;
      this.total = res.data.total;
      console.log(body, field);
      
    })
  }

 

  create() {
    this.router.navigateByUrl('libros/crear')
  }

  update( item: BookInterface ) {
    this.bookService.book = item;
    this.router.navigateByUrl('libros/actualizar')
  }

  detail( item: BookInterface ) {
    this.bookService.book = item;
    this.router.navigateByUrl('libros/informacion')
  }

  getAll() {
    this.loading = true;
    this.bookService.getAll( this.pages ).subscribe( ( res: any ) => {
      this.loading = false;
      console.log(res);
      
     this.book = res.data.data;
      
    })
  }

  delete( id: string ) {
    Swal.fire({
      title: 'Estas segur@?',
      text: "No podrás revertir esto.!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.bookService.delete( id ).subscribe( ( res: BookInterface ) => {
          this.getAll();
          Swal.fire(
            'Deleted!',
            'Registro eliminado.',
            'success',
          )

        }, ( error) => {
          console.log(error);
          
        })
        
      }
    })

  }

  next() {
    
   
    this.pages ++;
    this.getAll( );
  }

  previous() {

    this.pages --;
    this.getAll();
  }

  cancel() {
    this.searchForm.reset();
    this.getAll();
  }

}
