import {
  CdkDragDrop,
  CdkDragEnter,
  copyArrayItem,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Coin } from 'src/app/models/coin';

@Component({
  selector: 'app-coin-equation-builder',
  templateUrl: './coin-equation-builder.component.html',
  styleUrls: ['./coin-equation-builder.component.scss'],
})
export class CoinEquationBuilderComponent implements OnInit {
  availableCoins: Coin[] = [
    {
      value: 1,
      color: '#9B2915',
    },
    {
      value: 2,
      color: '#9B2915',
    },
    {
      value: 5,
      color: '#9B2915',
    },
    {
      value: 10,
      color: '#E9B44C',
    },
    {
      value: 20,
      color: '#E9B44C',
    },
    {
      value: 50,
      color: '#E9B44C',
    },
    {
      value: 0,
      placeholder: '?',
      color: '#FFFFFF00',
    },
  ];

  leftEquationCoins: Coin[] = [this.availableCoins[0]];
  rightEquationCoins: Coin[] = [];
  deleteVisible: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  sum(arr: Coin[]): number {
    if (!arr || arr.length <= 0) return 0;
    return arr
      .map((coin) => coin.value)
      .reduce((a: number, val: number) => a + val);
  }

  get offset(): number {
    const val =
      this.sum(this.leftEquationCoins) - this.sum(this.rightEquationCoins);
    if (val === 0) return val;
    else if (val > 0) return val + 20;
    else return val - 20;
  }

  drop(event: CdkDragDrop<Coin[]>) {
    if (
      event.previousContainer.data === this.availableCoins &&
      event.container.data !== this.availableCoins
    ) {
      copyArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      return;
    }

    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  deleteDropped(event: CdkDragDrop<Coin[]>) {
    if (event.previousContainer.data === this.availableCoins) return;

    event.previousContainer.data.splice(event.previousIndex, 1);
  }

  dragStarted() {
    this.deleteVisible = true;
  }

  dragEnded() {
    this.deleteVisible = false;
  }

  noReturnPredicate() {
    return false;
  }
}
