import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

const URL = 'https://stage.chronicle.demo.mifprojects.com/api/v1/plots-in-viewport/?bounds=145.1105111092329,-37.529389766357475,145.11115014553073,-37.52902603108905'
@Injectable({
  providedIn: 'root'
})

export class MapService {  

  constructor(private http: HttpClient) { }
  
  getDataMap(): Observable<any> {
    return this.http.get(URL).pipe(catchError(error => {
      return throwError(error);
    }))
  }
}
