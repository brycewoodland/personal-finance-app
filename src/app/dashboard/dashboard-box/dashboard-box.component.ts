import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-box',
  templateUrl: './dashboard-box.component.html',
  styleUrls: ['./dashboard-box.component.css'],
  standalone: false
})
export class DashboardBoxComponent {
  @Input() background: string = '';
  @Input() text: string = 'Default Box';
  @Input() bottomCircleColor: string = '';
  @Input() topCircleColor: string = '';
}
