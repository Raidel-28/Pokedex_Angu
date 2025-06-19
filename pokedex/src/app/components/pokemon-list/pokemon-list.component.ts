import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';



@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="list">
      <div *ngFor="let pokemon of pokemons" (click)="goToDetails(pokemon.name)" class="card">
        <img [src]="pokemon.image" [alt]="pokemon.name" />
        <h3>{{ pokemon.name | titlecase }}</h3>
      </div>
    </div>
  `,
  styles: [/* tu peux mettre tes styles ici */]
})
export class PokemonListComponent implements OnInit {
  pokemons: any[] = [];
  searchTerm: string = '';
  filteredPokemons: any[] = [];

  filterByName(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredPokemons = this.pokemons.filter(p => p.name.toLowerCase().includes(term));
  }

  constructor(private pokemonService: PokemonService, private router: Router) { }

  ngOnInit(): void {
    this.pokemonService.getPokemons().subscribe((response: any) => {
      this.pokemons = response.results.map((p: any, i: number) => ({
        ...p,
        id: i + 1,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i + 1}.png`
      }));
    });
  }

  goToDetails(name: string): void {
    this.router.navigate(['/pokemon', name]);
  }
}



