import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Pour ngModel
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pokemon-list.component.html',
})
export class PokemonListComponent implements OnInit {
  private pokemonService = inject(PokemonService);
  private router = inject(Router);

  pokemons: any[] = [];              // Liste brute de l’API
  filteredPokemons: any[] = [];      // Liste triée et filtrée
  searchTerm: string = '';           // Recherche
  sortOrder: string = 'az';          // Tri par défaut
  selectPokemon: any;

  ngOnInit(): void {
    this.pokemonService.getPokemons().subscribe((data) => {
      this.pokemons = data.results;
      this.applyFilters(); // Applique recherche + tri dès le début
    });
  }

  getPokemonId(url: string): number {
    return parseInt(url.split('/')[url.split('/').length - 2]);
  }

  goToDetails(name: string): void {
    this.router.navigate(['/pokemon', name]);
  }

  sortPokemons(): void {
    this.applyFilters();
  }

  applyFilters(): void {
    // Recherche + tri combinés
    this.filteredPokemons = this.pokemons
      .filter((pokemon) =>
        pokemon.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        if (this.sortOrder === 'az') {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      });
  }
}




