import { Component, EventEmitter, Input, Output } from '@angular/core';

import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
  ],
  standalone: true
})
export class DropdownComponent {
  @Input() dropdown: any[] | null = [];
  @Input() title: string = '';
  @Input() selected: any;
  @Output() selectedChange = new EventEmitter();
}
