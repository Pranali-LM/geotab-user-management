import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, filter, switchMap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LmApiService {
  public lmAccessTokenSource = new BehaviorSubject('');
  lmAccessToken = this.lmAccessTokenSource.asObservable();

  private lmUrl = 'https://white-local-dev.lightmetrics.co';
  constructor( private httpClient: HttpClient) { 
  }
  getAuthenticationToken(tspAccountName: string, sessionId: string) {
    this.httpClient
      .post(`${this.lmUrl}/authenticate-geotab/${tspAccountName}`, {
        userName: 'pranali.udawant@lightmetrics.co',
        sessionId: sessionId,
        database: 'lmfleet003',
        geotabBaseUrl: 'https://my.geotab.com',
      })
      .subscribe({
        next: (resp: any) => {
          console.log(resp.token);
          this.lmAccessTokenSource.next(resp.token);
        },
        error: (error) => console.log(error),
      });
  }
  public getAllRoles():Observable<any>{
    return this.lmAccessToken.pipe(
      filter(token => !!token),
      switchMap(token => {
        const headers = new HttpHeaders({
          'X-Access-Token': `${token}`
        });
       const params = {
             fleetId :  'lmfleet003' ,
             userType : "fleetmanager" ,
            };
        return this.httpClient.get(`${this.lmUrl}/v2/roles`, { headers , params });
      })
    );
  }
}
