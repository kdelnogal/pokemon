import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Pokemon } from '../interfaces/pokemon.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor( private http: HttpClient ) { }

  getPokemons(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(`${ environment.apiUrl }/?idAuthor=${ environment.idAuthor }`)
  }

  createPokemon(pokemon: Pokemon): Observable<Pokemon> {
    return this.http.post<Pokemon>(`${ environment.apiUrl }/?idAuthor=${ environment.idAuthor }`, pokemon)
  }

  getPokemonById(id: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${ environment.apiUrl }/${ id }`)
  }

  deletePokemon(pokemon: Pokemon): Observable<Pokemon> {
    return this.http.delete<Pokemon>(`${ environment.apiUrl }/${ pokemon.id }`)
  }

  updatePokemon(pokemon: Pokemon): Observable<Pokemon> {
    return this.http.put<Pokemon>(`${ environment.apiUrl }/${ pokemon.id }`, pokemon)
  }
}
