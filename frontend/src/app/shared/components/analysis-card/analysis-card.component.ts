import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FiiAnalysis } from "../../../models/analysis.model";

@Component({
  selector: "app-analysis-card",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./analysis-card.component.html",
})
export class AnalysisCardComponent {
  @Input() analysis: FiiAnalysis | null = null;
}

