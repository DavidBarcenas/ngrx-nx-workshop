import { Component, Input } from '@angular/core';
import { Todo } from '@ngrx-nx-workshop/data';

@Component({
  selector: 'ngrx-nx-workshop-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent {
  @Input() todos: Todo[] = [];
}
