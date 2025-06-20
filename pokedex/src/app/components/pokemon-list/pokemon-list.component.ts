import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {
  pokemons: any[] = [];
  filteredPokemons: any[] = [];
  searchTerm: string = '';
  sortOrder: string = 'az';

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.fetchPokemons();
  }

  fetchPokemons(): void {
    const urls = Array.from({ length: 151 }, (_, i) =>
      `https://pokeapi.co/api/v2/pokemon/${i + 1}`
    );

    Promise.all(urls.map(url => this.http.get(url).toPromise()))
      .then(results => {
        this.pokemons = results;
        this.filteredPokemons = [...this.pokemons];
        this.sortPokemons(); // trie initial
      })
      .catch(error => console.error('Erreur de chargement des pokémons', error));
  }

  filterPokemons(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredPokemons = this.pokemons.filter(p =>
      p.name.toLowerCase().includes(term)
    );
    this.sortPokemons();
  }

  sortPokemons(): void {
    this.filteredPokemons.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      return this.sortOrder === 'az'
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA);
    });
  }

  goToDetail(pokemonName: string): void {
    this.router.navigate(['/pokemon', pokemonName]);
  }
}




