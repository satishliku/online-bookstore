import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import{Observable}from 'rxjs';
import{map}from 'rxjs/operators';
import { Book } from '../common/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private baseUrl="http://192.168.0.104:9090/api/v1/books";

  constructor(private httpClient:HttpClient) { }
 
  getBook():Observable<Book[]>{
    return this.httpClient.get<GetResponseBooks>(this.baseUrl).pipe(
      map(response=>response._embedded.books)
    )
  }
}

interface GetResponseBooks{
  _embedded:{
    books:Book[];
  }
}