import {Component, OnInit} from '@angular/core';
import {DataService} from "../shared/data.service";

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss']
})
export class SelectorComponent implements OnInit {
  constructor(public dateService: DataService) {
  }


  go(n: number) {
    this.dateService.changeMonth(n);
  }

  ngOnInit(): void {
  }

}
