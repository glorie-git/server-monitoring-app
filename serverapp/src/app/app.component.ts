import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BehaviorSubject, catchError, map, Observable, of, startWith } from 'rxjs';
import { DataState } from './enum/data-state.enum';
import { Status } from './enum/status.enum';
import { AppState } from './interface/app-state';
import { CustomResponse } from './interface/custom-response';
import { Server } from './interface/server';
import { ServerService } from './service/server.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  appState$: Observable<AppState<CustomResponse>>;
  constructor(private seververService: ServerService) {}
  readonly DataState = DataState;
  readonly Status = Status;
  private filterSubject = new BehaviorSubject<string>('');
  private dataSubject = new BehaviorSubject<CustomResponse>(null);
  filterStatus$ = this.filterSubject.asObservable();
  private isLoading = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoading.asObservable();
  // Google rjs observables

  // Reactive approach
  ngOnInit(): void {
    this.appState$ = this.seververService.servers$
    .pipe (
      map(response => {
        this.dataSubject.next(response);
        return { dataState: DataState.LOADED_STATE, appData: { ...response, data: { servers: response.data.servers.reverse()}}}
      }),
      startWith({ dataState: DataState.LOADING_STATE}),
      catchError((error: string) => {
        return of({ dataState: DataState.ERROR_STATE, error })
      })
    );
  }

  pingServer(ipAddress: string): void {
    this.filterSubject.next(ipAddress); // Server with the ipAddress will have the spinner instead of the router
    this.appState$ = this.seververService.ping$(ipAddress) // makes a call to the backend
    .pipe (
      map(response => {
        const index =  this.dataSubject.value.data.servers.findIndex(server => server.id === response.data.server.id)
          this.dataSubject.value.data.servers[index] = response.data.server;
        this.filterSubject.next(''); // sets value back to string so user can ping the server once more
        return { dataState: DataState.LOADED_STATE, appData: this.dataSubject.value}
      }),
      startWith({ dataState: DataState.LOADED_STATE, appData: this.dataSubject.value}),
      catchError((error: string) => {
        this.filterSubject.next('');
        return of({ dataState: DataState.ERROR_STATE, error })
      })
    );
  }

  saveServer(serverForm: NgForm): void {
    this.isLoading.next(true);
    this.appState$ = this.seververService.save$(serverForm.value as Server) // makes a call to the backend
    .pipe (
      map(response => {
        this.dataSubject.next(
          {...response, data: { servers: [response.data.server, ...this.dataSubject.value.data.servers]}}
        )
        document.getElementById('closeModal').click();
        this.isLoading.next(false);
        serverForm.resetForm({ status: this.Status.SERVER_DOWN });
        return { dataState: DataState.LOADED_STATE, appData: this.dataSubject.value}
      }),
      startWith({ dataState: DataState.LOADED_STATE, appData: this.dataSubject.value}),
      catchError((error: string) => {
        this.isLoading.next(false);
        return of({ dataState: DataState.ERROR_STATE, error })
      })
    );
  }

  filterServers(status: Status): void {
    this.appState$ = this.seververService.filter$(status, this.dataSubject.value) // makes a call to the backend
    .pipe (
      map(response => {
        return { dataState: DataState.LOADED_STATE, appData: response}
      }),
      startWith({ dataState: DataState.LOADED_STATE, appData: this.dataSubject.value}),
      catchError((error: string) => {
        return of({ dataState: DataState.ERROR_STATE, error })
      })
    );
  }
}
  

