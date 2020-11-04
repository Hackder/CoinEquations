import {
  CdkDragDrop,
  copyArrayItem,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Coin } from 'src/app/models/coin';
import { SplitEvent } from 'src/app/models/split.event';

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
      splitValues: [],
    },
    {
      value: 2,
      color: '#9B2915',
      splitValues: [1, 1],
    },
    {
      value: 5,
      color: '#9B2915',
      splitValues: [2, 2, 1],
    },
    {
      value: 10,
      color: '#E9B44C',
      splitValues: [5, 5],
    },
    {
      value: 20,
      color: '#E9B44C',
      splitValues: [10, 10],
    },
    {
      value: 50,
      color: '#E9B44C',
      splitValues: [20, 20, 10],
    },
    {
      value: 0,
      placeholder: '?',
      color: '#FFFFFF00',
      splitValues: [],
    },
  ];

  leftEquationCoins: Coin[] = [];
  rightEquationCoins: Coin[] = [];
  deleteVisible: boolean = false;

  constructor(private snackBar: MatSnackBar) {}

  openSnackBar(message: string, action: string, duration?: number) {
    this.snackBar.open(message, action, {
      duration: duration || 1500,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

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

  get solveDisabled(): boolean {
    const left = this.leftEquationCoins.filter((coin) => coin.placeholder)
      .length;
    const right = this.rightEquationCoins.filter((coin) => coin.placeholder)
      .length;

    const solveEnabled =
      (left || right) &&
      this.leftEquationCoins.length > 0 &&
      this.rightEquationCoins.length > 0;
    return !solveEnabled;
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

  countNumberOfVariables(arr: Coin[]): number {
    return arr.filter((coin) => coin.placeholder).length;
  }

  sumWithoutVariables(arr: Coin[]): number {
    return this.sum(arr.filter((coin) => !coin.placeholder));
  }

  setVariables(value: number): void {
    this.rightEquationCoins.forEach((coin) => {
      if (coin.placeholder) coin.value = value;
    });
    this.leftEquationCoins.forEach((coin) => {
      if (coin.placeholder) coin.value = value;
    });
  }

  solve() {
    const difference =
      this.sumWithoutVariables(this.leftEquationCoins) -
      this.sumWithoutVariables(this.rightEquationCoins);

    const variableCountDifference =
      this.countNumberOfVariables(this.leftEquationCoins) -
      this.countNumberOfVariables(this.rightEquationCoins);

    if (difference === 0) {
      this.setVariables(0);
      return;
    }

    if (difference !== 0 && variableCountDifference !== 0) {
      this.setVariables(difference / -variableCountDifference);
      return;
    }

    this.openSnackBar('Impossible to solve!', 'OK');
  }

  reset() {
    this.leftEquationCoins = [];
    this.rightEquationCoins = [];
    this.availableCoins
      .filter((coin) => coin.placeholder)
      .forEach((coin) => {
        coin.value = 0;
      });
  }

  splitCoin(event: SplitEvent, list: Coin[]) {
    list.splice(
      list.indexOf(event.item),
      1,
      ...event.values.map(
        (value) =>
          this.availableCoins.find(
            (coin) => !coin.placeholder && coin.value === value
          ) || this.availableCoins[0]
      )
    );
  }
}
