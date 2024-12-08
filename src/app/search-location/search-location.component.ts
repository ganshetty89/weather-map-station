import { Component, EventEmitter, Output, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-location',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-location.component.html',
  styleUrls: ['./search-location.component.scss'],
})
export class SearchLocationComponent implements OnChanges {
  @Input() suggestions: string[] = []; // Explicitly type as string array
  @Output() locationSelected = new EventEmitter<string>(); // Emit selected location

  searchQuery: string = ''; // User input
  filteredSuggestions: string[] = []; // Filtered suggestions for dropdown

  // ngOnChanges lifecycle hook to handle input changes
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['suggestions']) {
      console.log('Suggestions:', this.suggestions); // Debug suggestions
    }
  }

  onSearch(): void {
    const query = this.searchQuery.trim().toLowerCase();
    this.filteredSuggestions = this.suggestions.filter((name) =>
      name.toLowerCase().includes(query)
    );

    // Hide dropdown if search query is empty
    if (!query) {
      this.filteredSuggestions = [];
    }

    console.log('Filtered Suggestions:', this.filteredSuggestions); // Debug filtered suggestions
  }

  selectSuggestion(suggestion: string): void {
    this.searchQuery = suggestion;
    this.filteredSuggestions = [];
    this.locationSelected.emit(suggestion); // Emit the selected location
  }
}
