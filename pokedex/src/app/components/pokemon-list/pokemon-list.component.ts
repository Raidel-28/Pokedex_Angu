// Importe les fonctionnalités de base pour créer un composant Angular
import { Component, OnInit } from '@angular/core';

// Fournit des directives HTML utiles comme *ngIf, *ngFor
import { CommonModule } from '@angular/common';

// Permet de naviguer d’un composant à un autre
import { Router } from '@angular/router';

// Permet de faire des requêtes HTTP
import { HttpClient, HttpClientModule } from '@angular/common/http';

// Permet de gérer les formulaires (comme les champs de recherche)
import { FormsModule } from '@angular/forms';

// Permet de combiner plusieurs requêtes HTTP en parallèle
import { forkJoin } from 'rxjs';


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
    const requests = Array.from({ length: 151 }, (_, i) =>
      this.http.get(`https://pokeapi.co/api/v2/pokemon/${i + 1}`)
    );

    forkJoin(requests).subscribe({
      next: results => {
        this.pokemons = results;
        this.filteredPokemons = [...this.pokemons];
        this.sortPokemons();
      },
      error: error => {
        console.error('Erreur de chargement des pokémons', error);
      }
    });
  }

  // Methode pour récupérer les pokémons avec Promise.all:
  //est déconseillé depuis Angular 10+,
  //est obsolète dans RxJS 8,
  //ne permet pas la gestion fine du flux, comme les opérateurs mergeMap, concatMap, forkJoin, etc.


  //Promise.all(urls.map(url => this.http.get(url).toPromise()))
  //.then(results => {
  //this.pokemons = results;
  //this.filteredPokemons = [...this.pokemons];
  //this.sortPokemons();
  //})
  //.catch(error => console.error('Erreur de chargement des pokémons', error));
  //fetchPokemons(): void {
  // const requests = Array.from({ length: 151 }, (_, i) =>
  //  this.http.get(`https://pokeapi.co/api/v2/pokemon/${i + 1}`)
  //);

  //forkJoin(requests).subscribe({
  // next: results => {
  //  this.pokemons = results;
  // this.filteredPokemons = [...this.pokemons];
  //this.sortPokemons();
  //},
  //error: error => {
  // console.error('Erreur de chargement des pokémons', error);
  //}
  //});
  // }


  //méthode pour récupérer les pokémons avec forkJoin:
  // permet de faire plusieurs requêtes HTTP en parallèle et d'attendre que toutes soient terminées avant de continuer.
  // C'est utile pour charger plusieurs ressources en même temps, comme dans ce cas où on charge les détails de plusieurs pokémons.
  // forkJoin prend un tableau d'observables et émet un tableau des résultats lorsque tous les observables ont émis au moins une valeur.
  // Dans ce cas, on crée un tableau de requêtes HTTP pour chaque pokémon, puis on utilise forkJoin pour attendre que toutes les requêtes soient terminées.
  // Ensuite, on assigne les résultats à this.pokemons et this.filteredPokemons, et on appelle sortPokemons pour trier les pokémons.
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





