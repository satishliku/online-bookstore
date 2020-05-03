import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { BookCategory } from 'src/app/common/book-category';

@Component({
  selector: 'app-book-category',
  templateUrl: './book-category.component.html',
  styleUrls: ['./book-category.component.css']
})
export class BookCategoryComponent implements OnInit {

  bookCategory:BookCategory[];
  constructor(private _bookService:BookService) { }

  ngOnInit(): void {
    this.listBookCategory();
  }

  listBookCategory(){
    this._bookService.getBookCategory().subscribe(data=>this.bookCategory=data)
  }
}
