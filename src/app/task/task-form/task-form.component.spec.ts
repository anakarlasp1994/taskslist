import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskFormComponent } from './task-form.component';
import { TaskListComponent } from '../task-list/task-list.component';
import { TaskService } from '../task.service';
import { By } from '@angular/platform-browser';
import { Task } from '../../utils/utils';

describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let componentTaskList: TaskListComponent;
  let fixture: ComponentFixture<TaskFormComponent>;
  let fixtureTaskList: ComponentFixture<TaskListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskFormComponent,TaskListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskFormComponent);
    fixtureTaskList = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    componentTaskList = fixtureTaskList.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should show the text in the list when you add a text", () => {

    const taskService = fixture.debugElement.injector.get(TaskService);
    let text = "Hola add #text to @list www.er.us";
    component.inputText = text;
    let task: Task = component.add();
    
    fixture.detectChanges();
    fixtureTaskList.detectChanges();

    let tasks = taskService.getTasks();
    expect(tasks).toContain(task); 
   
    componentTaskList.tasks.find(t=>t.id==task.id)?.words?.forEach((word,index) => {
      let span = fixtureTaskList.debugElement.query(By.css(`#span${task.id+'_'+index}`)).nativeElement;
      expect(span.textContent).toContain(word.show);   
    });   
   
  });

  it("when cancel the task, it should not be in the list", () => {

    const taskService = fixture.debugElement.injector.get(TaskService);
    let text = "Hola add #text to @list www.er.us";
    component.inputText = text;
    let oldTasks = taskService.getTasks();

    component.cancel();
    
    fixture.detectChanges();

    let newTasks = taskService.getTasks();
    expect(oldTasks.length).toEqual(newTasks.length);
    expect(component.inputText).toEqual("");  

    let div = fixture.debugElement.query(By.css('#inputField')).nativeElement;
    expect(div.textContent).toEqual("");  
     
  });

});
