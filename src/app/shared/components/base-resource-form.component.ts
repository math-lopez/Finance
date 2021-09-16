import { Inject, Injectable, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { switchMap } from 'rxjs/operators';
import { BaseResourceModel } from '../models/base-resource-model';
import { BaseResourceService } from '../services/base-resource-service';

@Injectable()
export abstract class BaseResourceFormComponent<T extends BaseResourceModel> implements OnInit {

    currencyAction: string = "";
    resourceForm: FormGroup = new FormGroup({});
    pageTitle: string = "";
    serverErrorMessage: string[] = [];
    submittingForm: boolean = false;

    protected route: ActivatedRoute;
    protected router: Router;
    protected formBuilder: FormBuilder;
    protected toastr: ToastrService;

    constructor(
        protected injector: Injector,
        protected resourceService: BaseResourceService<T>,
        @Inject('resource') protected resource: T,
    ) {
        this.route = this.injector.get(ActivatedRoute)
        this.router = this.injector.get(Router)
        this.formBuilder = this.injector.get(FormBuilder)
        this.toastr = this.injector.get(ToastrService)
    }


    ngOnInit(): void {
        this.setCurrentAction();
        this.buildResourceForm();
        this.loadResource();

    }

    ngAfterContentChecked(): void {
        this.setPageTitle();
    }

    submitForm() {
        this.submittingForm = true;

        if (this.currencyAction == 'new')
            this.createResource();
        else
            this.updateResource();
    }

    protected setCurrentAction() {
        this.route.snapshot.url[0].path == "new" ?
            this.currencyAction = "new" : this.currencyAction = "edit";
    }

    protected loadResource() {
        if (this.currencyAction == "edit") {
            this.route.paramMap.pipe(
                switchMap(p => {
                    return this.resourceService.getById(p.get("id"))
                })
            )
                .subscribe(resource => {
                    this.resource = resource;
                    this.resourceForm.patchValue(resource);
                },
                    error => alert("Error in load category"))
        }
    }

    protected setPageTitle() {
        this.currencyAction == "edit" ?
            this.pageTitle = this.editionPageTitle() :
            this.pageTitle = this.creationPageTitle();
    }

    protected editionPageTitle(): string {
        return "Edição";
    }

    protected creationPageTitle(): string {
        return "Novo";
    }

    protected updateResource() {
        const resource: T = { ...this.resourceForm.value }
        this.resourceService.update(resource).subscribe(
            res => this.actionForSuccess(res),
            error => this.actionsForError(error)
        )
    }

    protected createResource() {
        const resource: T = { ...this.resourceForm.value }
        this.resourceService.create(resource).subscribe(
            res => this.actionForSuccess(res),
            error => this.actionsForError(error)
        )
    }

    protected actionsForError(error: any): void {
        this.toastr.error("Failed insert category");
        this.submittingForm = false;
    }

    protected actionForSuccess(resource: T): void {
        this.toastr.success("Success");
        this.router.navigateByUrl(`/${this.route.snapshot.parent?.url[0].path}`, { skipLocationChange: true }).then(
            () => this.router.navigate([`${this.route.snapshot.parent?.url[0].path}`, resource.id, "edit"])
        );
    }

    protected abstract buildResourceForm(): void;

}
