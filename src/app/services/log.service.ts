import { Injectable } from '@angular/core';
import { Log } from '../models/Log';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class LogService {
  logs: Log[];

  private logSource = new BehaviorSubject<Log>({id: null, text: null, date: null});
  selectedLog = this.logSource.asObservable();

  private stateSource = new BehaviorSubject<boolean>(true);
  stateClear = this.stateSource.asObservable();

  constructor() { 
    this.logs = [
      {id: '1',
       text: 'Generated components',
       date: new Date('12/26/2020 12:50:50')},
      {id: '2',
       text: 'Added bootstrap',
       date: new Date('09/26/2020 14:50:50')}, 
      {id: '3',
       text: 'Added log component',
       date: new Date('01/10/2020 08:50:50')},   
    ];
  }

  getLogs(): Observable<Log[]> {
    if (localStorage.getItem('logs') === null){
      this.logs = [];
    } else {
      this.logs = JSON.parse(localStorage.getItem('logs'));
    }

    return of(this.logs.sort((a, b) => {
      return b.date = a.date;
    }));
  }

  setFormLog(log: Log) {
    this.logSource.next(log);
  }

  addLog(log: Log) {
     this.logs.unshift(log); 

     localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  updateLog(log: Log) {
    this.logs.forEach((cur, index) => {
      if (log.id == cur.id) {
        this.logs.splice(index, 1);
      }
    });
    this.logs.unshift(log);

    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  deleteLog(log: Log) {
    this.logs.forEach((cur, index) => {
      if (log.id == cur.id) {
        this.logs.splice(index, 1);
      }
    }); 

    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  clearState() {
    this.stateSource.next(true);
  }
}
