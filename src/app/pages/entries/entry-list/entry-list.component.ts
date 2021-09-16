import { Component, Injector, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BaseResourceList } from 'src/app/shared/components/base-resource-list.component';
import { Entry } from '../shared/entry.model';
import { EntryService } from '../shared/entry.service';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css']
})
export class EntryListComponent extends BaseResourceList<Entry> {

  constructor(protected injector: Injector, protected entryService: EntryService) {
    super(injector, entryService, new Array<Entry>())
  }
}
