import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { InputComponent } from '../../../shared/components/inputs/input/input.component';
import { ButtonComponent } from '../../../shared/components/buttons/button/button.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, InputComponent, ButtonComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      remember: [false]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      // Mock login request
      setTimeout(() => {
        localStorage.setItem('token', 'mock-jwt-token-for-wiego');
        this.isLoading = false;
        this.router.navigate(['/dashboard']);
      }, 1000);
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
