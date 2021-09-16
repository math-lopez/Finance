import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BreadCrumbComponent } from './components/bread-crumb/bread-crumb.component';
import { CategoriesRoutingModule } from '../pages/categories/categories-routing.module';
import { EntriesRoutingModule } from '../pages/entries/entries-routing.module';

@NgModule({
  declarations: [
    BreadCrumbComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CategoriesRoutingModule,
    EntriesRoutingModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    BreadCrumbComponent
  ]
})
export class SharedModule { }
