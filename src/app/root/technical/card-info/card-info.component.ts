import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'card-info',
  templateUrl: './card-info.component.html',
  styleUrls: ['./card-info.component.scss'],
})
export class CardInfoComponent implements OnInit {

  @Input()
  logo?: string
  @Input()
  title?: string
  @Input()
  content?: string
  @Input()
  color?: string;

  constructor() { }

  ngOnInit(): void {
  }

}
