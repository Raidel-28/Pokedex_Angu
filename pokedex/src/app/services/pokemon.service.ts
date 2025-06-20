import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private baseUrl = 'https://pokeapi.co/api/v2/pokemon';


  // Constructor pour injecter HttpClient
  // Utilisé pour faire des requêtes HTTP vers l'API Pokémon
  // Le service est injectable dans toute l'application grâce à providedIn: 'root'
  constructor(private http: HttpClient) { }

  getPokemons(limit: number = 151): Observable<any> {
    return this.http.get(`${this.baseUrl}?limit=${limit}`);
  }

  getPokemonDetails(name: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${name}`);
  }
}


