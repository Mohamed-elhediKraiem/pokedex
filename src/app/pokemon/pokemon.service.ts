import { Injectable } from '@angular/core';
import {Pokemon} from "./pokemon";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, of, tap} from "rxjs";

@Injectable()
export class PokemonService {
  constructor(private http : HttpClient) { }
  getPokemonList(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>('api/pokemons').pipe(
        tap((pokemonList) => this.log(pokemonList)),
        catchError((error) => this.handleError(error, []))
    )
  }
  getPokemonById(pokemonId : number): Observable<Pokemon | undefined> {
    return this.http.get<Pokemon>(`api/pokemons/${pokemonId}`).pipe(
        tap((pokemon) => this.log(pokemon)),
        catchError((error) => this.handleError(error, undefined))
    );
  }
  updatePokemon(pokemon : Pokemon): Observable<null> {
    const httpOptions = {
      headers : new HttpHeaders({'Content-Type':'application/json'})
    }
    return this.http.put<Pokemon>('api/pokemons', pokemon, httpOptions).pipe(
        tap((pokemon) => this.log(pokemon)),
        catchError((error) => this.handleError(error, null))
    );
  }
  deletePokemonById(pokemonId : number): Observable<null> {
    return this.http.delete<Pokemon>(`api/pokemons/${pokemonId}`).pipe(
        tap((pokemon) => this.log(pokemon)),
        catchError((error) => this.handleError(error, null))
    );
  }
  addPokemon(pokemon : Pokemon): Observable<Pokemon>{
    const httpOptions = {
      headers : new HttpHeaders({'Content-Type':'application/json'})
    }
    return this.http.post<Pokemon>('api/pokemons', pokemon, httpOptions).pipe(
        tap((pokemon) => this.log(pokemon)),
        catchError((error) => this.handleError(error, null))
    );
  }
  searchPokemonList(term: string): Observable<Pokemon[]>{
    if(term.length <= 1){
      return of([]);
    }
    return this.http.get<Pokemon[]>(`api/pokemons/?name=${term}`).pipe(
        tap((pokemonList) => this.log(pokemonList)),
        catchError((error) => this.handleError(error, []))
    )
  }
  private log(response : Pokemon | Pokemon[] | undefined){
      console.table(response);
  }
  private handleError(error : Error, errorValue: any){
      console.error(error);
      return of(errorValue);
  }
  getPokemonTypeList(): string[]{
    return ['Plante','Feu','Eau','Insecte','Normal','Electrik','Poison','Fée','Vol', 'Combat', 'Psy']
  }
}
