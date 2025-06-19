import { Routes } from '@angular/router';
//import { PokemonListComponent } from './pokemon-list.component.ts';
//import { PokemonDetailComponent } from './components/pokemon-detail.component.ts/pokemon-detail.component';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { PokemonDetailComponent } from './components/pokemon-detail/pokemon-detail.component';



export const routes: Routes = [
    { path: '', component: PokemonListComponent },
    { path: 'pokemon/:name', component: PokemonDetailComponent }
];
