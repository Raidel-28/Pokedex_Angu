import { Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent {
  private http = inject(HttpClient);
  private router = inject(Router);

  pokemons: any[] = [];
  filteredPokemons: any[] = [];

  searchTerm = '';
  sortOrder = 'az';

  ngOnInit() {
    this.http.get<any>('https://pokeapi.co/api/v2/pokemon?limit=50')
      .subscribe(response => {
        this.pokemons = response.results.map((p: any) => {
          const id = p.url.split('/')[6]; // extrait l'ID à partir de l'URL
          return {
            name: p.name,
            id,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
          };
        });
        this.filteredPokemons = [...this.pokemons];
      });
  }

  applyFilters() {
    const term = this.searchTerm.toLowerCase();
    this.filteredPokemons = this.pokemons.filter(p =>
      p.name.toLowerCase().includes(term)
    );

    if (this.sortOrder === 'az') {
      this.filteredPokemons.sort((a, b) => a.name.localeCompare(b.name));
    } else if (this.sortOrder === 'za') {
      this.filteredPokemons.sort((a, b) => b.name.localeCompare(a.name));
    }
  }

  viewDetails(name: string) {
    this.router.navigate(['/pokemon', name]);
  }
}




