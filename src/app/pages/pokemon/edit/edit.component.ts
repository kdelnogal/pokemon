import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PokemonService } from '../../../services/pokemon.service';
import { Pokemon } from '../../../interfaces/pokemon.interface';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit {

  pokemon!: Pokemon;
  pokemonForm!: FormGroup;
  pageLoaded: boolean = false;

  constructor( private activatedRoute: ActivatedRoute,
    private router: Router,
    private pokemonService: PokemonService,
    private fb: FormBuilder ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap( ({ id }) => this.pokemonService.getPokemonById(id) ),
      )
      .subscribe( pokemon => {
        this.pokemon = pokemon;

        this.pokemonForm = this.fb.group({
          'id'      : [ this.pokemon.id, [ Validators.required ]],
          'name'    : [ this.pokemon.name, [ Validators.required, Validators.minLength(3) ]],
          'image'   : [ this.pokemon.image, [ Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?') ]],
          'hp'      : [ this.pokemon.hp, [ Validators.required, Validators.min(0), Validators.max(100) ]],
          'attack'  : [ this.pokemon.attack, [ Validators.required, Validators.min(0), Validators.max(100) ]],
          'defense' : [ this.pokemon.defense, [ Validators.required, Validators.min(0), Validators.max(100) ]],
          'type'    : [ this.pokemon.type, [ Validators.required ]],
        });
      },
      err => this.pageLoaded = true );
  }

  inputIsValid( input: string): boolean | null {
    return this.pokemonForm.controls[input].errors &&
           this.pokemonForm.controls[input].touched;
  }

  submitForm(): void {
    let formValues = { ...this.pokemonForm.value }
    
    this.pokemon = formValues;
    console.log(this.pokemon);
    if (this.pokemonForm.invalid) {
      this.pokemonForm.markAllAsTouched();
      return;
    }

    Swal.fire({
      title: `¿Deseas actualizar a ${ this.pokemon.name }?`,
      text: "No se podrá revertir esta acción!",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí'
    }).then((result) => {
      if (result.isConfirmed) {
          this.pokemonService.updatePokemon(this.pokemon)
          .subscribe( pokemon => {
    
          this.pokemon = pokemon;
          this.alertUpdate(this.pokemon);
        });
        }
      });
    
  }

  alertUpdate(pokemon: Pokemon): void {
    Swal.fire({
      title: `Pokémon actualizado: ${ pokemon.name }`,
      text: "¿Deseas regresar al listado de pokémons?",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí'
    }).then((result) => {
      if (result.isConfirmed) {
          this.router.navigate(['pokemon']);
        }
      })
  }

}
