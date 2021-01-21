import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Hero } from './hero';
import { HEROES } from './mock-heros';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  // Observable makes it an async call
  getHeroes(): Observable<Hero[]> {
    return of(HEROES);
  };

  constructor() { }
}
