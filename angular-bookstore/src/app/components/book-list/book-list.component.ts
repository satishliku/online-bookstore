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
  searchMode:boolean;

  constructor(private bookService:BookService,
    private _activatedRoute:ActivatedRoute
    ) { }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(()=>{
      this.getBookList()
    });
    
  }

  getBookList(){
    this.searchMode=this._activatedRoute.snapshot.paramMap.has('keyword');
    if(this.searchMode){
      this.handelSearchOfBooks();
    }
    else{
      this.handelBookOfList();
    }
  }

  handelBookOfList(){
    const hasCategoryId:boolean=this._activatedRoute.snapshot.paramMap.has('id');

    if(hasCategoryId){
      this.categoryId=+this._activatedRoute.snapshot.paramMap.get('id');
    }
    else{
      this.categoryId=1;
    }
    this.bookService.getBook(this.categoryId).subscribe(
      data=>this.books=data
    );
  }

  handelSearchOfBooks(){
    const keyword:string=this._activatedRoute.snapshot.paramMap.get('keyword');
    this.bookService.getSearchBook(keyword).subscribe(
      data=>{
        this.books=data
    });
  }
}
