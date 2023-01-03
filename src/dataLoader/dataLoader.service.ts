import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
//import * as DataLoader from 'dataloader';
import { IDataloaders } from './dataLoader.interaface';
import { Friend } from './friends/friends.entity';
import { FriendService } from './friends/friends.service';

@Injectable()
export class DataloaderService {
  constructor(private readonly friendsService: FriendService) {}

  getLoaders(): IDataloaders {
    const friendsLoader = this._createFriendsLoader();
    console.log("calling loader")
    return {
      friendsLoader,
    };
  }

  private _createFriendsLoader() {
    
    console.log("calling loader")
    return new DataLoader<number, Friend>(
      async (keys: readonly number[]) =>
        await this.friendsService.getStudentsFriendsByBatch(keys as number[]),
    );
  }
}
