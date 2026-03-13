import { Component, EventEmitter, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-search-form",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./search-form.component.html",
})
export class SearchFormComponent {
  @Output() submitTicker = new EventEmitter<string>();

  ticker = "";
  error: string | null = null;

  onSubmit() {
    const value = (this.ticker || "").trim().toUpperCase();
    if (!value) {
      this.error = "Informe um ticker válido antes de analisar.";
      return;
    }
    this.error = null;
    this.submitTicker.emit(value);
  }

  onSuggestionClick(ticker: string) {
    this.ticker = ticker;
    this.error = null;
    this.onSubmit();
  }
}

