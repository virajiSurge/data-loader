import { Module } from '@nestjs/common';
import { FriendModule } from './friends/friends.module';
import { DataloaderService } from './dataloader.service';

@Module({
  imports: [FriendModule],
  providers: [DataloaderService],
  exports: [DataloaderService],
})
export class DataloaderModule {}
