import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/common/book';
import { BookService } from 'src/app/services/book.service';


@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component-grid.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books:Book[];
  categoryId:number;
  constructor(private bookService:BookService,
    private _activatedRoute:ActivatedRoute
    ) { }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(()=>{
      this.getBookList()
    });
    
  }

  getBookList(){

    const hasCategoryId:boolean=this._activatedRoute.snapshot.paramMap.has('id');

    if(hasCategoryId){
      this.categoryId=+this._activatedRoute.snapshot.paramMap.get('id');
    }
    else{
      this.categoryId=1;
    }
    this.bookService.getBook(this.categoryId).subscribe(
      data=>this.books=data
        
      
    )
  }

}
