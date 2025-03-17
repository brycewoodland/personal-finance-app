import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-box',
  templateUrl: './dashboard-box.component.html',
  standalone: false,
  styleUrls: ['./dashboard-box.component.css']
})
export class DashboardBoxComponent {
  @Input() background: string = 'linear-gradient(23deg, #00A3FF 0%, #006299 100%)';
  @Input() text: string = 'Default Box';
  @Input() bottomCircleColor: string = '#ffffff';
  @Input() topCircleColor: string = '#ffffff';
}
