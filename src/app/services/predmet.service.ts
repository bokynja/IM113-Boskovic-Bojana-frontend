import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PREDMET_URL, ROCISTE_URL } from '../constants';
import { Predmet } from '../models/predmet';

@Injectable({
  providedIn: 'root'
})
export class PredmetService {

  constructor(private HttpClient:HttpClient) { }

  public getAllPredmets():Observable<any> {
    return this.HttpClient.get(`${PREDMET_URL}`);
  }

  public addPredmet(predmet:Predmet):Observable<any> {
    return this.HttpClient.post(`${PREDMET_URL}`, predmet);
  }

  public updatePredmet(predmet:Predmet):Observable<any> {
    return this.HttpClient.put(`${PREDMET_URL}/${predmet.id}`, predmet);
  }

  public deletePredmet(predmetID:number):Observable<any> {
    return this.HttpClient.delete(`${PREDMET_URL}/${predmetID}`, {responseType:"text"});
  }
}
