import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map, switchMap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PokemonService {
    private baseUrl = 'https://pokeapi.co/api/v2/pokemon';

    constructor(private http: HttpClient) { }

    // Récupère les 50 premiers Pokémons (liste simple)
    getPokemons(): Observable<any[]> {
        return this.http.get<any>(`${this.baseUrl}?limit=50`).pipe(
            switchMap(response => {
                // pour chaque résultat, on fait un appel pour avoir les détails
                const detailRequests = response.results.map((pokemon: any) =>
                    this.http.get(pokemon.url)
                );
                return forkJoin(detailRequests) as Observable<any[]>; // on attend que tous les appels soient terminés
            })
        );
    }

    // Détail d'un seul Pokémon (utilisé dans la fiche)
    getPokemonDetails(name: string): Observable<any> {
        return this.http.get(`${this.baseUrl}/${name}`);
    }
}




// import { TestBed } from '@angular/core/testing';

// import { Pokemon } from './pokemon';

// describe('Pokemon', () => {
//   let service: Pokemon;

//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//     service = TestBed.inject(Pokemon);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
// });
