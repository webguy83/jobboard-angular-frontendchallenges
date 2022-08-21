import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter-input',
  templateUrl: './filter-input.component.html',
  styleUrls: ['./filter-input.component.scss'],
})
export class FilterInputComponent implements OnInit {
  constructor() {}

  @Input() icon = '';
  @Input() placeholder = '';
  sourceURL = '';

  ngOnInit(): void {
    this.sourceURL = `../../../assets/desktop/${this.icon}.svg`;
  }
}
