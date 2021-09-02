import { Component } from '@angular/core';
import { EntryService } from './pages/entries/shared/entry.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Finance';

  constructor(private a: EntryService) { }
}
