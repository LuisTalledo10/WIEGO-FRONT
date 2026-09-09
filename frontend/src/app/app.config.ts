import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  LucideAngularModule,
  LayoutDashboard, Banknote, Send, ListChecks, Users, Building2,
  LogOut, Menu, Bell, Plus, ChevronRight, ArrowLeft, FileText,
  CircleCheckBig, CircleX, Pencil, CalendarDays, Download, CircleDollarSign,
  TrendingUp, Trash2, Wallet, Search, Filter
} from 'lucide-angular';

import { routes } from './app.routes';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { errorInterceptor } from './core/interceptors/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor, errorInterceptor])),
    importProvidersFrom(
      LucideAngularModule.pick({
        LayoutDashboard, Banknote, Send, ListChecks, Users, Building2,
        LogOut, Menu, Bell, Plus, ChevronRight, ArrowLeft, FileText,
        CircleCheckBig, CircleX, Pencil, CalendarDays, Download, CircleDollarSign,
        TrendingUp, Trash2, Wallet, Search, Filter
      })
    )
  ]
};
