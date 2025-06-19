import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css']
})
export class PokemonDetailComponent implements OnInit {
  pokemon: any;
  route = inject(ActivatedRoute);
  pokemonService = inject(PokemonService);
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

}