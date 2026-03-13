import { Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { AnalyzePageComponent } from "./features/analyze/analyze-page.component";

export const appRoutes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "analyze/:ticker",
    component: AnalyzePageComponent,
  },
  {
    path: "**",
    redirectTo: "",
  },
];

