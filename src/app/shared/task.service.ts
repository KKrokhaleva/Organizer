import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";


export interface Task {
  id?: string;
  title: string;
  date?: string;
}

@Injectable({providedIn: 'root'})
export class TaskService {
  static url = 'https://organizer-337cc-default-rtdb.firebaseio.com'

  constructor(private http: HttpClient) {

  }

  create(task: Task): Observable<Task> {
    return this.http
      .post<any>(`${TaskService.url}/${task.date}.json`, task)
      .pipe(map(res=> {
        console.log(res);
        return res
      }))
  }
}
