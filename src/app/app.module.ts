import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoinEquationBuilderComponent } from './pages/coin-equation-builder/coin-equation-builder.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CoinComponent } from './components/coin/coin.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [AppComponent, CoinEquationBuilderComponent, CoinComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DragDropModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
