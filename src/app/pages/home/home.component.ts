import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { CatalogFilterService, NavCategory } from '../../services/catalog-filter.service';
import { ProductService } from '../../services/product.service';
import { Subscription } from 'rxjs';


@Component({
  standalone: true,
  selector: 'app-home',
  imports: [
    CommonModule,
    RouterModule,
    ProductCardComponent,
    NavbarComponent
  ],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, OnDestroy {
  products: any[] = [];
  filteredProducts: any[] = [];
  activeCategory: NavCategory = 'all';
  searchTerm = '';
  private filterSubscription?: Subscription;

  constructor(
    private productService: ProductService,
    private catalogFilterService: CatalogFilterService
  ) {}

  ngOnInit() {
    this.productService.getProducts().subscribe((data: any) => {
      this.products = data;
      this.applyFilters();
    });

    this.filterSubscription = this.catalogFilterService.filterState$.subscribe(state => {
      this.activeCategory = state.category;
      this.searchTerm = state.searchTerm;
      this.applyFilters();
    });
  }

  onCategorySelected(category: NavCategory) {
    this.catalogFilterService.updateFilterState({ category });
  }

  onSearchSubmitted(searchTerm: string) {
    this.catalogFilterService.updateFilterState({ searchTerm });
  }

  ngOnDestroy() {
    this.filterSubscription?.unsubscribe();
  }

  private applyFilters() {
    let visibleProducts = [...this.products];

    switch (this.activeCategory) {
      case 'deals':
        visibleProducts = visibleProducts.filter(product => Number(product.price) <= 100);
        break;
      case 'electronics':
        visibleProducts = visibleProducts.filter(product => product.category === 'electronics');
        break;
      case 'fashion':
        visibleProducts = visibleProducts.filter(
          product => typeof product.category === 'string' && product.category.includes('clothing')
        );
        break;
      case 'home':
        visibleProducts = visibleProducts.filter(product => product.category === 'jewelery');
        break;
    }

    const normalizedSearch = this.searchTerm.trim().toLowerCase();

    if (normalizedSearch) {
      visibleProducts = visibleProducts.filter(product => {
        const title = String(product.title ?? '').toLowerCase();
        const category = String(product.category ?? '').toLowerCase();
        const description = String(product.description ?? '').toLowerCase();

        return title.includes(normalizedSearch)
          || category.includes(normalizedSearch)
          || description.includes(normalizedSearch);
      });
    }

    this.filteredProducts = visibleProducts;
  }
}
