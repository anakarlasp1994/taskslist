import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskListComponent } from './task-list.component';
import { TaskService } from '../task.service';
import { By } from '@angular/platform-browser';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskListComponent],
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should be updated the tasks list of component, service and the tasks of interface", () => {
    const taskService = fixture.debugElement.injector.get(TaskService);
    fixture.detectChanges();
    let tasks = taskService.getTasks();
   
    expect(tasks).toEqual(component.tasks);

    component.tasks.forEach(task => {
      task.words?.forEach((word,index) => {
        let span = fixture.debugElement.query(By.css(`#span${task.id+'_'+index}`)).nativeElement;
        expect(span.textContent).toContain(word.show);   
      });   
    });
  });
});
