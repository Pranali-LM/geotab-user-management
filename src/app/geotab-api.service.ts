import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeotabApiService {
  geotab : any ; 

  private geoTabSessionIdSource = new BehaviorSubject('');

  geoTabSessionId = this.geoTabSessionIdSource.asObservable();
 
  updateGeoTabSessionId(val: string) {
    console.warn(val);
    this.geoTabSessionIdSource.next(val);
  }
 
  constructor(private httpClient: HttpClient) { }

  public authenticateGeoTabUser(): Observable<any> {
    const userData = {
      database: 'lmfleet003',
      userName: 'pranali.udawant@lightmetrics.co',
      password: 'zQ?4mKPPvFPs$9.',
    };

    const body = {
      method: 'Authenticate',
      params: {
        ...userData,
      },
    };

    console.log('authenticate user');

    return this.httpClient.post('https://my.geotab.com/apiv1', body);
  }
  public getSelectedUser(): Observable<any> {
    const requestBody = {
      method: 'Get',
      params: {
        typeName: 'User',
        search: {
          id: 'b37',
        },
        credentials: {
          database: 'lmfleet003',
          userName: 'pranali.udawant@lightmetrics.co',
          sessionId : "L8cMRYfo1kZEV1fbIjYOjQ"
        },
      },
    };
    return this.httpClient.post('https://my.geotab.com/apiv1', requestBody);
}
public addInData(selectedRole: string , selectedTag : string , geotabUserId:any): Observable<any> {
  const requestBody = {
    method :"Add",
    params :{
      typeName: 'AddInData',
      credentials: {
        database: 'lmfleet003',
        userName: 'pranali.udawant@lightmetrics.co',
        sessionId : "L8cMRYfo1kZEV1fbIjYOjQ"
      },
      entity: {
        addInId: "aTRmZTJlNmYtOGYxYy0zOTh",
        details: {
          userId: geotabUserId,
          userName: 'pranali.udawant@lightmetrics.co',
          roleId: selectedRole ,
          tags : selectedTag ,
          userPrefs: {
            darkmode: true,
            units: ""
          }
        },
      }
    },
  };
  return this.httpClient.post('https://my.geotab.com/apiv1', requestBody);
}
public getData(): Observable<any> {
  const requestBody = {
    method :"Get",
    params :{
      typeName: "AddInData",
      resultsLimit: 100,
      credentials: {
        database: 'lmfleet003',
        userName: 'pranali.udawant@lightmetrics.co',
        sessionId : "L8cMRYfo1kZEV1fbIjYOjQ"
      },
      search: {
        addInId: "aTRmZTJlNmYtOGYxYy0zOTh",
        whereClause: 'userId = "b37"',
      },
    },
  };
  return this.httpClient.post('https://my.geotab.com/apiv1', requestBody);
}
}  
