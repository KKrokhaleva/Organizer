import {Component, OnInit} from '@angular/core';
import {DataService} from "../shared/data.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.scss']
})
export class OrganizerComponent implements OnInit {
  form: FormGroup

  constructor(public dateService: DataService) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      tittle: new FormControl('', Validators.required)
    })
  }

  submit() {
    const {tittle} = this.form.value
    console.log(tittle);
  }
}
