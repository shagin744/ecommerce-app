import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type NavCategory = 'all' | 'deals' | 'electronics' | 'fashion' | 'home';

export interface CatalogFilterState {
  category: NavCategory;
  searchTerm: string;
}

@Injectable({
  providedIn: 'root'
})
export class CatalogFilterService {
  private readonly defaultState: CatalogFilterState = {
    category: 'all',
    searchTerm: ''
  };

  private readonly filterStateSubject = new BehaviorSubject<CatalogFilterState>(this.defaultState);

  readonly filterState$ = this.filterStateSubject.asObservable();

  get currentState(): CatalogFilterState {
    return this.filterStateSubject.value;
  }

  updateFilterState(partialState: Partial<CatalogFilterState>) {
    this.filterStateSubject.next({
      ...this.filterStateSubject.value,
      ...partialState
    });
  }

  reset() {
    this.filterStateSubject.next(this.defaultState);
  }
}
