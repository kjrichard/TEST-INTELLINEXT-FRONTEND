import { Component, OnInit } from '@angular/core';
import { BookInterface } from 'src/app/interfaces/book.interface';
import { BookService } from '../../../services/book.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-get',
  templateUrl: './get.component.html'
})
export class GetComponent implements OnInit {

  public book: BookInterface;
 

  constructor( private bookService: BookService, public router: Router ) { }

  ngOnInit(): void {
   this.getAll();
  }

  create() {
    this.router.navigateByUrl('libros/crear')
  }

  update( item: BookInterface ) {
    this.bookService.book = item;
    this.router.navigateByUrl('usuarios/actualizar')
  }

  detail( item: BookInterface ) {
    this.bookService.book = item;
    this.router.navigateByUrl('usuarios/informacion')
  }

  getAll() {
    this.bookService.getAll().subscribe( ( res: any ) => {
      console.log(res);
      
     this.book = res.books;
      
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

}
