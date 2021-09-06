import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { switchMap } from 'rxjs/operators';
import { Category } from '../../categories/shared/category.model';
import { CategoryService } from '../../categories/shared/category.service';
import { Entry } from '../shared/entry.model';
import { EntryService } from '../shared/entry.service';

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css']
})
export class EntryFormComponent implements OnInit {

  currencyAction: string = "";
  entryForm: FormGroup = new FormGroup({});
  pageTitle: string = "";
  serverErrorMessage: string[] = [];
  submittingForm: boolean = false;
  entry: Entry = new Entry();
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

  ptBR = {
    firstDayOfWeek: 0,
    dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    dayNamesMin: ['Do', 'Se', 'Te', 'Qu', 'Qi', 'Se', 'Sa'],
    monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    today: 'hoje',
    clear: 'Limpar'
  }

  constructor(
    private entryService: EntryService,
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
    this.loadCategories();
    this.typesArray = this.typeOptions();

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

  private setCurrentAction() {
    this.route.snapshot.url[0].path == "new" ?
      this.currencyAction = "new" : this.currencyAction = "edit";
  }

  private buildCategoryForm() {
    this.entryForm = this.formBuilder.group({
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

  private loadCategory() {
    if (this.currencyAction == "edit") {
      this.route.paramMap.pipe(
        switchMap(p => {
          return this.entryService.getById(p.get("id"))
        })
      )
        .subscribe(entry => {
          this.entry = entry;
          this.entryForm.patchValue(entry);
        },
          error => alert("Error in load entry"))
    }
  }

  private setPageTitle() {
    this.currencyAction == "edit" ?
      this.pageTitle = "Editando lançamento: " + (this.entry.name || "") :
      this.pageTitle = "Cadatro de novo lançamento";
  }

  private updateCategory() {
    const entry: Entry = { ...this.entryForm.value }
    this.entryService.update(entry).subscribe(
      cat => this.actionForSuccess(cat),
      error => this.actionsForError(error)
    )
  }

  private createCategory() {
    const entry: Entry = { ...this.entryForm.value }
    this.entryService.create(entry).subscribe(
      cat => this.actionForSuccess(cat),
      error => this.actionsForError(error)
    )
  }

  private actionsForError(error: any): void {
    this.toastr.error("Failed insert entry");
    this.submittingForm = false;
  }

  private actionForSuccess(cat: Entry): void {
    this.toastr.success("Entry add success");
    this.router.navigateByUrl('/entries', { skipLocationChange: true }).then(
      () => this.router.navigate(["entries", cat.id, "edit"])
    );
  }

  private loadCategories(): void {
    this.categoryService.getAll().subscribe(resp => {
      this.categories = resp;
    });
  }
}
