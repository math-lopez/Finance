import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { IMaskModule } from 'angular-imask';
import { CalendarModule } from 'primeng/calendar';

import { EntriesRoutingModule } from './entries-routing.module';
import { EntryListComponent } from './entry-list/entry-list.component';
import { EntryFormComponent } from './entry-form/entry-form.component';


@NgModule({
  declarations: [
    EntryListComponent,
    EntryFormComponent
  ],
  imports: [
    EntriesRoutingModule,
    IMaskModule,
    CalendarModule,
    SharedModule
  ]
})
export class EntriesModule { }
