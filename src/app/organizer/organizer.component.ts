import {Component, OnInit} from '@angular/core';
import {DataService} from "../shared/data.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Task, TaskService} from "../shared/task.service";
import {switchMap} from "rxjs";

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.scss']
})
export class OrganizerComponent implements OnInit {
  form: FormGroup
  tasks: Task[] = [];

  constructor(public dateService: DataService,
              public taskService: TaskService) {
  }

  ngOnInit(): void {
    this.dateService.date.pipe(
      switchMap(value => this.taskService.load(value))
    ).subscribe(tasks => {
      this.tasks = tasks
    })

    this.form = new FormGroup({
      title: new FormControl('', Validators.required)
    })
  }

  submit() {
    const {title} = this.form.value
    const task: Task = {
      title,
      date: this.dateService.date.value.format('DD-MM-YYYY')
    }

    this.taskService.create(task).subscribe(task => {
      this.tasks.push(task);
      this.form.reset();
    }, err => console.error(err))

  }

  remove(task: Task) {
this.taskService.remove(task).subscribe(()=>{
  this.tasks= this.tasks.filter(t =>t.id !==task.id)
}, err=> console.log(err))
  }
}
