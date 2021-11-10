import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pokemon } from 'src/app/interfaces/pokemon.interface';


@Component({
  selector: 'app-card-pokemon',
  templateUrl: './card-pokemon.component.html',
  styleUrls: ['./card-pokemon.component.css']
})
export class CardPokemonComponent {

  @Input() pokemon!: Pokemon;
  @Output() onEditPokemon: EventEmitter<Pokemon> = new EventEmitter();
  @Output() onDeletePokemon: EventEmitter<Pokemon> = new EventEmitter();

  constructor( ) { }

  editPokemon(pokemon: Pokemon) {
    this.onEditPokemon.emit(pokemon);
  }

  deletePokemon(pokemon: Pokemon) {
    this.onDeletePokemon.emit(pokemon);
  }

}
