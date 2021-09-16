import { Component, Input, OnInit } from '@angular/core';

export interface BreadCrumbItem {
  text: string;
  link: string;
}

@Component({
  selector: 'app-bread-crumb',
  templateUrl: './bread-crumb.component.html',
  styleUrls: ['./bread-crumb.component.css']
})
export class BreadCrumbComponent implements OnInit {

  @Input() items: Array<BreadCrumbItem> = new Array<BreadCrumbItem>();

  constructor() { }

  ngOnInit(): void {
  }

  isTheLastItem(e: BreadCrumbItem): boolean {
    return this.items[this.items.length - 1] == e;
  }

}
