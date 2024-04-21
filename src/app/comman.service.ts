import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface formInterFace {
  id?:string,
  firstName:string,
  lastName:string,
  email:string,
}

@Injectable({
  providedIn: 'root'
})
export class CommanService {
  baseUrl = 'http://localhost:3000/data';

  constructor(private http:HttpClient) { }

  postData(data:formInterFace): Observable<void>{
   return this.http.post<void>(this.baseUrl , data)
  }

  getData(): Observable<formInterFace[]>{
    return this.http.get<formInterFace[]>(this.baseUrl);
  }

  deleteData(id:string): Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}/${id}`)
  }

  getDataById(id:string):Observable<formInterFace>{
    return this.http.get<formInterFace>(`${this.baseUrl}/${id}`)
  }

  updateDataById(id:string, data:formInterFace): Observable<void>{
    return this.http.put<void>(`${this.baseUrl}/${id}`, data)
  }
}
