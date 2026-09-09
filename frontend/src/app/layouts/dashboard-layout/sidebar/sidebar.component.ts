import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

interface NavItem {
  label: string;
  route: string;
  icon: string;
  exact?: boolean;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Output() closeSidebar = new EventEmitter<void>();

  groups: NavGroup[] = [
    {
      title: 'GENERAL',
      items: [{ label: 'Dashboard', route: '/dashboard', icon: 'layout-dashboard', exact: true }]
    },
    {
      title: 'PAGOS',
      items: [
        { label: 'Planillas', route: '/planillas', icon: 'banknote' },
        { label: 'Dispersiones', route: '/dispersiones', icon: 'send' },
        { label: 'Operaciones', route: '/operaciones', icon: 'list-checks' }
      ]
    },
    {
      title: 'DIRECTORIO',
      items: [
        { label: 'Empleados', route: '/empleados', icon: 'users' },
        { label: 'Proveedores', route: '/proveedores', icon: 'building-2' }
      ]
    }
  ];
}
