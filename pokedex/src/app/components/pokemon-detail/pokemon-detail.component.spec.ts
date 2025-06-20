// On importe les outils nécessaires pour tester un composant Angular
import { ComponentFixture, TestBed } from '@angular/core/testing';

// On importe le composant que l'on souhaite tester
import { PokemonDetailComponent } from './pokemon-detail.component';

// On définit une suite de tests pour le composant PokemonDetailComponent
describe('PokemonDetailComponent', () => {

  // Variable pour contenir l'instance du composant
  let component: PokemonDetailComponent;

  // Variable pour contenir l'objet de test Angular qui gère le composant et son HTML
  let fixture: ComponentFixture<PokemonDetailComponent>;

  // Avant chaque test, on configure l'environnement de test
  beforeEach(async () => {

    // On configure un module de test avec le composant à tester
    await TestBed.configureTestingModule({
      // Comme le composant est standalone, on peut l'importer directement
      imports: [PokemonDetailComponent]
    })
      // On compile les composants (HTML + CSS) avant de les utiliser
      .compileComponents();

    // On crée une instance du composant dans un environnement de test
    fixture = TestBed.createComponent(PokemonDetailComponent);

    // On récupère l'instance du composant (accès aux propriétés et méthodes)
    component = fixture.componentInstance;

    // On déclenche la détection de changements pour mettre à jour le DOM
    fixture.detectChanges();
  });

  // Test unitaire : on vérifie que le composant est bien créé
  it('should create', () => {
    // Le test réussit si le composant existe (n'est pas null ou undefined)
    expect(component).toBeTruthy();
  });
});
