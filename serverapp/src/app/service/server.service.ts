// All the functions we need to make a HTTP request
// Can be generated using:
// ng g service service/server

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError} from 'rxjs';
import { tap, catchError} from 'rxjs/operators';
import { Status } from 'src/app/enum/status.enum';
import { CustomResponse } from 'src/app/interface/custom-response';
import { Server } from 'src/app/interface/server';

@Injectable({ providedIn: 'root'})
export class ServerService {

  private readonly apiUrl = 'http://localhost:8080';

  constructor( private http: HttpClient) { } // dependency injection

  //  *** Showcasing procedural approach *** //
  // getServers(): Observable<CustomResponse> {
  //   return this.http.get<CustomResponse>(`http://localhost:8080/server/list`);
  // }

  servers$ = <Observable<CustomResponse>> // observable used to retrieve a list of all the servers
  this.http.get<CustomResponse>(`${this.apiUrl}/server/list`)
  .pipe (
    tap(console.log),
    catchError(this.handleError)
  )

  save$ = (server: Server) => <Observable<CustomResponse>>
  this.http.post<CustomResponse>(`${this.apiUrl}/server/save`, server)
  .pipe (
    tap(console.log),
    catchError(this.handleError)
  )

  ping$ = (ipAddress: string) => <Observable<CustomResponse>> // observable used to retrieve a list of all the servers
  this.http.get<CustomResponse>(`${this.apiUrl}/server/ping/${ipAddress}`)
  .pipe (
    tap(console.log),
    catchError(this.handleError)
  )

  filter$ = (status: Status, response: CustomResponse) => <Observable<CustomResponse>> // observable used to retrieve a list of all the servers
    new Observable<CustomResponse>(
      subscriber => {
        console.log(response);
        subscriber.next(
          status == Status.ALL ? { ...response, message: `Servers filtered by ${status} statys`} :
          {
            ...response,
            message: response.data.servers
            .filter(server => server.status === status).length > 0 ? `Server filtered by 
            ${status === Status.SERVER_UP ? 'SERVER_UP' 
            : 'SERVER_DOWN'} status` : `No servers of ${status} found`,
            data: {servers: response.data.servers
            .filter(server => server.status === status) }
          }
        );
        subscriber.complete();
      }
    )
  .pipe (
    tap(console.log),
    catchError(this.handleError)
  )

  delete$ = (serverId: number) => <Observable<CustomResponse>> // observable used to retrieve a list of all the servers
  this.http.delete<CustomResponse>(`${this.apiUrl}/server/delete/${serverId}`)
  .pipe (
    tap(console.log),
    catchError(this.handleError)
  )

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.log(error);
    return throwError (`An error occurred - Error code: ${error.status}`);
  }
}
