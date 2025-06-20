// On importe les outils nécessaires pour tester un composant Angular
import { ComponentFixture, TestBed } from '@angular/core/testing';

// On importe le composant que l'on veut tester
import { PokemonListComponent } from './pokemon-list.component';

// On définit un groupe de tests pour le composant PokemonListComponent
describe('PokemonListComponent', () => {

  // Variable pour stocker l'instance du composant
  let component: PokemonListComponent;

  // Variable pour stocker le "fixture", qui donne accès à l'environnement du composant (HTML + instance)
  let fixture: ComponentFixture<PokemonListComponent>;

  // Avant chaque test, on prépare l’environnement de test
  beforeEach(async () => {

    // On configure le module de test Angular
    await TestBed.configureTestingModule({
      // On importe le composant standalone à tester
      imports: [PokemonListComponent]
    })
      // On compile les fichiers HTML et CSS associés au composant
      .compileComponents();

    // On crée une instance du composant dans un environnement Angular simulé
    fixture = TestBed.createComponent(PokemonListComponent);

    // On récupère l'instance TypeScript du composant pour interagir avec ses propriétés et méthodes
    component = fixture.componentInstance;

    // On déclenche la détection de changements pour mettre à jour le DOM avec les données du composant
    fixture.detectChanges();
  });

  // Test de base : on vérifie que le composant a bien été créé
  it('should create', () => {
    // Le test réussit si le composant existe (il n’est pas null ou undefined)
    expect(component).toBeTruthy();
  });
});
