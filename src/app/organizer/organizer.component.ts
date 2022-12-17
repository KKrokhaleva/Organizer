import {Component, OnInit} from '@angular/core';
import {DataService} from "../shared/data.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Task, TaskService} from "../shared/task.service";

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.scss']
})
export class OrganizerComponent implements OnInit {
  form: FormGroup

  constructor(public dateService: DataService,
              private taskService: TaskService) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      tittle: new FormControl('', Validators.required)
    })
  }

  submit() {
    const {title} = this.form.value
    const task: Task = {
      title,
      date: this.dateService.date.value.format('DD-MM-YYYY')
    }

    this.taskService.create(task).subscribe(task => {
      this.form.reset();
    }, err => console.error(err))

  }
}
