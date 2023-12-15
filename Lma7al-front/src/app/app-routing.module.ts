import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompetitionsComponent } from './pages/competitions/competitions.component';
import { CompetitionComponent } from './pages/competition/competition.component';

const routes: Routes = [
  {path: "", component: CompetitionsComponent, title: "Competitions page"},
  {path: "competition/:code", component: CompetitionComponent, title: "competition", pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
