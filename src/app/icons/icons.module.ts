import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatherModule } from 'angular-feather';
import { PlusSquare, Maximize2, Calendar, Unlock, Sun, StopCircle, Square, User, Link, Mail, X, Save } from 'angular-feather/icons';

const icons = {
  PlusSquare,
  Maximize2,
  Calendar,
  Unlock,
  Sun,
  StopCircle,
  Square,
  User,
  Link,
  Mail,
  X, 
  Save
};

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FeatherModule.pick(icons)
  ],
  exports: [
    FeatherModule
  ]
})
export class IconsModule { }
