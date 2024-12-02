import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  standalone: true,
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  searchQuery: string = ''; // Bind to the search input

  @Output() searchEvent = new EventEmitter<string>(); // Emit the search query
  @Output() clearEvent = new EventEmitter<void>(); // Emit when the search is cleared

  // Emit search query on input
  onSearch(): void {
    this.searchEvent.emit(this.searchQuery.trim());
  }

  // Emit clear event and reset searchQuery
  clearSearch(): void {
    this.searchQuery = '';
    this.clearEvent.emit();
  }
}
