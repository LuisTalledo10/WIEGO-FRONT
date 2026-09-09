import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

/**
 * "En construcción" — la recuperación de contraseña por correo/OTP aún no tiene
 * soporte en el backend MVP. Por ahora el restablecimiento lo hace un administrador.
 */
@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {}
