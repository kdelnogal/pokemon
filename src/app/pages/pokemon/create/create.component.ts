import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PokemonService } from '../../../services/pokemon.service';
import { Pokemon } from '../../../interfaces/pokemon.interface';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html'
})
export class CreateComponent implements OnInit {

  pokemon: Pokemon = {
    name      : '',
    image     : '',
    hp        : 50,
    attack    : 50,
    defense   : 50,
    type      : '',
    idAuthor  : environment.idAuthor
  };
  pokemonForm!: FormGroup;

  constructor( private activatedRoute: ActivatedRoute,
    private router: Router,
    private pokemonService: PokemonService,
    private fb: FormBuilder ) { }

  ngOnInit(): void {

    this.pokemonForm = this.fb.group({
      'name'    : [ '', [ Validators.required, Validators.minLength(3) ]],
      'image'   : [ '', [ Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?') ]],
      'hp'      : [ 50, [ Validators.required, Validators.min(0), Validators.max(100) ]],
      'attack'  : [ 50, [ Validators.required, Validators.min(0), Validators.max(100) ]],
      'defense' : [ 50, [ Validators.required, Validators.min(0), Validators.max(100) ]],
      'type'    : [ '', [ Validators.required ]],
      'idAuthor': [ environment.idAuthor, [ Validators.required ]],
    });
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
      title: `¿Deseas crear a ${ this.pokemon.name }?`,
      text: "No se podrá revertir esta acción!",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí'
    }).then((result) => {
      if (result.isConfirmed) {
        this.pokemonService.createPokemon(this.pokemon)
        .subscribe( pokemon => {
          
          this.pokemonForm.reset(); 
          this.pokemon = pokemon;
          this.alertCreate(this.pokemon);
        });
        }
      });
    
  }

  alertCreate(pokemon: Pokemon): void {
    Swal.fire({
      title: `Pokémon creado: ${ pokemon.name }`,
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
