import {
  CdkDragDrop,
  copyArrayItem,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    return !left && !right;
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

  setVariables(value: number): void {
    this.rightEquationCoins.forEach((coin) => {
      if (coin.placeholder) coin.value = value;
    });
    this.leftEquationCoins.forEach((coin) => {
      if (coin.placeholder) coin.value = value;
    });
  }

  solve() {
    const difference = Math.abs(
      this.sum(this.leftEquationCoins) - this.sum(this.rightEquationCoins)
    );

    const variableCountDifference = Math.abs(
      this.countNumberOfVariables(this.leftEquationCoins) -
        this.countNumberOfVariables(this.rightEquationCoins)
    );

    if (difference === 0) {
      this.setVariables(0);
      return;
    }

    if (difference !== 0 && variableCountDifference !== 0) {
      this.setVariables(difference / variableCountDifference);
      return;
    }

    this.openSnackBar('Impossible to solve!', 'OK');
  }
}
