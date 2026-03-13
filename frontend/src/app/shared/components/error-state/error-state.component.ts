import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-error-state",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="error" *ngIf="message">
      {{ message }}
    </div>
  `,
})
export class ErrorStateComponent {
  @Input() message: string | null = null;
}

