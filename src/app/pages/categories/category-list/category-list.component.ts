import { Component, Inject, Injector, OnInit } from '@angular/core';
import { BaseResourceList } from 'src/app/shared/components/base-resource-list.component';
import { BreadCrumbItem } from 'src/app/shared/components/bread-crumb/bread-crumb.component';
import { Category } from '../shared/category.model';

import { CategoryService } from '../shared/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent extends BaseResourceList<Category> {
  constructor(protected injector: Injector, protected categoryService: CategoryService) {
    super(injector, categoryService, new Array<Category>())
  }

}
