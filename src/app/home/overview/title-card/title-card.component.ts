import {Component, Input} from '@angular/core';
import {Title} from "../../../common/models/title";

@Component({
  selector: 'app-title-card',
  templateUrl: './title-card.component.html',
  styleUrls: ['./title-card.component.scss']
})
export class TitleCardComponent {
  @Input() title: Title | null = null
}
