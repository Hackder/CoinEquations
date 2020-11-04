import { Coin } from './coin';

export interface SplitEvent {
  values: number[];
  item: Coin;
}
