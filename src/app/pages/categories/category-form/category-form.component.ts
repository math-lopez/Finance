import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { CategoryService } from '../shared/category.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from '../shared/category.model';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit, AfterContentChecked {

  currencyAction: string = "";
  categoryForm: FormGroup = new FormGroup({});
  pageTitle: string = "";
  serverErrorMessage: string[] = [];
  submittingForm: boolean = false;
  category: Category = new Category();

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {
  }


  ngOnInit(): void {
    this.setCurrentAction();
    this.buildCategoryForm();
    this.loadCategory();

  }

  ngAfterContentChecked(): void {
    this.setPageTitle();
  }

  submitForm() {
    this.submittingForm = true;

    if (this.currencyAction == 'new')
      this.createCategory();
    else
      this.updateCategory();
  }


  private setCurrentAction() {
    this.route.snapshot.url[0].path == "new" ?
      this.currencyAction = "new" : this.currencyAction = "edit";
  }

  private buildCategoryForm() {
    this.categoryForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.min(2)]],
      description: [null]
    })
  }

  private loadCategory() {
    if (this.currencyAction == "edit") {
      this.route.paramMap.pipe(
        switchMap(p => {
          return this.categoryService.getById(p.get("id"))
        })
      )
        .subscribe(category => {
          this.category = category;
          this.categoryForm.patchValue(category);
        },
          error => alert("Error in load category"))
    }
  }

  private setPageTitle() {
    this.currencyAction == "edit" ?
      this.pageTitle = "Editando categoria: " + (this.category.name || "") :
      this.pageTitle = "Cadatro de nova categoria";
  }

  private updateCategory() {
    const category: Category = { ...this.categoryForm.value }
    this.categoryService.update(category).subscribe(
      cat => this.actionForSuccess(cat),
      error => this.actionsForError(error)
    )
  }

  private createCategory() {
    const category: Category = { ...this.categoryForm.value }
    this.categoryService.create(category).subscribe(
      cat => this.actionForSuccess(cat),
      error => this.actionsForError(error)
    )
  }

  private actionsForError(error: any): void {
    this.toastr.error("Failed insert category");
    this.submittingForm = false;
  }

  private actionForSuccess(cat: Category): void {
    this.toastr.success("Category add success");
    this.router.navigateByUrl('/categories', { skipLocationChange: true }).then(
      () => this.router.navigate(["categories", cat.id, "edit"])
    );
  }
}
