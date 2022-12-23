import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WorkersComponent} from "./recognition/pages/workers/workers.component";
import {WorkersByGenderComponent} from "./recognition/components/workers-by-gender/workers-by-gender.component";
import {WinnerComponent} from "./recognition/pages/winner/winner.component";
import {NavbarComponent} from "./recognition/pages/navbar/navbar.component";

const routes: Routes = [
  // {path: '', component: WorkersComponent},
  { path: '', redirectTo: '/workers', pathMatch: 'full' },
  {path: 'workers', component: NavbarComponent},
  {path: 'winner', component: WinnerComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
