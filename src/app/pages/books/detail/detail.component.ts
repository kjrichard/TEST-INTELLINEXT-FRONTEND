import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { BookInterface } from '../../../interfaces/book.interface';
import { Router } from '@angular/router';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html'
})
export class DetailComponent implements OnInit {

  public book: BookInterface;
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
    private bootSevice: BookService

  ) { 
    this.book = this.bootSevice.book;
    if (this.book == null ) {
      router.navigateByUrl('/usuarios').then(() => { window.location.reload() });
    }

  }

  ngOnInit(): void {

    this.fields();
  }

  fields() {
      this.registerForm.disable()
      this.registerForm.controls.ISBN.setValue(this.book.ISBN);
      this.registerForm.controls.Book_Title.setValue(this.book.Book_Title);
      this.registerForm.controls.Book_Author.setValue(this.book.Book_Author);
      this.registerForm.controls.Year_Of_Publication.setValue(this.book.Year_Of_Publication);
      this.registerForm.controls.Publisher.setValue(this.book.Publisher);
     
  
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

}
