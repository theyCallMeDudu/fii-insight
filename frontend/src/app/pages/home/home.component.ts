import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Router } from "@angular/router";
import { SearchFormComponent } from "../../shared/components/search-form/search-form.component";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [CommonModule, RouterModule, SearchFormComponent],
  templateUrl: "./home.component.html",
})
export class HomeComponent {
  constructor(private readonly router: Router) {}

  onSubmitTicker(ticker: string) {
    this.router.navigate(["/analyze", ticker]);
  }
}

