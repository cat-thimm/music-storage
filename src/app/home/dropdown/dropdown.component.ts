import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent {
  @Input() dropdown: any[] | null = [];
  @Input() title: string = '';
  @Input() selected: any;
  @Output() selectedChange = new EventEmitter();
}
