import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { ApiService } from "./api.service";
import { FiiData } from "../../models/fii.model";
import { FiiAnalysis } from "../../models/analysis.model";

export interface AnalyzeFiiResponse extends FiiAnalysis {
  // Backend hoje retorna pelo menos ticker + campos de análise.
  // Se futuramente expor também os dados do FII, este tipo pode ser expandido.
}

@Injectable({
  providedIn: "root",
})
export class FiiService {
  private readonly api = inject(ApiService);

  analyzeFii(ticker: string): Observable<AnalyzeFiiResponse> {
    return this.api.post<AnalyzeFiiResponse>("/analyze", { ticker });
  }
}

