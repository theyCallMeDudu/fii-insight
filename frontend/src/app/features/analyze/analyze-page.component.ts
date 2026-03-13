import { Component, OnDestroy, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, RouterModule, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { FiiService, AnalyzeFiiResponse } from "../../core/services/fii.service";
import { FiiSummaryCardComponent } from "../../shared/components/fii-summary-card/fii-summary-card.component";
import { FiiMetricsGridComponent } from "../../shared/components/fii-metrics-grid/fii-metrics-grid.component";
import { AnalysisCardComponent } from "../../shared/components/analysis-card/analysis-card.component";
import { LoadingStateComponent } from "../../shared/components/loading-state/loading-state.component";
import { ErrorStateComponent } from "../../shared/components/error-state/error-state.component";
import { FiiData } from "../../models/fii.model";

@Component({
  selector: "app-analyze-page",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FiiSummaryCardComponent,
    FiiMetricsGridComponent,
    AnalysisCardComponent,
    LoadingStateComponent,
    ErrorStateComponent,
  ],
  templateUrl: "./analyze-page.component.html",
})
export class AnalyzePageComponent implements OnInit, OnDestroy {
  analysis: AnalyzeFiiResponse | null = null;
  fii: FiiData | null = null;
  loading = false;
  error: string | null = null;

  private sub: Subscription | null = null;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly fiiService: FiiService,
  ) {}

  ngOnInit() {
    this.sub = this.route.paramMap.subscribe((params) => {
      const ticker = (params.get("ticker") || "").toUpperCase();
      if (!ticker) {
        this.router.navigateByUrl("/");
        return;
      }
      this.fetchAnalysis(ticker);
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  private fetchAnalysis(ticker: string) {
    this.loading = true;
    this.error = null;
    this.analysis = null;
    this.fii = null;

    this.fiiService.analyzeFii(ticker).subscribe({
      next: (res) => {
        this.analysis = { ...res, ticker };
        // Enquanto o backend ainda não expõe os dados do FII na resposta,
        // mantemos fii como null. Quando isso mudar, este trecho pode ser ajustado.
        this.loading = false;
      },
      error: () => {
        this.error =
          "Não foi possível obter a análise neste momento. Tente novamente mais tarde.";
        this.loading = false;
      },
    });
  }
}

