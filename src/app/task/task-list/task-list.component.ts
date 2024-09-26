import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';
import { IconsModule } from '../../icons/icons.module';
import { CommonModule } from '@angular/common';
import { ClasificationBackground, ClasificationColor, ClassifiedWord, Task, hashtagRegex, linkRegex, mailRegex, mentionRegex } from '../../utils/utils';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [IconsModule, CommonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnChanges {

  @Input() numTasks: number;

  tasks: Task[];

  constructor(private taskService: TaskService){
    
    this.loadTasks();
  }

  loadTasks(){//

    let tasksTmp = this.taskService.getTasks();
    this.tasks = [];
    if(tasksTmp?.length!=0){
      tasksTmp.forEach(task => {
        task.words = this.classifyTextWords(task.text);
        this.tasks.push(task);
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
      this.loadTasks();
  }

  classifyTextWords(text: string): ClassifiedWord[]  {

    // Split the text into words
    let words = text.split(/\s+/);
    let classifiedWords: ClassifiedWord[] = [];
  
    words.forEach(word => {
      if (mentionRegex.test(word)) {
        classifiedWords.push({ type: 'Mention', value: word, color: ClasificationColor.Mention, background: ClasificationBackground.Mention, show: word.substring(1) });
      } else if (hashtagRegex.test(word)) {
        classifiedWords.push({ type: 'Hashtag', value: word, color: ClasificationColor.Hashtag, background: ClasificationBackground.Hashtag, show: word});
      } else if (linkRegex.test(word)) {
        classifiedWords.push({ type: 'Link', value: word, color: ClasificationColor.Link, background: ClasificationBackground.Link, show: 'Link' });
      } else if (mailRegex.test(word)) {
        classifiedWords.push({ type: 'Mail', value: word, color: ClasificationColor.Mail, background: ClasificationBackground.Mail, show: 'Mail' });
      } else {
        classifiedWords.push({ type: 'Word', value: word, color: ClasificationColor.Word, background: ClasificationBackground.Word, show: word });
      }
    });
  
    return classifiedWords;
  }
}
