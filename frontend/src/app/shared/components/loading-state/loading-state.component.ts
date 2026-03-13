import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-loading-state",
  standalone: true,
  imports: [CommonModule],
  template: `<div class="loading">Carregando análise...</div>`,
})
export class LoadingStateComponent {}

