import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntriesRoutingModule } from './entries-routing.module';
import { CalendarModule } from 'primeng/calendar';
import { IMaskModule } from 'angular-imask';
import { EntryListComponent } from './entry-list/entry-list.component';
import { EntryFormComponent } from './entry-form/entry-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EntryListComponent,
    EntryFormComponent
  ],
  imports: [
    CommonModule,
    EntriesRoutingModule,
    ReactiveFormsModule,
    IMaskModule,
    CalendarModule,
    FormsModule
  ]
})
export class EntriesModule { }
