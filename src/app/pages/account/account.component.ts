import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './account.component.html'
})
export class AccountComponent {}
