import { TestBed } from '@angular/core/testing';

import { TaskService } from './task.service';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("should created new task and length is 4", () => {
    service.addTask("#Important Write to some_email@gmail.com");
    expect(service.getTasks().length).toBe(4);
  });

  it("should created new task and it should be in the array", () => {
    let task = "#Autor Write @ana";
    let taskObj = service.addTask(task);
    expect(service.getTasks()).toContain(taskObj);
  });

});
