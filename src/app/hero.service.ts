import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators'; // rxjs lib 
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { Hero } from './hero';
import { HEROES } from './mock-heros';

@Injectable({
  providedIn: 'root'
})


export class HeroService {

  private heroesUrl = 'api/heroes'; // URL to web api

  // Options for HTTP call
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  // GET call to get all heroes
  // Observable makes it an async call to get all heroes
  getHeroes(): Observable<Hero[]> {
    this.messageService.add(`HeroService: Fetched`); // Calls function in message service to add string to array
    return this.http.get<Hero[]>(this.heroesUrl).pipe(tap(_ => this.log('fetch heroes')), // The tap method will tap into the flow of observable values and send a message via the log()
    catchError(this.handleError<Hero[]>('getHeroes', []))); // Gets hero from server
  };

  // GET hero by id. Will 404 if id not found 
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`Fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  // PUT call to update hero
  updateHero(hero: Hero): Observable<any> {
    console.log(hero)
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`Updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    )
  };

  // POST: ADd a new hero to server
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`Added hero with id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  // Log a HeroService message with MessageService 
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);

      this.log(`${operation} failed: ${error.message}`);


      // Let app keep running by returning an empty result 
      return of(result as T);
    }
  }
}
