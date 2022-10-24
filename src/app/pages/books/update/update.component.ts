import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../services/book.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookInterface } from 'src/app/interfaces/book.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  public book: BookInterface;
  public registerForm  =   this.fb.group({

    ISBN                  :  [ '', [ Validators.required, Validators.min(5)]],
    Book_Title            :  [ '', [ Validators.required, Validators.minLength(3)]],
    Book_Author           :  [ '', [ Validators.required, Validators.minLength(6)]],
    Year_Of_Publication   :  [ '', [ Validators.required ]],
    Publisher             :  [ '', [ Validators.required, Validators.minLength(4)]],
    Image_URL_S           :  [ '', [ Validators.required, Validators.minLength(8)]],
    Image_URL_M           :  [ '', [ Validators.required, Validators.minLength(8)]],
    Image_URL_L           :  [ '', [ Validators.required, Validators.minLength(8)]],


  });

  constructor(

    private router: Router, 
    private fb: FormBuilder,
    private bootSevice: BookService

  ) { 
    this.book = this.bootSevice.book;
    if (this.book == null ) {
      router.navigateByUrl('/libros').then(() => { window.location.reload() });
    }

  }

  ngOnInit(): void {

   this.fields();
  }

  fields() {
      this.registerForm.controls.ISBN.setValue(this.book['ISBN']);
      this.registerForm.controls.Book_Title.setValue(this.book.Book_Title);
      this.registerForm.controls.Book_Author.setValue(this.book.Book_Author);
      this.registerForm.controls.Year_Of_Publication.setValue(this.book.Year_Of_Publication);
      this.registerForm.controls.Publisher.setValue(this.book.Publisher);
      this.registerForm.controls.Image_URL_L.setValue(this.book.Image_URL_L);
      this.registerForm.controls.Image_URL_M.setValue(this.book.Image_URL_M);
      this.registerForm.controls.Image_URL_S.setValue(this.book.Image_URL_S);
     
  
  }
  

  validate(field: string): boolean {
    if( this.registerForm.get(field)?.invalid ) {
      return true;
    }
    return false;
  }

  cancel() {
    this.registerForm.reset();
    this.router.navigateByUrl('/libros');
  }

  updateBook() {
    console.log( this.registerForm.value);
    
    let id = this.book._id;
    this.bootSevice.update( this.book._id, this.registerForm.value ).subscribe( ( res ) => {
      console.log( res );
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Actualizacion Exitosa',
        showConfirmButton: false,
        timer: 1500
      })
    }, ( error ) => {
      console.log( error );
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'No se completo la operacion',
        showConfirmButton: false,
        timer: 1500
      })
    })
}




}
