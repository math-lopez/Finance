import { Component, Injector, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { switchMap } from 'rxjs/operators';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form.component';
import { Category } from '../../categories/shared/category.model';
import { CategoryService } from '../../categories/shared/category.service';
import { Entry } from '../shared/entry.model';
import { EntryService } from '../shared/entry.service';

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css']
})
export class EntryFormComponent extends BaseResourceFormComponent<Entry> {

  categories: Array<Category> = [];
  typesArray: any;


  imaskconfig = {
    mask: Number,
    scale: 2,
    thousandsSeparator: '',
    padFractionalZeros: true,
    normalizeZeros: true,
    radix: ','
  }

  constructor(
    protected entryService: EntryService,
    protected categoryService: CategoryService,
    protected injector: Injector
  ) {
    super(injector, entryService, new Entry)
  }

  protected buildResourceForm(): void {
    this.loadCategories();
    this.typesArray = this.typeOptions();

    this.resourceForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.min(2)]],
      description: [null],
      type: ["expense", [Validators.required]],
      amount: [null, [Validators.required]],
      date: [null, [Validators.required]],
      paid: [true, [Validators.required]],
      categoryId: [null, [Validators.required]],
    })
  }

  //Overhide
  protected editionPageTitle(): string {
    return `Editando entrada: ${this.resource.name ?? '...'}`;
  }

  //Overhide
  protected creationPageTitle(): string {
    return "Nova entrada";
  }


  private typeOptions(): Array<any> {
    return Object.entries(Entry.types).map(
      ([value, text]) => {
        return {
          text: text,
          value: value
        }
      }
    )
  }

  private loadCategories(): void {
    this.categoryService.getAll().subscribe(resp => {
      this.categories = resp;
    });
  }

}
