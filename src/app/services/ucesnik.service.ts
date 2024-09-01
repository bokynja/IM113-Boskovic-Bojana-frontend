import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UCESNIK_URL } from '../constants';
import { Ucesnik } from '../models/ucesnik';

@Injectable({
  providedIn: 'root'
})
export class UcesnikService {

  constructor(private HttpClient: HttpClient) { }

  public getAllUcesnik():Observable<any> {
    return this.HttpClient.get(`${UCESNIK_URL}`);
  }

  public addUcesnik(ucesnik:Ucesnik):Observable<any> {
    return this.HttpClient.post(`${UCESNIK_URL}`, ucesnik);
  }

  public updateUcesnik(ucesnik:Ucesnik):Observable<any> {
    return this.HttpClient.put(`${UCESNIK_URL}/${ucesnik.id}`, ucesnik );
  }

  public deleteUcesnik(ucesnik:Ucesnik):Observable<any> {
    return this.HttpClient.delete(`${UCESNIK_URL}/${ucesnik.id}`);
  }
}
