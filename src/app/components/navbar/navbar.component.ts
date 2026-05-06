import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CatalogFilterService, NavCategory } from '../../services/catalog-filter.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  @Input() activeCategory: NavCategory = 'all';
  @Input() searchTerm = '';
  @Output() categorySelected = new EventEmitter<NavCategory>();
  @Output() searchSubmitted = new EventEmitter<string>();

  readonly categories: Array<{ key: NavCategory; label: string }> = [
    { key: 'all', label: 'All' },
    { key: 'deals', label: "Today's Deals" },
    { key: 'electronics', label: 'Electronics' },
    { key: 'fashion', label: 'Fashion' },
    { key: 'home', label: 'Home' }
  ];

  constructor(
    private router: Router,
    private catalogFilterService: CatalogFilterService
  ) {}

  selectCategory(category: NavCategory) {
    this.catalogFilterService.updateFilterState({ category });
    this.categorySelected.emit(category);

    if (this.router.url !== '/') {
      this.router.navigate(['/']);
    }
  }

  submitSearch() {
    const normalizedSearch = this.searchTerm.trim();
    this.catalogFilterService.updateFilterState({ searchTerm: normalizedSearch });
    this.searchSubmitted.emit(normalizedSearch);

    if (this.router.url !== '/') {
      this.router.navigate(['/']);
    }
  }

  goHome() {
    this.catalogFilterService.reset();
    this.categorySelected.emit('all');
    this.searchSubmitted.emit('');
    this.searchTerm = '';
    this.router.navigate(['/']);
  }
}
