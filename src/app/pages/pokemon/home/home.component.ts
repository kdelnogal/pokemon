import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pokemon } from 'src/app/interfaces/pokemon.interface';
import { PokemonService } from '../../../services/pokemon.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  pokemons: Pokemon[] = [];
  pokemons_list: Pokemon[] = [];
  search: string = '';

  constructor( private pokemonService: PokemonService,
               private router: Router ) { }

  ngOnInit(): void {
    this.loadPokemons();
  }

  editPokemon(pokemon: Pokemon) {
    let pokemon_deleted: Pokemon;
    Swal.fire({
      title: `¿Deseas editar a ${ pokemon.name }?`,
      text: "",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, editar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate([`pokemon/edit/${ pokemon.id }`]);
      }
    })
  }

  deletePokemon(pokemon: Pokemon) {
    Swal.fire({
      title: `¿Deseas eliminar a ${ pokemon.name }?`,
      text: "No se podrá revertir esta acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.pokemonService.deletePokemon(pokemon)
        .subscribe( (_) => {
          Swal.fire(
            `Se elimino a ${ pokemon.name }`,
            'Acción exitosa.',
            'success'
          );
          this.loadPokemons();
        } );
      }
    })
  }

  loadPokemons() {
    this.pokemonService.getPokemons()
    .subscribe( pokemons => {
      this.pokemons = pokemons;
      this.pokemons_list = [ ...this.pokemons ];
     });
  }

  searchPokemonList(search: string) {
    if (search == '') {
      this.pokemons_list = [ ...this.pokemons ];
      return;
    }

    this.pokemons_list =  this.pokemons.filter(function(pokemon) {
      return pokemon.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) || pokemon.type.toLocaleLowerCase().includes(search.toLocaleLowerCase());
    });
  }

  resetPokemonList() {
    this.search = '';
    this.pokemons_list = [ ...this.pokemons ];
  }

}
