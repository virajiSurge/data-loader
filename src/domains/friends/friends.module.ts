import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Friend, FriendSchema } from './friends.entity';
import { FriendService } from './friends.service';

@Module({
  providers: [FriendService],
  imports: [
    MongooseModule.forFeature([{ name: Friend.name, schema: FriendSchema }]),
  ],
  exports: [FriendService],
})
export class FriendModule {}
