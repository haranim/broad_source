import { Component, OnInit } from '@angular/core';
import { Observable, Subject, catchError, debounceTime, distinctUntilChanged, finalize, map, retry, switchMap, throwError } from 'rxjs';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import * as _ from 'lodash';



@Component({
  selector: 'app-code-test-one',
  templateUrl: './code-test-one.component.html',
  styleUrls: ['./code-test-one.component.scss'],
})
export class CodeTestOneComponent implements OnInit {
  value1 = '';
  value2 = '';
  result = [];

  searchResult$! :  Observable<any[]>;
  searchText$ = new Subject<string>();
  isLoading = false;

  constructor(private http:HttpClient) {}

  ngOnInit(): void {
    this.searchResult$ = this.searchText$.pipe(
      debounceTime(500), // Wait for the user to stop typing
      distinctUntilChanged(), //Wait until the search text changes.
      switchMap(text =>
       this.searchService(text))
    )
  }

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  search(value: string) {
    this.searchText$.next(value);
  }

  searchService(text : string): Observable<[]>{
    var url = "https://api.tvmaze.com/search/shows?q=" + encodeURIComponent(text);

    return this.http.get<any>(url).pipe(
      map(res => res),
      catchError(this.handleError) // then handle the error,
     );
    }

    private handleError(error: HttpErrorResponse) {
      if (error) {
        console.error(`Backend returned code ${error.status}, body was: `, error.error);
      }
      // Return an observable with a user-facing error message.
      return throwError(() => new Error('Something bad happened; please try again later.'));
    }
    

}
