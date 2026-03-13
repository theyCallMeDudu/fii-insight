import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FiiData } from "../../../models/fii.model";

@Component({
  selector: "app-fii-summary-card",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./fii-summary-card.component.html",
})
export class FiiSummaryCardComponent {
  @Input() fii: FiiData | null = null;
}

