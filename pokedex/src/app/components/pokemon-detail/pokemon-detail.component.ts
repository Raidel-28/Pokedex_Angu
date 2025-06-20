import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../services/pokemon.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css']
})
export class PokemonDetailComponent implements OnInit {
  pokemon: any;
  pokemons: any[] = [];
  route = inject(ActivatedRoute);
  typeNames: any;

  ngOnInit(): void {
    const name = this.route.snapshot.paramMap.get('name');
    if (name) {
      this.pokemonService.getPokemonDetails(name).subscribe(data => {
        this.pokemon = data;
      });
    }
  }

  get typesList(): string {
    return this.pokemon?.types?.map((t: { type: { name: string } }) => t.type.name).join(', ') || '';
  }

  constructor(private location: Location, private pokemonService: PokemonService) {
    this.pokemonService.getPokemons().subscribe(data => {
      this.pokemons = data.results;
      this.sortPokemons();
    });
  }
  goBack(): void {
    this.location.back();
  }
  sortOrder = 'az';

  sortPokemons() {
    this.pokemons.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();

      if (this.sortOrder === 'az') {
        return nameA.localeCompare(nameB);
      } else {
        return nameB.localeCompare(nameA);
      }
    });
  }
}
