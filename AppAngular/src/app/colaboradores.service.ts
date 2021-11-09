import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Colaboradores } from './Colaboradores';

const httpOptions: Object= {
  Headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class ColaboradoresService {

  url = 'https://localhost:5001/api/Colaboradores'
  constructor(
    private http: HttpClient
  ) { }

Getall(): Observable<Colaboradores[]>{
  return this.http.get<Colaboradores[]>(this.url)
}

Get(ID: number): Observable<Colaboradores>{
  const apiUrl = this.url + "/" + ID;
  return this.http.get<Colaboradores>(apiUrl)
}

New(colaborador: Colaboradores): Observable<any>{
  return this.http.post<Colaboradores>(this.url, colaborador, httpOptions);
}

Edit(colaborador: Colaboradores): Observable<any>{
  return this.http.put<Colaboradores>(this.url, colaborador, httpOptions);
}

Remove(ID: number): Observable<any>{
  const apiUrl = this.url + "/" + ID;
  return this.http.delete<number>(apiUrl,httpOptions)
}

}
