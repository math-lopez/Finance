import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntryFormComponent } from './entry-form/entry-form.component';
import { EntryListComponent } from './entry-list/entry-list.component';

const routes: Routes = [
  { path: '', component: EntryListComponent, pathMatch: 'full' },
  { path: 'new', component: EntryFormComponent, pathMatch: 'full' },
  { path: ':id/edit', component: EntryFormComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntriesRoutingModule { }
