import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit {
  heroes: Hero[];
  selectedHero: Hero;
  
  constructor(private heroService: HeroService, private messageService: MessageService) {}
  

  // Method to retrieve heroes from service, This an async call
  getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }

  ngOnInit(): void {
    this.getHeroes();
  }  
  
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  add(name: string): void {
    name = name.trim();

    if (!name) return;

    this.heroService.addHero({name} as Hero).subscribe(hero => {this.heroes.push(hero)})
  }
}
