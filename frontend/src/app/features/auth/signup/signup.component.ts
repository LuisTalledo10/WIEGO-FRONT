import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { InputComponent } from '@shared/components/inputs/input/input.component';
import { ButtonComponent } from '@shared/components/buttons/button/button.component';
import { NotificationService } from '@core/services/notification.service';
import { AuthService } from '../data/auth.service';

function passwordsMatch(group: AbstractControl): ValidationErrors | null {
  const pass = group.get('password')?.value;
  const confirm = group.get('confirmPassword')?.value;
  return pass && confirm && pass !== confirm ? { mismatch: true } : null;
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, InputComponent, ButtonComponent],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly auth = inject(AuthService);
  private readonly notify = inject(NotificationService);

  isLoading = false;

  form = this.fb.nonNullable.group(
    {
      companyName: ['', [Validators.required, Validators.maxLength(120)]],
      userName: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    },
    { validators: passwordsMatch }
  );

  get passwordMismatch(): boolean {
    return this.form.hasError('mismatch') && !!this.form.get('confirmPassword')?.touched;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { companyName, userName, email, password } = this.form.getRawValue();
    this.isLoading = true;
    this.auth.signup({ companyName, userName, email, password }).subscribe({
      next: () => {
        this.notify.success('Empresa creada. ¡Bienvenido a Wiego!');
        this.router.navigate(['/dashboard']);
      },
      error: () => (this.isLoading = false)
    });
  }
}
