import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-my-kanban',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './my-kanban.component.html',
  styleUrl: './my-kanban.component.css'
})
export class MyKanbanComponent {

}
