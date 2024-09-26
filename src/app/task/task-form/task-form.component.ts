import { Component, ViewChild, ElementRef, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconsModule } from '../../icons/icons.module';
import {MatDividerModule} from '@angular/material/divider';
import { TaskService } from '../task.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { ClasificationColor,mentionRegex,hashtagRegex,mailRegex,linkRegex } from '../../utils/utils';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [IconsModule,MatDividerModule,CommonModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent implements OnInit{

  focusTextArea = false;

  inputText = '';
  
  @ViewChild('inputField') input: ElementRef;

  isSmallScreen = false;

  @Output() loadList: EventEmitter<number> = new EventEmitter<number>();

  constructor(private taskService: TaskService, private breakpointObserver: BreakpointObserver){

  }

  ngOnInit(){

    this.breakpointObserver.observe([
      "(max-width: 1230px)"
    ]).subscribe((result: BreakpointState) => {
      if (result.matches) {
        this.isSmallScreen = true  
      } else {
          this.isSmallScreen = false
      }
    });

  }

  onInput(event: any) {
    this.inputText = (event.target as HTMLElement).innerText;
    this.updateContentEditable(event.target as HTMLElement, this.inputText);
  }

  updateContentEditable(element: HTMLElement, text: string) {
    const formattedText = this.formatText(text);

    // Clear current content and set formatted text
    element.innerHTML = formattedText;
    
    // Maintain cursor position
    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(element);
    range.collapse(false); // Move to the end of the text
    selection?.removeAllRanges();
    selection?.addRange(range);
    
    // Focus back on the contenteditable div
    element.focus();
  }

  formatText(text: string)   {
    return  text
      .replace(mailRegex, '<span style="color:'+'orange'+';">$&</span>') // Email
      .replace(mentionRegex, (match) => `<span style="color: green;">${match}</span>`) // Mention
      .replace(hashtagRegex, '<span style="color:'+ClasificationColor.Hashtag+';">#$1</span>') // Hashtag
      .replace(linkRegex, '<span style="color:'+ClasificationColor.Link+';">$&</span>'); // Link
      
      
  }

  showAllForm(focus: boolean){
    this.focusTextArea = focus;
  }

  cancel() {
    this.inputText = '';
    this.updateContentEditable(this.input.nativeElement as HTMLElement, this.inputText);
  }


  // add task
  add() {
    let task = this.taskService.addTask(this.inputText);
    let tasks = this.taskService.getTasks();
    this.cancel();
    this.loadList.emit(tasks.length);
    return task;
  }

}
