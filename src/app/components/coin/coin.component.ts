import { Component, Input, OnInit } from '@angular/core';
import { Coin } from 'src/app/models/coin';

@Component({
  selector: 'app-coin',
  templateUrl: './coin.component.html',
  styleUrls: ['./coin.component.scss'],
})
export class CoinComponent implements OnInit {
  @Input() data: Coin = {
    value: 1,
    color: '#FFCC00',
  };

  constructor() {}

  ngOnInit(): void {}

  get isWhite(): boolean {
    const col = this.data.color.slice(1);
    const r = parseInt(col.slice(0, 2), 16);
    const g = parseInt(col.slice(2, 4), 16);
    const b = parseInt(col.slice(4, 6), 16);

    const brightness = r * 0.299 + g * 0.587 + b * 0.144;

    return brightness <= 186;
  }
}
