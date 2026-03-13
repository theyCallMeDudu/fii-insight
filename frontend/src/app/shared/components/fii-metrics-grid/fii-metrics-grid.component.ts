import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FiiData } from "../../../models/fii.model";

@Component({
  selector: "app-fii-metrics-grid",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./fii-metrics-grid.component.html",
})
export class FiiMetricsGridComponent {
  @Input() fii: FiiData | null = null;
}

