import { Injectable } from '@angular/core';
import { Log } from '../models/Log';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  logs: Log[];

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

  getLogs() {
    return this.logs;
  }
}
