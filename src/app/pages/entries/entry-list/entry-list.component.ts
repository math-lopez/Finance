import { Component, OnInit } from '@angular/core';
import { Entry } from '../shared/entry.model';
import { EntryService } from '../shared/entry.service';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css']
})
export class EntryListComponent implements OnInit {

  entries: Entry[] = [];

  constructor(private entryService: EntryService) { }

  ngOnInit(): void {
    this.initEntries();
  }

  initEntries() {
    this.entryService.getAll().subscribe(
      entries => this.entries = entries,
      error => alert("Error in loading list entries"));
  }

  deleteEntry(id: number = 0) {
    const mustDelete = confirm("Deseja realmente excluir esse item?")

    if (!mustDelete) return;

    this.entryService.delete(id).subscribe(
      resp => this.initEntries(),
      error => alert("Error in delete entry")
    )
  }

}
