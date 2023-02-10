import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContaService {

  url = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  gerarReport(data:any){
    return this.httpClient.post(this.url+
      "/conta/gerarReport", data,{
        headers:new HttpHeaders().set('Content-Type', "application/json")
      })
  }

  getPdf(data:any):Observable<Blob>{
    return this.httpClient.post(this.url+"/conta/getPdf", data,{responseType: 'blob'});
  }

  getContas(data:any){
    return this.httpClient.get(this.url+"/conta/getContas");
  }
  
}
