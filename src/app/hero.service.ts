import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { Hero } from './hero';
import { HEROES } from './mock-heros';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  // Observable makes it an async call
  getHeroes(): Observable<Hero[]> {
    this.messageService.add('HeroService: fetched heroes'); // Calls function in message service to add string to array
    this.messageService.add('Hi there max')
    return of(HEROES);
  };

  constructor(private messageService: MessageService) {}
}
