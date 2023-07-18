import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { DropdownOption } from 'src/app/common/models/dropdown-option';

@Component({
  selector: 'app-multiselect-autocomplete',
  templateUrl: './multiselect-autocomplete.component.html',
  styleUrls: ['./multiselect-autocomplete.component.scss'],
})
export class MultiselectAutocompleteComponent {
  @Input() formControlName: string = '';
  @Input() options: DropdownOption[] = [];

  selectedOptions = new Array<DropdownOption>();

  optionClicked(event: Event, option: any) {
    event.stopPropagation();
    this.toggleSelection(option);
  }

  toggleSelection(option: any) {
    option.selected = !option.selected;
    if (option.selected) {
      this.options.push(option);
    } else {
      const i = this.options.findIndex((option) => option.value);
      this.options.splice(i, 1);
    }
  }

  displayFn(options: DropdownOption[] | string): string {
    let displayValue: string = '';
    if (Array.isArray(options)) {
      options.forEach((option, index) => {
        if (index === 0) {
          displayValue = option.value;
        } else {
          displayValue += ', ' + option.value;
        }
      });
    } else {
      displayValue = options;
    }
    return displayValue;
  }
}
