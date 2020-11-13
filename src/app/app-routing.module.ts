import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoinEquationBuilderComponent } from './pages/coin-equation-builder/coin-equation-builder.component';

const routes: Routes = [{ path: '', component: CoinEquationBuilderComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
