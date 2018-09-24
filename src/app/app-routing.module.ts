import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveComponent } from './reactive/reactive.component';
import { TemplateComponent } from './template/template.component';

const routes: Routes = [
  { path: 'reactive-editor', component: ReactiveComponent },
  { path: 'template-editor', component: TemplateComponent },
  { path: '', redirectTo: '/reactive-editor', pathMatch: 'full' },
  { path: '**', redirectTo: '/reactive-editor', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingRoutingModule { }
