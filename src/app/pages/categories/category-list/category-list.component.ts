import { Component, OnInit } from '@angular/core';
import { Category } from '../shared/category.model';

import { CategoryService } from '../shared/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories: Category[] = [];

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.initCategories();
  }

  initCategories() {
    this.categoryService.getAll().subscribe(
      categories => this.categories = categories,
      error => alert("Error in loading list categories"));
  }

  deleteCateogry(id: number = 0) {
    const mustDelete = confirm("Deseja realmente excluir esse item?")

    if (!mustDelete) return;

    this.categoryService.delete(id).subscribe(
      resp => this.initCategories(),
      error => alert("Error in delete category")
    )
  }

}
