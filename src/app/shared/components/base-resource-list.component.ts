import { Inject, Injectable, Injector, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BaseResourceModel } from '../models/base-resource-model';
import { BaseResourceService } from '../services/base-resource-service';

@Injectable()
export abstract class BaseResourceList<T extends BaseResourceModel> implements OnInit {

    resources: Array<T> = new Array<T>();
    protected toastr: ToastrService;

    constructor(protected injector: Injector, protected resourceService: BaseResourceService<T>, @Inject('resources') protected resource: Array<T>) {
        this.toastr = injector.get(ToastrService)
    }

    ngOnInit(): void {
        this.initResources()
    }

    initResources() {
        this.resourceService.getAll().subscribe(
            resources => this.resources = resources,
            error => alert("Error in loading list entries"));
    }

    deleteResource(id: number = 0) {
        const mustDelete = confirm("Deseja realmente excluir esse item?")

        if (!mustDelete) return;

        this.resourceService.delete(id).subscribe(
            resp => {
                this.initResources();
                this.toastr.success("Deleted category");
            },
            error => this.toastr.error("Erro in delete entry")
        )
    }
}
