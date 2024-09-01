import { Rociste } from './../models/rociste';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ROCISTA_U_PREDMETU_URL, ROCISTE_URL } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class RocisteService {

  constructor(private HttpClient:HttpClient) { }
  
  public getAllRocistes():Observable<any> {
    return this.HttpClient.get(`${ROCISTE_URL}`);
  }

  public addRociste(rociste:Rociste):Observable<any> {
    return this.HttpClient.post(`${ROCISTE_URL}`, rociste);
  }

  public updateRociste(rociste:Rociste):Observable<any> {
    return this.HttpClient.put(`${ROCISTE_URL}/${rociste.id}`, rociste);
  }

  public deleteRociste(rocisteID:number):Observable<any> {
    return this.HttpClient.delete(`${ROCISTE_URL}/${rocisteID}`);
  }

  public getPredmetByRociste(predmetID:number):Observable<any> {
    return this.HttpClient.get(`${ROCISTA_U_PREDMETU_URL}/${predmetID}`);
  }
}
