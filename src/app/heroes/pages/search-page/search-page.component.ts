import { Component } from '@angular/core';

import { HeroesService } from '../../services/heroes.service';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interfaces/hero.interface';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-page',
  standalone: false,

  templateUrl: './search-page.component.html',
  styles: ``,
})
export class SearchPageComponent {
  public searchInput = new FormControl('');
  public heroes: Hero[] = [];
  public selectedHero?: Hero;
  constructor(private heroService: HeroesService) {}

  public searchHero() {
    const value: string = this.searchInput.value || '';

    this.heroService
      .getSuggestions(value)
      .subscribe((heroes) => (this.heroes = heroes));
  }

  onSelectedOption(event: MatAutocompleteSelectedEvent): void {
    // console.log(event.option.value);
    if (!event.option.value) {
      this.selectedHero = undefined;
      return;
    }

    const hero: Hero = event.option.value;
    this.searchInput.setValue(hero.superhero);
    this.selectedHero = hero;
  }
}
