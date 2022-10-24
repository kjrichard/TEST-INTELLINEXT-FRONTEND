import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { BookService } from '../../../services/book.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html'
})
export class CreateComponent implements OnInit {

 

  public registerForm  =   this.fb.group({

    ISBN                  :  [ '', [ Validators.required, Validators.min(5)]],
    Book_Title            :  [ '', [ Validators.required, Validators.minLength(3)]],
    Book_Author           :  [ '', [ Validators.required, Validators.minLength(6)]],
    Year_Of_Publication   :  [ '', [ Validators.required, Validators.min(4), Validators.max(4)]],
    Publisher             :  [ '', [ Validators.required, Validators.minLength(4)]],
    Image_URL_S           :  [ '', [ Validators.required, Validators.minLength(8)]],
    Image_URL_M           :  [ '', [ Validators.required, Validators.minLength(8)]],
    Image_URL_L           :  [ '', [ Validators.required, Validators.minLength(8)]],


  });

  constructor(

    private router: Router, 
    private fb: FormBuilder,
    private bookServive: BookService

  ) { }

  ngOnInit(): void {
  }

  validate(field: string): boolean {
    if( this.registerForm.get(field)?.invalid ) {
      return true;
    }
    return false;
  }

   createUser() {
    

      this.bookServive.create( this.registerForm.value ).subscribe( ( res ) => {
        console.log( res );
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Registro Exitoso',
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

  cancel() {
    this.registerForm.reset();
    this.router.navigateByUrl('/libros');
  }



}
