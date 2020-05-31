import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/common/book';
import {ActivatedRoute}from '@angular/router';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  bookInfo:Book = new Book();
  constructor(private _activatedRoute:ActivatedRoute,
              private _bookService:BookService
    ) { }

  ngOnInit(): void {
    this.getBookInfo();
  }

  getBookInfo(){
    const id=+this._activatedRoute.snapshot.paramMap.get('id');
    this._bookService.getBookDetails(id).subscribe(data=>{
      this.bookInfo=data
    });
  }
}
