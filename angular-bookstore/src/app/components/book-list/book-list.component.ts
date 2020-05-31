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

  books:Book[]=[];
  currentCategoryId:number=1;
  searchMode:boolean=false;
  previousCategoryId=1;

//new properties of server side paging
  currentPage:number=1;
  pageSize:number=5;
  totalRecord:number=0;

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
    const hascurrentCategoryId:boolean=this._activatedRoute.snapshot.paramMap.has('id');

    if(hascurrentCategoryId){
      this.currentCategoryId=+this._activatedRoute.snapshot.paramMap.get('id');
    }
    else{
      this.currentCategoryId=1;
    }

    if(this.currentCategoryId != this.previousCategoryId){
        this.currentPage=1
    }
    
    this.previousCategoryId=this.currentCategoryId;
    
    this.bookService.getBooks(this.currentCategoryId,
                              this.currentPage-1,
                              this.pageSize)
                              .subscribe(this.processPaginate());
                                
  }

  

  handelSearchOfBooks(){
    const keyword:string=this._activatedRoute.snapshot.paramMap.get('keyword');
    this.bookService.getSearchBook(keyword).subscribe(
      data=>{
        this.books=data
    });
  }

  updatePageItem(pageSize:number){
    this.pageSize=pageSize;
    this.currentPage=1;
    this.getBookList();
  }
  
  processPaginate() {
    return data=>{
      this.books=data._embedded.books;
      //ng bootstrap start from index 1
      this.currentPage=data.page.number+1;
      this.totalRecord=data.page.totalElements;
      this.pageSize=data.page.size;
    }
  }
}
