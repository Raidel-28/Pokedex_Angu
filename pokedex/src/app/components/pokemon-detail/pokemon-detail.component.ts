// On importe les éléments nécessaires à la création d’un composant Angular
import { Component, OnInit, inject } from '@angular/core';

// Permet de récupérer les paramètres dynamiques de l'URL (ex : /pokemon/pikachu → "pikachu")
import { ActivatedRoute } from '@angular/router';

// Fournit des fonctionnalités HTML de base comme *ngIf, *ngFor
import { CommonModule } from '@angular/common';

// On importe le service pour récupérer les données depuis l’API Pokémon
import { PokemonService } from '../../services/pokemon.service';

// Permet de revenir en arrière dans l'historique du navigateur
import { Location } from '@angular/common';

// On définit le composant Angular
@Component({
  selector: 'app-pokemon-detail',               // Nom du composant dans les templates HTML
  standalone: true,                             // Composant autonome (pas besoin de module)
  imports: [CommonModule],                      // On importe les directives Angular de base
  templateUrl: './pokemon-detail.component.html', // Fichier HTML lié
  styleUrls: ['./pokemon-detail.component.css']   // Fichier CSS lié
})
export class PokemonDetailComponent implements OnInit {

  // Propriété pour stocker les infos d’un seul Pokémon
  pokemon: any;

  // Tableau contenant tous les Pokémon (pour affichage ou tri)
  pokemons: any[] = [];

  // On utilise inject() pour accéder aux infos de la route (paramètre dynamique "name")
  route = inject(ActivatedRoute);

  // Propriété pour stocker les types d’un Pokémon (facultatif ici)
  typeNames: any;

  // Méthode appelée automatiquement au chargement du composant
  ngOnInit(): void {
    // On récupère le nom du Pokémon depuis l’URL (ex: /pokemon/pikachu → 'pikachu')
    const name = this.route.snapshot.paramMap.get('name');

    // Si un nom est présent dans l'URL
    if (name) {
      // On appelle le service pour obtenir les détails du Pokémon
      this.pokemonService.getPokemonDetails(name).subscribe(data => {
        // On stocke les données dans la propriété "pokemon"
        this.pokemon = data;
      });
    }
  }

  // Propriété "virtuelle" qui retourne une chaîne avec la liste des types du Pokémon (ex: "fire, flying")
  get typesList(): string {
    return this.pokemon?.types?.map((t: { type: { name: string } }) => t.type.name).join(', ') || '';
  }

  // Constructeur exécuté à la création du composant
  constructor(
    private location: Location,                   // Pour gérer le bouton retour
    private pokemonService: PokemonService        // Pour interagir avec l'API Pokémon
  ) {
    // On récupère tous les Pokémon à l'initialisation du composant
    this.pokemonService.getPokemons().subscribe(data => {
      this.pokemons = data.results;

      // Une fois la liste récupérée, on la trie
      this.sortPokemons();
    });
  }

  // Fonction qui permet de revenir à la page précédente
  goBack(): void {
    this.location.back(); // Fonction du module @angular/common
  }

  // Ordre de tri actuel : 'az' = ordre alphabétique croissant
  sortOrder = 'az';

  // Fonction qui trie la liste des Pokémon selon l’ordre défini
  sortPokemons() {
    this.pokemons.sort((a, b) => {
      const nameA = a.name.toLowerCase(); // Nom du Pokémon A en minuscules
      const nameB = b.name.toLowerCase(); // Nom du Pokémon B en minuscules

      // Si tri en ordre alphabétique normal
      if (this.sortOrder === 'az') {
        return nameA.localeCompare(nameB);
      }
      // Sinon, tri en ordre alphabétique inversé
      else {
        return nameB.localeCompare(nameA);
      }
    });
  }
}
