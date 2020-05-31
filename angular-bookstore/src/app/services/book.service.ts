import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import{Observable}from 'rxjs';
import{map}from 'rxjs/operators';
import { Book } from '../common/book';
import { BookCategory } from '../common/book-category';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private baseUrl="http://localhost:9090/api/v1/books";
  private categoryUrl="http://localhost:9090/api/v1/book-category";

  constructor(private httpClient:HttpClient) { }
 
  getBooks(categoryId:number,currentPage:number,pageSize:number):Observable<GetResponseBooks>{
    const searchUrl=`${this.baseUrl}/search/categoryid?id=${categoryId}&page=${currentPage}&size=${pageSize}`;
                                                                        
    return this.httpClient.get<GetResponseBooks>(searchUrl);                                                                      
  }

  private bookList(searchUrl: string): Observable<Book[]> {
    return this.httpClient.get<GetResponseBooks>(searchUrl).pipe(map(response => response._embedded.books));
  }

  getBookCategory():Observable<BookCategory[]>{
    return this.httpClient.get<GetResponseBookCategory>(this.categoryUrl).pipe(
      map(response=>response._embedded.bookCategory)
    )
  }

  getSearchBook(searchKeyword:string):Observable<Book[]>{
    const searchUrl=`${this.baseUrl}/search/searchByKeyword?name=${searchKeyword}`;
    return this.bookList(searchUrl);
  }

  getBookDetails(bookId:number):Observable<Book>{
    const bookDetailsUrl=`${this.baseUrl}/${bookId}`;
    return this.httpClient.get<Book>(bookDetailsUrl);
  }
}

interface GetResponseBooks{
  _embedded:{
    books:Book[]
  },
  page: {
    //Total number of record per page
    size: number,
    // Total number of record in db
    totalElements: number,
    //current page number //start from 0 index
    totalPages: number,
    //Total number of pages
    number: number
  }
}

interface GetResponseBookCategory{
  _embedded:{
    bookCategory:BookCategory[];
  }
}