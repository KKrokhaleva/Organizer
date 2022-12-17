import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import * as moment from "moment";


export interface Task {
  id?: string;
  title: string;
  date?: string;
}

interface CreateResponse{
  name: string
}

@Injectable({providedIn: 'root'})
export class TaskService {
  static url = 'https://organizer-337cc-default-rtdb.firebaseio.com/tasks'

  constructor(private http: HttpClient) {
  }

  load(date: moment.Moment): Observable<Task[]>{
    return this.http
      .get<Task[]>(`${TaskService.url}/${date.format('DD-MM-YYYY')}.json`)
      .pipe(map(tasks=>{
        if(!tasks){
          return[]
        }
        return Object.keys(tasks).map(key=>({...tasks[key], id:key}))
      }))
  }
  create(task: Task): Observable<Task> {
    return this.http
      .post<CreateResponse>(`${TaskService.url}/${task.date}.json`, task)
      .pipe(map(res=> {
        console.log('response',res);
        return {...task, id:res.name};
      }))
  }

  remove(task: Task){
    return this.http
      .delete<void>( `${TaskService.url}/${task.date}/${task.id}.json`)
  }
}
