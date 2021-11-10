import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './pages/pokemon/create/create.component';
import { EditComponent } from './pages/pokemon/edit/edit.component';
import { HomeComponent } from './pages/pokemon/home/home.component';
import { PokemonComponent } from './pages/pokemon/pokemon.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';

const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent, pathMatch: 'full' },
  { 
    path: 'pokemon', 
    component: PokemonComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'create', component: CreateComponent  },
      { path: 'edit/:id', component: EditComponent },
      { path: '**', redirectTo: '/pokemon/home', pathMatch: 'full' },
    ]
  },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: '**', redirectTo: 'welcome', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
