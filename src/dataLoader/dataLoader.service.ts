import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { ObjectId } from 'mongoose';
//import * as DataLoader from 'dataloader';
import { IDataloaders } from './dataLoader.interaface';
import { Friend } from '../domains/friends/friends.entity';
import { FriendService } from '../domains/friends/friends.service';

@Injectable()
export class DataloaderService {
  constructor(private readonly friendsService: FriendService) {}

  getLoaders(): IDataloaders {
    const friendsLoader = this._createFriendsLoader();
    //console.log("calling loader")
    return {
      friendsLoader,
    };
  }

  private _createFriendsLoader() {
    
    //console.log("calling loader")
    return new DataLoader<ObjectId, Friend>(
      async (keys: readonly ObjectId[]) =>
        await this.friendsService.getStudentsFriendsByBatch(keys as ObjectId[]),
    );
  }
}
