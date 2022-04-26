import { Component, OnInit, Input } from '@angular/core';
import { MESSAGE } from './../../const/message'

@Component({
  selector: 'app-input-error',
  templateUrl: './input-error.component.html',
  styleUrls: ['./input-error.component.scss']
})
export class InputErrorComponent implements OnInit {
  @Input() errorType: string;
  errorMessage: string = '';
  constructor() { }

  ngOnInit(): void {
    Object.keys(MESSAGE).forEach(key => {
      if (key === this.errorType) {
        this.errorMessage = MESSAGE[key as keyof typeof MESSAGE]
      }
    });
  }

}
