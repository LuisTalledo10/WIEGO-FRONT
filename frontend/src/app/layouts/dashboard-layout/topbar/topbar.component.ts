import { Component, EventEmitter, Output, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { SessionService } from '@core/services/session.service';
import { ROLE_LABELS } from '@core/models/enums';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent {
  @Output() toggleSidebar = new EventEmitter<void>();

  private readonly session = inject(SessionService);
  private readonly router = inject(Router);

  readonly displayName = computed(() => {
    const u = this.session.user();
    return u?.name || u?.email || 'Usuario';
  });

  readonly roleLabel = computed(() => {
    const roleId = this.session.user()?.roleId;
    return roleId != null ? ROLE_LABELS[roleId] ?? '' : '';
  });

  readonly initial = computed(() => this.displayName().charAt(0).toUpperCase());

  logout(): void {
    this.session.logout();
    this.router.navigate(['/login']);
  }
}
