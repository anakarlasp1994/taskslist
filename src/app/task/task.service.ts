import { Injectable } from '@angular/core';
import { Task } from '../utils/utils';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private tasks: Task[] = [
    {id: 1, text: "#Important Write tell about https://staging.alldone.app" },
    {id: 2, text: "#Important Write to some_email@gmail.com and tell @natasha about https://staging.alldone.app"},
    {id: 3, text: "Check out https://www.example.com or http://sub.example.org/path?query=test or visit www.my-site.net."}
  ];

  constructor() { }

  public getTasks(){
    return this.tasks;
  }

  public addTask(newTask: string): Task {
    let newTaskObj: Task = {id: this.tasks.length+1, text: newTask}; 
    this.tasks.push(newTaskObj);
    return newTaskObj;
  }
}
