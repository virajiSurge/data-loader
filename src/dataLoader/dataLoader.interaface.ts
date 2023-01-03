// import DataLoader from 'dataloader';
import DataLoader from 'dataloader';
import { Friend } from './friends/friends.entity';

export interface IDataloaders {
  friendsLoader: DataLoader<number, Friend>;
}
