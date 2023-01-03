// import DataLoader from 'dataloader';
import DataLoader from 'dataloader';
import { ObjectId } from 'mongoose';
import { Friend } from './friends/friends.entity';

export interface IDataloaders {
  friendsLoader: DataLoader<ObjectId, Friend>;
}
