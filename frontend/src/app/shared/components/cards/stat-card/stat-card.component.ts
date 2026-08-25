import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './stat-card.component.html',
  styleUrls: ['./stat-card.component.scss']
})
export class StatCardComponent {
  @Input() title: string = '';
  @Input() amount: string | number = '';
  @Input() currency: string = 'S/';
  @Input() subtitle: string = '';
  
  @Input() iconClass?: string;
  @Input() iconColor: string = 'var(--wiego-orange)';
  @Input() iconBg: string = 'var(--color-surface-secondary)';
}
