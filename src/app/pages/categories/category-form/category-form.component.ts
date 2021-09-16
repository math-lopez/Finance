import { Component, Injector } from '@angular/core';
import { CategoryService } from '../shared/category.service';

import { Validators } from '@angular/forms';
import { Category } from '../shared/category.model';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form.component';
import { BreadCrumbItem } from 'src/app/shared/components/bread-crumb/bread-crumb.component';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent extends BaseResourceFormComponent<Category>{

  constructor(
    protected categoryService: CategoryService,
    protected injector: Injector
  ) {
    super(injector, categoryService, new Category);
  }

  protected buildResourceForm(): void {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.min(2)]],
      description: [null]
    })
  }

  protected editionPageTitle(): string {
    return `Editando categoria: ${this.resource.name ?? '...'}`;
  }

  protected creationPageTitle(): string {
    return "Nova categoria";
  }
}
