import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'usernameFormat'
})
export class UsernameFormatPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }
}
